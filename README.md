# Gate Pass Management System - Frontend

A modern, production-ready React application for managing gate passes with role-based access control.

## 🚀 Features

- **JWT Authentication** - Secure login with token-based authentication
- **Role-Based Access** - 4 user roles: Admin, Supervisor, Guard, Employee
- **QR Code Scanning** - Guards can scan passes using device camera
- **Responsive Design** - Beautiful UI built with TailwindCSS
- **Real-time Notifications** - Toast notifications for user feedback
- **Protected Routes** - Secure routing based on authentication and roles

## 📋 Prerequisites

- Node.js 18+ installed
- Backend API running (default: http://localhost:3000/api)

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Backend URL
The app connects to your backend API. You can configure the URL using environment variables:

Create a file named `.env` in the root directory (manually, as it's not in the repository):
```
VITE_API_URL=http://localhost:3000/api
```

**Note:** If you don't create a `.env` file, the app will default to `http://localhost:3000/api`

### 3. Start Development Server
```bash
npm run dev
```

The app will run on: **http://localhost:5000**

## 👥 User Roles & Access

### 1. **Employee**
- Create new gate passes (Entry/Exit/Visitor)
- View their own passes
- Track pass status

### 2. **Supervisor**
- Approve/reject pending passes
- View all passes in the system

### 3. **Admin**
- Full access to all features
- Approve/reject passes
- View all system passes

### 4. **Guard**
- Scan QR codes on passes
- Issue approved passes
- Close issued passes

## 🔐 Demo Credentials

Try the app with these demo accounts:

- **Admin:** `admin` / `admin123`
- **Guard:** `guard` / `guard123`

*(Other credentials depend on your backend setup)*

## 📱 Pages

1. **Login** - Secure authentication page
2. **Dashboard** - Role-based quick access cards
3. **Create Pass** - Form to request new gate passes
4. **My Passes** - View and track all your passes
5. **Approvals** - Admin/Supervisor interface for pass management
6. **Security Scan** - QR code scanner for guards

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
├── context/         # React context (Authentication)
├── pages/           # Application pages
├── config/          # API configuration
├── App.jsx          # Main app with routing
└── main.jsx         # Entry point
```

## 🔌 API Endpoints

The frontend connects to these backend endpoints:

- `POST /auth/login` - User authentication
- `POST /pass` - Create new pass
- `GET /pass` - Get user's passes
- `GET /pass/pending` - Get pending approvals
- `PUT /pass/:id/approve` - Approve pass
- `PUT /pass/:id/reject` - Reject pass
- `POST /pass/:code/scan` - Scan pass by code
- `PUT /pass/:id/issue` - Issue approved pass
- `PUT /pass/:id/close` - Close issued pass

## 🎨 Technologies Used

- **React 19** - Latest React with modern features
- **Vite 7** - Fast build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **@yudiel/react-qr-scanner** - QR code scanning
- **react-hot-toast** - Beautiful notifications

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Deployment

To deploy this application:

1. Build the production version:
   ```bash
   npm run build
   ```

2. The `dist/` folder contains the production-ready files

3. Deploy to your hosting provider (Netlify, Vercel, etc.)

## ⚙️ Configuration

### Backend URL
Set `VITE_API_URL` environment variable to point to your backend API.

### Port Configuration
The dev server runs on port 5000 (configured in `vite.config.js`). Change if needed:
```js
server: {
  host: '0.0.0.0',
  port: 5000,  // Change this
}
```

## 🛡️ Security Features

- JWT token management
- Automatic token expiration handling
- Protected routes with role validation
- Secure API communication
- Auto-logout on authentication failure

## 📄 License

This project is for demonstration purposes.

## 🤝 Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ using React + Vite + TailwindCSS**
