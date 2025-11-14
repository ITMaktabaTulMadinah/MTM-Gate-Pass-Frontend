import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { setupResponseInterceptor } from './config/api';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePass from './pages/CreatePass';
import MyPasses from './pages/MyPasses';
import Approvals from './pages/Approvals';
import SecurityScan from './pages/SecurityScan';

const AppRoutes = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setupResponseInterceptor(logout, navigate);
  }, [logout, navigate]);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/create-pass"
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <CreatePass />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/my-passes"
        element={
          <ProtectedRoute>
            <MyPasses />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/approvals"
        element={
          <ProtectedRoute allowedRoles={['admin', 'supervisor']}>
            <Approvals />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/scan"
        element={
          <ProtectedRoute allowedRoles={['guard']}>
            <SecurityScan />
          </ProtectedRoute>
        }
      />
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;
