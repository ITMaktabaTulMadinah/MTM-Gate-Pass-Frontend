import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
                Gate Pass System
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Dashboard
              </Link>
              
              {user?.role === 'employee' && (
                <>
                  <Link to="/create-pass" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    Create Pass
                  </Link>
                  <Link to="/my-passes" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    My Passes
                  </Link>
                </>
              )}
              
              {(user?.role === 'admin' || user?.role === 'supervisor') && (
                <>
                  <Link to="/approvals" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    Approvals
                  </Link>
                  <Link to="/my-passes" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    My Passes
                  </Link>
                </>
              )}
              
              {user?.role === 'guard' && (
                <Link to="/scan" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                  Scan Pass
                </Link>
              )}
              
              <div className="flex items-center gap-2 border-l pl-4">
                <span className="text-sm text-gray-600">
                  {user?.username} ({user?.role})
                </span>
                <Button variant="outline" onClick={handleLogout} className="text-sm">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
