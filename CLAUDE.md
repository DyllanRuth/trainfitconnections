# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting the Application
- `npm start` - Start Expo development server with tunnel
- `npm run start-web` - Start web development server with tunnel  
- `npm run start-web-dev` - Start web development server with debug logging

### Project Structure
This is a React Native/Expo application using:
- **Expo Router** for file-based routing (app/ directory)
- **tRPC** for type-safe API calls between frontend and backend
- **Hono** as the backend framework
- **Zustand** for state management
- **React Query** (via tRPC) for data fetching
- **TypeScript** for type safety
- **NativeWind** for styling

### Architecture Overview

#### Frontend Structure
- `app/` - Expo Router file-based routing
  - `(auth)/` - Authentication screens (login, register, forgot password)
  - `(tabs)/` - Main tab navigation screens
  - Individual screens for trainers, sessions, workouts, meals, etc.
- `components/` - Reusable UI components
- `store/` - Zustand stores for state management
- `lib/trpc.ts` - tRPC client configuration
- `types/index.ts` - TypeScript type definitions

#### Backend Structure
- `backend/hono.ts` - Main Hono server configuration with CORS, payload limits, and tRPC integration
- `backend/trpc/` - tRPC router and procedure definitions
  - `trpc.ts` - tRPC initialization with context and error handling
  - `app-router.ts` - Main tRPC router
  - `routes/` - Individual route handlers

#### Key Features
- **Authentication** - Mock authentication system with local storage
- **Trainer/Client Management** - Two-sided marketplace for fitness trainers and clients
- **Session Booking** - Schedule and manage training sessions
- **Workout & Meal Plans** - Create and manage fitness and nutrition plans
- **Messaging** - In-app messaging between trainers and clients
- **Payment Integration** - Revenue tracking and payment management
- **Media Management** - Photo and video galleries for trainers

#### State Management
- `auth-store.ts` - User authentication and profile management
- `client-store.ts` - Client-specific data and actions
- `trainer-store.ts` - Trainer-specific data and actions
- `message-store.ts` - Messaging functionality
- `video-store.ts` - Video management

#### API Architecture
- Uses tRPC for end-to-end type safety
- Backend runs on Hono with middleware for:
  - CORS handling
  - Payload size limits (10MB server, 8MB client)
  - Request timeout handling (25 seconds)
  - Enhanced error handling for payload size issues
- Mock context with hardcoded user data for development

#### Development Notes
- The application uses mock data and local storage for development
- No real database - data is stored in Zustand stores with AsyncStorage persistence
- Google Maps integration requires API keys (configured in app.json)
- Uses Expo managed workflow with EAS for building and deployment
- TypeScript strict mode enabled
- Path aliases configured (@/* maps to root directory)

#### Common Patterns
- Screens use tRPC hooks for data fetching
- Components follow React Native patterns with StyleSheet or NativeWind
- Error handling includes specific logic for payload size limits
- Authentication flow uses protected routes with automatic navigation