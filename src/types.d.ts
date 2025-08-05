// Type definitions for react-env-secrets

/**
 * Environment variables object with string values
 */
export interface EnvVars {
  [key: string]: string | undefined;
}

/**
 * Configuration options for useEnv hook
 */
export interface UseEnvOptions {
  /**
   * Custom prefix to filter environment variables
   * If not provided, uses common prefixes: REACT_APP_, NEXT_PUBLIC_, VITE_, PUBLIC_
   */
  prefix?: string;
  
  /**
   * Array of required environment variable names
   * Hook will log an error if any of these are missing
   */
  required?: string[];
  
  /**
   * Fallback values for environment variables
   * Used when the environment variable is not set
   */
  fallbacks?: Record<string, string>;
}

/**
 * Main hook for accessing environment variables
 * 
 * @param options - Configuration options
 * @returns Object containing all available environment variables
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const { API_URL, PORT } = useEnv();
 * 
 * // With options
 * const env = useEnv({
 *   required: ['API_URL'],
 *   fallbacks: { PORT: '3000' }
 * });
 * ```
 */
export declare function useEnv(options?: UseEnvOptions): EnvVars;

/**
 * Hook for accessing a single environment variable
 * 
 * @param key - Environment variable name (without prefix)
 * @param fallback - Fallback value if the variable is not set
 * @returns The environment variable value or fallback
 * 
 * @example
 * ```tsx
 * const apiUrl = useEnvVar('API_URL', 'http://localhost:3000');
 * ```
 */
export declare function useEnvVar(key: string, fallback?: string): string | undefined;

/**
 * Clears the internal environment variables cache
 * Useful for testing or when environment variables change at runtime
 * 
 * @example
 * ```tsx
 * clearEnvCache();
 * ```
 */
export declare function clearEnvCache(): void;

/**
 * Development helper to list all available environment variables
 * Only works in development mode
 * 
 * @returns Array of available environment variable names
 * 
 * @example
 * ```tsx
 * const availableVars = listEnvVars();
 * console.log(availableVars);
 * ```
 */
export declare function listEnvVars(): string[];

// Default export
declare const _default: {
  useEnv: typeof useEnv;
  useEnvVar: typeof useEnvVar;
  clearEnvCache: typeof clearEnvCache;
  listEnvVars: typeof listEnvVars;
};

export default _default;