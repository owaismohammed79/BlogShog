import {useState} from 'react'
import {Input, Button, Logo} from './index'
import {useDispatch} from 'react-redux'
import {Link, useNavigate, useOutletContext} from 'react-router-dom'
import authService from '.././appwrite (service)/auth'
import {login} from '../store/authSlice'
import {useForm} from 'react-hook-form'
import { EyeClosed,  Eye} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'


function Login() {
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { setIsActive } = useOutletContext();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm() //Idhar handleSubmit is predefined fn name he change nahi kar sakte
    //register ek function he jo ki kuch i/p leke kuch props inject karta he us component me taaki usko monitor kar sake

    const handleLogin = async (data) => { //useForm use karne ka yahi use case he ki saara data ko validate karo and
      //i/p boxes se data collect karke object ke form me send karta he
      setError("")
      try { //try catch again yaad karo ki agar appwrite me koi server errors and stuff ke lie
        const session = await authService.login(data) //Saare appwrite operations async he soo
        if(session){ //userData extract is lie karte he ki session management, security and access details ke lie
          const userData = await authService.getCurrentUser()
          if(userData) {
            dispatch(login(userData)) //Agar userData milega nahi to store me dispatch hi nahi hoga ki logged in he
            setIsActive('/home') //Dammn thing if I set this active after navigating then it wouldn't happen
            setTimeout(() => navigate("/home"), 100) //This is done coz the dispatch is async and we want the navigation to happen only after the dispatch is done
          }
        }
      } catch (error) {
        console.error("Login error:", error)
        setError(error.message || "An error occurred while logging in")
        setShowError(true)
      }
    }

    const handleGoogleLogin = async () => {
      try{
        authService.loginWithGoogle().then((userData) => {
          if(userData){
            dispatch(login(userData))
            setIsActive('/home')
          }
        })
      } catch (error) {
        console.error("Google login error:", error)
        setError(error.message || "An error occurred while logging in with Google")
        setShowError(true)
      }
    }

    function handleClick(e){
      e.preventDefault()
      navigate("/signup")
      setIsActive('/signup')
    }

  return (
    <div className='flex items-center justify-center w-full mx-4'>
      <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link onClick={handleClick} className="font-medium text-primary transition-all duration-200 hover:underline">
              Sign Up
          </Link>
        </p>
        {showError && <p className="text-red-600 mt-8 text-center">`Error: ${error}`</p>}
        <div className='flex justify-center mt-2'>
          <Button onClick={handleGoogleLogin} className="w-2/3 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faGoogle} className='w-5 h-5 px-2'/>
            Sign in with Google
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className='mt-4'>
          <div className='space-y-5'>
            
            <div className='space-y-1'>
              <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", { //Here email is unique name of the i/p field, 2nd arg is an object trying to do validation 
                  required: true,
                  validate: {
                      matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  } //Regex can be generated online for @ and .com and stuff if doesn't contain then error msg and see that there's
                  //.test(value) to check if it is in the format or not and Regex start and end with /
              })}
              />
              {errors.email && <p className="text-red-600 mt-8 text-center">{errors.email.message}</p>}
            </div>
            <div className='space-y-1'>
              <label className='inline-block pl-1' htmlFor='password'>Password: </label>
              <div className='relative'>
                <input
                label="Password: "
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 pr-10 border rounded-lg outline-none focus:outline-none focus:ring-2 focus:bg-gray-50"
                placeholder="Enter your password"
                {...register("password", { //Here ... is the syntax that is how you should use in all i/p fields
                    required: true,
                    validate: {
                      matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                      "Password should be at least 8 characters long with lower, upperCase alphabets and number"
                    }
                })}
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                  {showPassword ? <Eye  /> : <EyeClosed />}
                </span>
              </div>
              {errors.password && <p className="text-red-600 mt-8 text-center">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full"> Sign in </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login