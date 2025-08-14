import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BookOpen, Home, Edit3, Plus, LogOut } from 'lucide-react';
import authService from '../../appwrite (service)/auth';
import { logout as authLogout } from '../../store/authSlice';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(authLogout());
      navigate('/login');
    });
  };

  const baseLinkStyle = "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300";
  const activeLinkStyle = "bg-gray-800/50 text-white";
  const inactiveLinkStyle = "text-gray-300 hover:text-white hover:bg-gray-800/50";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav className="max-w-7xl mx-auto">
        <div className="glass-effect rounded-full px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 group transition-all duration-300"
          >
            <BookOpen className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors" />
            <span className="text-xl font-bold text-white">BlogShog</span>
          </NavLink>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {!authStatus ? (
              <>
                <NavLink
                  to="/login"
                  className="btn-secondary text-sm rounded-full"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="btn-primary text-sm rounded-full"
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </NavLink>
                <NavLink
                  to="/my-posts"
                  className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="hidden sm:inline">My Posts</span>
                </NavLink>
                <NavLink
                  to="/add-post"
                  className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Post</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-300 hover:text-red-400 hover:bg-red-900/20 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;