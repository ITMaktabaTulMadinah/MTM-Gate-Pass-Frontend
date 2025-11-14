# Gate Pass Management System - Frontend

## Overview
A comprehensive React-based frontend application for managing gate passes with role-based access control. Built with React 19, Vite, TailwindCSS, and modern web technologies.

**Created:** November 14, 2025

## Tech Stack
- **Framework:** React 19 + Vite 7
- **Styling:** TailwindCSS 4
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **QR Scanner:** @yudiel/react-qr-scanner
- **Notifications:** react-hot-toast

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Badge.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Layout.jsx
│   └── ProtectedRoute.jsx
├── context/            # React context providers
│   └── AuthContext.jsx
├── pages/              # Application pages
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── CreatePass.jsx
│   ├── MyPasses.jsx
│   ├── Approvals.jsx
│   └── SecurityScan.jsx
├── config/             # Configuration files
│   └── api.js         # Axios setup with interceptors
├── App.jsx            # Main app with routing
└── main.jsx           # App entry point
```

## Features

### Authentication
- JWT-based authentication
- Token stored in localStorage
- Axios interceptor for automatic token attachment
- Auto-redirect on 401 responses
- Protected routes with role-based access control

### User Roles
1. **Employee** - Create passes, view own passes
2. **Supervisor** - Approve/reject passes, view all passes
3. **Admin** - Full access to all features
4. **Guard** - Scan QR codes, issue/close passes

### Pages
1. **Login** - User authentication with demo credentials
2. **Dashboard** - Role-based quick access cards
3. **Create Pass** - Form to create new gate passes (Entry/Exit/Visitor)
4. **My Passes** - Table view of user's passes with status badges
5. **Approvals** - Admin/Supervisor interface for pending pass approvals
6. **Security Scan** - QR code scanner for guards to process passes

## API Integration

### Base Configuration
- API URL configured via environment variable: `VITE_API_URL`
- Default: `http://localhost:3000/api`
- See `.env.example` for configuration template

### Endpoints Used
- `POST /auth/login` - User authentication
- `POST /pass` - Create new pass
- `GET /pass` - Get user's passes
- `GET /pass/pending` - Get pending approvals
- `PUT /pass/:id/approve` - Approve pass
- `PUT /pass/:id/reject` - Reject pass
- `POST /pass/:code/scan` - Scan pass by code
- `PUT /pass/:id/issue` - Issue approved pass
- `PUT /pass/:id/close` - Close issued pass

## Development

### Running the App
```bash
npm install
npm run dev
```

App runs on: http://localhost:5000

### Environment Setup
1. Copy `.env.example` to `.env` (create manually as .env is not allowed in filesystem)
2. Set `VITE_API_URL` to your backend API URL
3. Restart the development server

### Demo Credentials
- Admin: `admin / admin123`
- Guard: `guard / guard123`

## Key Features

### Reusable Components
- **Button** - Variants: primary, secondary, success, danger, outline
- **Input** - Form inputs with labels, validation, and error states
- **Badge** - Status indicators with color coding
- **Card** - Container component with optional header and actions
- **Modal** - Overlay modal with header, body, and footer
- **Layout** - Navigation bar with role-based menu items

### Security Features
- JWT token management
- Automatic token refresh handling
- Protected routes with role validation
- Auto-logout on authentication failure

### UX Features
- Toast notifications for user feedback
- Loading states for async operations
- Responsive design with TailwindCSS
- Clean, intuitive interface
- QR code scanning with live camera feed

## Recent Changes
- **November 14, 2025:** Initial project setup
  - Installed all dependencies
  - Created complete component library
  - Implemented authentication system
  - Built all 6 pages with full functionality
  - Configured routing with protected routes
  - Set up QR scanner with modern library
  - Configured Vite for Replit environment
  - Application fully functional and tested

## Next Steps (Future Enhancements)
- Add pass creation from dashboard
- Implement pass filtering and search
- Add date range filters for pass history
- Implement export functionality (PDF/CSV)
- Add real-time notifications
- Implement offline mode support
- Add analytics dashboard
- Implement multi-language support

## Notes
- Server configured to run on port 5000 (required for Replit webview)
- Vite configured with `allowedHosts: true` for iframe compatibility
- QR Scanner uses @yudiel/react-qr-scanner (React 19 compatible)
- All API calls include JWT token via Axios interceptor
