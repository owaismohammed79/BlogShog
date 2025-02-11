import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components/index'
import appwriteService from "../appwrite (service)/config"
import Loading from "../components/ui/Loading" 

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                setPost(post)
                setLoading(false)
            })
        } else {
            navigate('/home')
        }
    }, [slug, navigate])

    if(!post) {
        return (<div className="flex justify-center items-center font-bold h-screen">
            <Loading />
        </div>)
    }

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : (<div className='text-center w-full py-8 font-bold'>Post not found</div>)
}

export default EditPost