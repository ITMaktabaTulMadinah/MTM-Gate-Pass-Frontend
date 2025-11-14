# React + Vite Frontend

## Overview
This is a React application built with Vite and Tailwind CSS. It provides a minimal setup with Hot Module Replacement (HMR) for fast development.

## Project Setup
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.17
- **Language**: JavaScript (JSX)

## Architecture
- **Entry Point**: `src/main.jsx` - Initializes React app
- **Main Component**: `src/App.jsx` - Root component with counter demo
- **Styling**: Uses Tailwind CSS via `@tailwindcss/vite` plugin
- **Dev Server**: Configured to run on port 5000 with 0.0.0.0 host for Replit compatibility

## Configuration
- **Vite Config**: Configured for Replit environment with:
  - Server binding to 0.0.0.0:5000
  - WebSocket HMR support for Replit proxy
  - Preview server on port 5000

## Recent Changes
- 2025-11-14: Initial import and Replit environment setup
  - Configured Vite for Replit proxy compatibility
  - Set up development workflow on port 5000

## Development
Run `npm run dev` to start the development server on port 5000.
