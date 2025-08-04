# react-env-secrets

[![npm version](https://badge.fury.io/js/react-env-secrets.svg)](https://badge.fury.io/js/react-env-secrets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

**A zero-configuration React hook for environment variables - the perfect drop-in replacement for `process.env`**

Stop writing `process.env.REACT_APP_SOMETHING` everywhere. Get clean, type-safe access to your environment variables with zero setup required.

## ✨ Features

- 🚀 **Zero Configuration** - Just install and use
- 🔄 **Drop-in Replacement** - Replace `process.env.VARIABLE` with `useEnv()`
- 🏷️ **TypeScript Support** - Full type safety out of the box
- 🎯 **Smart Prefix Detection** - Works with React, Next.js, Vite, and more
- 🧹 **Clean Variable Names** - No more prefixes in your code
- ⚡ **Performance Optimized** - Cached for efficiency
- 🛡️ **Error Handling** - Built-in validation and helpful error messages

## 📦 Installation

```bash
npm install react-env-secrets
```

```bash
yarn add react-env-secrets
```

```bash
pnpm add react-env-secrets
```

## 🚀 Quick Start

### Before (the old way):
```tsx
const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;
const DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

// Lots of repetitive process.env.REACT_APP_ everywhere! 😫
```

### After (the clean way):
```tsx
import { useEnv } from 'react-env-secrets';

function MyComponent() {
  const { API_URL, PORT, DATABASE_URL } = useEnv();
  
  return <div>API URL: {API_URL}</div>;
}
```

That's it! No configuration needed. 🎉

## 📝 Usage Examples

### Basic Usage

```tsx
import { useEnv } from 'react-env-secrets';

function App() {
  // Get all your environment variables at once
  const { API_URL, PORT, DEBUG_MODE } = useEnv();
  
  return (
    <div>
      <h1>My App</h1>
      <p>API: {API_URL}</p>
      <p>Port: {PORT}</p>
      <p>Debug: {DEBUG_MODE}</p>
    </div>
  );
}
```

### With Validation & Fallbacks

```tsx
import { useEnv } from 'react-env-secrets';

function App() {
  const env = useEnv({
    required: ['API_URL', 'DATABASE_URL'], // Will show helpful errors if missing
    fallbacks: {
      PORT: '3000',
      DEBUG_MODE: 'false'
    }
  });
  
  return <div>API: {env.API_URL}</div>;
}
```

### Single Variable Hook

```tsx
import { useEnvVar } from 'react-env-secrets';

function ApiComponent() {
  const apiUrl = useEnvVar('API_URL', 'http://localhost:3000');
  
  return <div>Connecting to: {apiUrl}</div>;
}
```

### TypeScript Support

```tsx
import { useEnv, type EnvVars } from 'react-env-secrets';

interface MyEnvVars extends EnvVars {
  API_URL: string;
  PORT: string;
  DEBUG_MODE?: string;
}

function App() {
  const { API_URL, PORT, DEBUG_MODE } = useEnv() as MyEnvVars;
  // Full type safety! ✅
}
```

## 🔧 Environment Setup

Create a `.env` file in your project root:

```env
# React apps
REACT_APP_API_URL=https://api.example.com
REACT_APP_PORT=3000
REACT_APP_DEBUG_MODE=true

# Next.js apps  
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_PORT=3000

# Vite apps
VITE_API_URL=https://api.example.com
VITE_PORT=3000

# Or custom prefix
PUBLIC_API_URL=https://api.example.com
```

The hook automatically detects and strips these prefixes:
- `REACT_APP_`
- `NEXT_PUBLIC_`
- `VITE_`
- `PUBLIC_`

So `REACT_APP_API_URL` becomes just `API_URL` in your code! 🎯

## 📚 API Reference

### `useEnv(options?)`

Main hook for accessing environment variables.

**Parameters:**
- `options` (optional): Configuration object
  - `prefix?: string` - Custom prefix filter
  - `required?: string[]` - Required variable names
  - `fallbacks?: Record<string, string>` - Fallback values

**Returns:** Object with all environment variables

### `useEnvVar(key, fallback?)`

Hook for a single environment variable.

**Parameters:**
- `key: string` - Variable name (without prefix)
- `fallback?: string` - Fallback value

**Returns:** Variable value or fallback

### `clearEnvCache()`

Clears the internal cache. Useful for testing.

### `listEnvVars()`

Development helper to see all available variables.

## 🌟 Why react-env-secrets?

### The Problem
```tsx
// This is what we're all tired of writing:
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const PORT = process.env.REACT_APP_PORT || '3000';
const DEBUG = process.env.REACT_APP_DEBUG === 'true';

// Repetitive, verbose, and error-prone! 😤
```

### The Solution
```tsx
// Clean, simple, and powerful:
const { API_URL, API_KEY, PORT, DEBUG } = useEnv({
  fallbacks: { PORT: '3000' }
});

// That's it! 🚀
```

## 🔒 Security Features

- **Client-Safe**: Only exposes prefixed environment variables on the client
- **Server-Compatible**: Works seamlessly in server-side rendering
- **Development Warnings**: Helpful error messages when variables are missing
- **Type Safety**: Catch environment variable issues at compile time

## 🏗️ Framework Support

Works perfectly with:

- ✅ **Create React App**
- ✅ **Next.js**
- ✅ **Vite**
- ✅ **Remix**
- ✅ **Gatsby**
- ✅ **Any React framework**

## 🧪 Testing

```tsx
import { clearEnvCache, listEnvVars } from 'react-env-secrets';

// Clear cache between tests
beforeEach(() => {
  clearEnvCache();
});

// See available variables in development
console.log(listEnvVars());
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Rayyan Waseem](https://github.com/SkullCrawler)

## 🆘 Support

- 📖 [Documentation](https://github.com/SkullCrawler/react-env-secrets#readme)
- 🐛 [Issue Tracker](https://github.com/SkullCrawler/react-env-secrets/issues)
- 💬 [Discussions](https://github.com/SkullCrawler/react-env-secrets/discussions)

---

**Made with ❤️ for React developers who are tired of `process.env.REACT_APP_EVERYTHING`**