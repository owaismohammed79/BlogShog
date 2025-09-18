import { useState, useEffect } from "react"
import { Header, Footer } from "./components";
import {useDispatch} from 'react-redux'
import authService from "./appwrite (service)/auth.js" //shouldn't be enclosed in curly braces as it is an object
import {login, logout} from "./store/authSlice"
import { Outlet} from "react-router-dom"
import Loading from "./components/ui/Loading.jsx"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);


  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-black">
      <div className="w-full block min-h-screen">
        <Header />
        <main className="pt-24">
          <Outlet />
        </main>
        <Analytics />
        <SpeedInsights />
        <Footer />
      </div>
    </div>
  ) : 
  (<div className="w-full flex justify-center items-center min-h-screen bg-black">
    <Loading />
  </div>)
}

export default App