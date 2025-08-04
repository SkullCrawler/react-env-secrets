import { useState, useEffect } from 'react';

// Types
interface EnvVars {
  [key: string]: string | undefined;
}

interface UseEnvOptions {
  prefix?: string;
  required?: string[];
  fallbacks?: Record<string, string>;
}

// Cache to avoid re-reading env vars on every hook call
let envCache: EnvVars | null = null;
let isLoading = false;

// Get all environment variables with smart prefix detection
function getAllEnvVars(customPrefix?: string): EnvVars {
  if (typeof window === 'undefined') {
    // Server-side: return all process.env
    return process.env as EnvVars;
  }

  // Client-side: only return prefixed vars that are safe for frontend
  const envVars: EnvVars = {};
  const prefixes = customPrefix ? [customPrefix] : ['REACT_APP_', 'NEXT_PUBLIC_', 'VITE_', 'PUBLIC_'];

  // Get all environment variables from the bundled process.env
  Object.keys(process.env).forEach(key => {
    const value = process.env[key];
    
    if (value !== undefined) {
      // Check if key starts with any allowed prefix
      const hasValidPrefix = prefixes.some(prefix => key.startsWith(prefix));
      
      if (hasValidPrefix) {
        // Remove prefix for cleaner usage
        const cleanKey = prefixes.reduce((k, prefix) => 
          k.startsWith(prefix) ? k.slice(prefix.length) : k, key
        );
        envVars[cleanKey] = value;
        // Also keep the original prefixed version
        envVars[key] = value;
      }
    }
  });

  return envVars;
}

// Main hook - simple drop-in replacement
export function useEnv(options: UseEnvOptions = {}): EnvVars {
  const { prefix, required = [], fallbacks = {} } = options;
  
  const [envVars, setEnvVars] = useState<EnvVars>(() => {
    // Initialize with cached vars or get fresh ones
    if (envCache) return envCache;
    return getAllEnvVars(prefix);
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!envCache && !isLoading) {
      isLoading = true;
      
      try {
        const vars = getAllEnvVars(prefix);
        
        // Apply fallbacks
        const varsWithFallbacks = { ...vars };
        Object.keys(fallbacks).forEach(key => {
          if (varsWithFallbacks[key] === undefined) {
            varsWithFallbacks[key] = fallbacks[key];
          }
        });

        // Check required variables
        const missingVars = required.filter(key => 
          varsWithFallbacks[key] === undefined || varsWithFallbacks[key] === ''
        );

        if (missingVars.length > 0) {
          const prefixHint = prefix || 'REACT_APP_/NEXT_PUBLIC_/VITE_';
          setError(
            `Missing required environment variables: ${missingVars.join(', ')}. ` +
            `Make sure they are prefixed with ${prefixHint} in your .env file.`
          );
        } else {
          setError(null);
        }

        envCache = varsWithFallbacks;
        setEnvVars(varsWithFallbacks);
        
      } catch (err) {
        setError(`Failed to load environment variables: ${err}`);
      } finally {
        isLoading = false;
      }
    }
  }, [prefix, required, fallbacks]);

  // Log error in development
  if (error && process.env.NODE_ENV === 'development') {
    console.error('useEnv Error:', error);
  }

  return envVars;
}

// Utility hook for single variable (even simpler usage)
export function useEnvVar(key: string, fallback?: string): string | undefined {
  const envVars = useEnv();
  return envVars[key] ?? fallback;
}

// Helper to clear cache (useful for testing or hot reloading)
export function clearEnvCache(): void {
  envCache = null;
}

// Development helper to list all available env vars
export function listEnvVars(): string[] {
  if (process.env.NODE_ENV === 'development') {
    const vars = getAllEnvVars();
    console.log('Available environment variables:', Object.keys(vars));
    return Object.keys(vars);
  }
  return [];
}