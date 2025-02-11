import {Container, Logo, LogoutBtn} from '../index'
import { Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { Menu, X } from "lucide-react";

function Header({isActive, setIsActive}) {
  const authStatus = useSelector((state) => state.auth.status) 
  const navigate = useNavigate()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
      const handleScroll = () => {
        setHasScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  //Watch how every nav item also has a active status and SLUG 
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
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  const filteredNavItems = navItems.filter(item => item.active);
  const handleNavigation = (slug) => {
    setIsActive(slug);
    navigate(slug);
    setIsOpen(false);
  };

  return (
    <header className='py-3 shadow bg-indigo-600'>
      <Container>
        <nav className='flex items-center justify-between'>
        
          <div className='flex flex-shrink-0 items-center'>
            <Link to='/home'>
              <Logo width='80' height='56' />
            </Link>
          </div>

          <ul className='hidden md:flex ml-auto items-center'>
            {filteredNavItems.map((item) =>  (
              <li key={item.name}>
                {/*On clicking the nav buttons, we'll navigate to the desired slug*/}
                <button
                onClick={() => handleNavigation(item.slug)}
                className={`flex mt-2 px-6 py-2 text-white duration-200 hover:bg-indigo-400 rounded-full gap-1 ${isActive ===item.slug ? 'bg-indigo-400' : ''}`}>
                  <div>{item.name}</div>
                </button>
              </li>
            ))}
            
            {//Checking the authStatus and then displaying the logout button
              authStatus && (
              <li>
                <LogoutBtn setIsActive={setIsActive}/>
              </li>
            )}
          </ul>
          
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white transition-colors duration-200 z-20"
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
        </nav>

        <div className={`fixed inset-0 z-10 transform transition-transform duration-300 ease-in-out md:hidden
            ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <nav className="relative h-full w-full max-w-sm ml-auto bg-indigo-600 shadow-xl flex flex-col">
            <div className="px-6 pt-20 pb-6 flex-1 overflow-y-auto">
              <div className="space-y-1">
                {filteredNavItems.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => handleNavigation(item.slug)}
                    className={`
                      block w-full text-left px-3 py-4 text-base font-medium rounded-md transition-colors duration-200",
                      ${location.pathname === item.slug
                        ? "text-white bg-indigo-500"
                        : "text-white/90 hover:text-white hover:bg-indigo-500"}
                    `}
                  >
                    {item.name}
                  </button>
                ))}
                {authStatus && (<LogoutBtn />)}


              </div>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header