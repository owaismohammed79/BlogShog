import {useState} from 'react'
import {Input, Button} from './index'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import authService from '.././appwrite (service)/auth'
import {login} from '../store/authSlice'
import {useForm} from 'react-hook-form'
import { EyeClosed, Eye, Mail, Lock, ArrowRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'


function Login() {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm()

    const handleLogin = async (data) => {
      setError("")
      setIsLoading(true);
      try {
        const session = await authService.login(data)
        if(session){
          const userData = await authService.getCurrentUser()
          if(userData) {
            dispatch(login(userData))
            setTimeout(() => navigate("/home"), 100)
          }
        }
      } catch (error) {
        console.error("Login error:", error)
        setError(error.message || "An error occurred while logging in")
      } finally {
        setIsLoading(false);
      }
    }

    const handleGoogleLogin = async () => {
      try{
        authService.loginWithGoogle().then((userData) => {
          if(userData){
            dispatch(login(userData))
          }
        })
        setTimeout(() => navigate("/home"), 100)
      } catch (error) {
        console.error("Google login error:", error)
        setError(error.message || "An error occurred while logging in with Google")
      }
    }

  return (
    <div className='flex items-center justify-center w-full mx-4'>
      <div className="w-full max-w-md">
        <div className="glass-effect rounded-2xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="pl-12"
                  {...register("email", {
                      required: "Email is required",
                      validate: {
                          matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                          "Email address must be a valid address",
                      }
                  })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-12 pr-10"
                  placeholder="Enter your password"
                  {...register("password", {
                      required: "Password is required",
                  })}
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400">
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-900/50 px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <Button onClick={handleGoogleLogin} className="w-full flex items-center justify-center btn-secondary">
            <FontAwesomeIcon icon={faGoogle} className='w-4 h-4 mr-2'/>
            Sign in with Google
          </Button>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-white hover:text-gray-300 transition-colors font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login