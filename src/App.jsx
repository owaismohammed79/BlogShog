import { useState, useEffect } from "react"
import { Header, Footer } from "./components";
import {useDispatch} from 'react-redux'
import authService from "./appwrite (service)/auth.js" //shouldn't be enclosed in curly braces as it is an object
import {login, logout} from "./store/authSlice"
import {useNavigate, Outlet} from "react-router-dom"
import Loading from "./components/ui/Loading.jsx"
//import Navbar from "./components/Header/Navbar.jsx";


function App() {
  const [loading, setLoading] = useState(true); //Whenever we want to fetch data from db or whatever we make use of this loading concept. This is coz as soon as the app loads, user might not see anything on the screen and we don't want that
  const [isActive, setIsActive] = useState('/login')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    const handleOAuthCallback = async () => {
      try {
        //const session = await authService.account.getSession('current');
        authService.getCurrentUser()
        .then((userData)=>{
          if(userData){
            console.log(userData)
            dispatch(login(userData))
          }
          else{
            console.log("No user logged in, trying to logout")
            //dispatch(logout())
            navigate("/login")
          }
        })
        .catch(() => {
          console.log("Error in fetching user data, trying to logout")
          dispatch(logout())
          navigate("/login")
        })
        .finally(()=> setLoading(false))
      } catch(error) {
        console.error("Error in handling OAuth callback:", error)
        setLoading(false)
      }
    }
    handleOAuthCallback()
  },[navigate, dispatch])


  return !loading ? ( //Watch how loading is used if to check if the data fetching has happened only then show the contents
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full block min-h-screen">
        <Header isActive={isActive} setIsActive = {setIsActive}/>
        <main>
          <Outlet context={{ setIsActive }}/>
        </main>
        <Footer />
      </div>
    </div>
  ) : 
  (<div className="w-full flex justify-center items-center min-h-screen">
    <Loading />
  </div>)
}

export default App
