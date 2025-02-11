import {useDispatch} from 'react-redux'
import authService from '../../appwrite (service)/auth'
import {logout} from '../../store/authSlice'
import {useNavigate} from 'react-router-dom'

function LogoutBtn({setIsActive}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutHandler(){
    try {
      authService.logout()
        dispatch(logout()); //Idhar galti kar raha tha, function ko karna hota he
        navigate('/login');
        setIsActive('/login');
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className='w-full flex justify-start'>
      <button className='md:mt-1 px-3 py-4 text-white duration-200 hover:bg-indigo-400 rounded-full' onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}



export default LogoutBtn