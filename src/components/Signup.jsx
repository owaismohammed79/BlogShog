import {useState} from 'react'
import {Link, useNavigate, useOutletContext } from 'react-router-dom'
import {Button, Logo, Input} from './index'
import { useForm } from 'react-hook-form'
import authService from '../appwrite (service)/auth'
import {login as authLogin} from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { EyeClosed, Eye } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'

function Signup() {
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setIsActive } = useOutletContext();
    const {register, handleSubmit, formState: {errors}} = useForm()

    const create = async ({email, password}) => {
        setError("")
        try {
            const session = await authService.createAccount({email, password})
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(authLogin(userData))
                    setIsActive('/home')//if I set this active after navigating then it wouldn't happen
                    navigate("/home")
                } else {
                    setError("Failed to get user data after account creation")
                }
            } else {
                setError("An account with this email already exists")
            }
        } catch (error) {
            setError(error.message || "An error occurred during signup")
        }
    }

    const handleGoogleLogin = async () => {
        try{
          authService.loginWithGoogle().then((userData) => {
            if(userData){
              dispatch(authLogin(userData))
              setIsActive('/home')
            }
          })
        } catch (error) {
          console.error("Google login error:", error)
          setError(error.message || "An error occurred while logging in with Google")
        }
      }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        onClick={()=>setIsActive('/login')}
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <div className='flex justify-center mt-2'>
                    <Button onClick={handleGoogleLogin} className="w-2/3 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faGoogle} className='w-5 h-5 px-2'/>
                    Sign in with Google
                    </Button>
                </div>
                <form onSubmit={handleSubmit(create)} className='mt-4'>
                    <div className='space-y-5'>
                        <div className='space-y-1'>
                            <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", { 
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
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
                        <Button type="submit" className="w-full"> Create Account </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup