import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo, LogoutBtn} from '../index'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);
  
  const navItems = [
    {
      name: 'Home',
      slug: "/home",
      active: authStatus,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (slug) => {
    navigate(slug);
    setIsOpen(false);
  };

  const filteredNavItems = navItems.filter(item => item.active);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        hasScrolled ? "bg-indigo-600/80 backdrop-blur-lg shadow-sm" : "bg-indigo-600"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex flex-shrink-0 items-center">
            <Link to='/'>
                <Logo width='80' height='56' />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavItems.map((item) => (
              <button
                key={item.slug}
                onClick={() => handleNavigation(item.slug)}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 ease-in-out",
                  location.pathname === item.slug
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.name}
              </button>
            ))}
            {//Checking the authStatus and then displaying the logout button
                authStatus && (<LogoutBtn />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <nav className="relative h-full w-full max-w-sm ml-auto bg-indigo-600 shadow-xl flex flex-col">
          <div className="px-6 pt-20 pb-6 flex-1 overflow-y-auto">
            <div className="space-y-1">
              {filteredNavItems.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleNavigation(item.slug)}
                  className={cn(
                    "block w-full text-left px-3 py-4 text-base font-medium rounded-md transition-colors duration-200",
                    location.pathname === item.slug
                      ? "text-white bg-indigo-500"
                      : "text-white/90 hover:text-white hover:bg-indigo-500"
                  )}
                >
                  {item.name}
                </button>
              ))}
              {authStatus && (<LogoutBtn />)}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;