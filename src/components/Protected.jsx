import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from './ui/Loading'

//This component would be like a wrapper and is used to proctect pages which are to be shown only if user is logged in or has permissions to do so
function Protected({children, authentication =true}) {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector(state => state.auth.status) //Realize that here we aren't making another API call instead checking
  //the store for the auth status
  const navigate = useNavigate()

  useEffect(()=>{
      if(authentication && !authStatus){ //Logic ulti likhi hui he, if authentication is true (it is a protected page) and u ain't logged in then simply go to login page else if authentication is false that means that it is a public route and no need to authenticate and stuff so go to home page
        navigate("/login")
      } else if(!authentication && authStatus){ //TODO: the else statement feels a bit fishy here coz he shouldn't
        //be sending the user to the home page everytime...
          navigate("/home")
      }
      setLoading(false)
  },[authentication, authStatus, navigate]) //Check that even navigate is added as a dependency i.e coz whenever you navigate from 
  //one page to another 

  return loading ? <h1>Loading...</h1>: <>{children}</>; //Children ko enclose karna hoga, just can't return children
}

Protected.propTypes = {
  children: PropTypes.node.isRequired,
  authentication: PropTypes.bool
}

export default Protected