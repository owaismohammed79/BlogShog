import {useState, useEffect} from 'react'
import { Container, Postcard } from '../components/index'
import appwriteService from "../appwrite (service)/config"
import { useSelector, useDispatch } from 'react-redux'
import Loading  from "../components/ui/Loading"
import {fetchPostsSuccess, fetchPostsFailure} from '../store/postSlice'

function Home() {
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.posts)

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                appwriteService.getPosts().then((posts) => {
                    if(posts) dispatch(fetchPostsSuccess(posts.documents))
                    setLoading(false)
                })
            } catch (error) {
                console.log(error)
                dispatch(fetchPostsFailure(error))
                setLoading(false)
            }
        }
        fetchPosts()
    }, [appwriteService])

    if(loading) {
        return (
            <div className='flex justify-center items-center w-full py-8 mt-4 font-bold min-h-screen'>
                <Loading />
            </div>
        )
    }

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center min-h-screen">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if(!posts || posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center min-h-screen'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            No posts found
                        </h1>
                    </div>
                </div>
            </Container>
            </div>
        )
    }

    return (
        <div className='w-full px-9 sm:px-0 py-8'>
            <Container> 
                <div className='flex flex-wrap -mx-2'>
                {posts.map((post) => (
                    <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4' key = {post.$id}>
                        <Postcard {...post} /> {/*Watch the syntax here*/}
                    </div>
                ))}
                </div>
            </Container>
        </div>
    )
}

export default Home