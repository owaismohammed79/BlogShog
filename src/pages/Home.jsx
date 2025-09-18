import {useState, useEffect} from 'react'
import { Container, BlogCard } from '../components/index'
import appwriteService from "../appwrite (service)/config"
import { useSelector, useDispatch } from 'react-redux'
import Loading  from "../components/ui/Loading"
import {fetchPostsSuccess, fetchPostsFailure} from '../store/postSlice'
import generateExcerpt from '../utils/generateExcerpt'
import formatDate from '../utils/formatDate'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.posts)
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    dispatch(fetchPostsSuccess(posts.documents));
                }
            })
            .catch((error) => {
                console.error("Failed to fetch posts:", error);
                dispatch(fetchPostsFailure(error.message));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch]);

    const handleCardClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    if(loading) {
        return (
            <div className='flex justify-center items-center w-full py-8 mt-4 font-bold min-h-screen'>
                <Loading />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Container>
                <section className="py-12">
                    <div className="text-center mb-16 animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">BlogShog</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Discover amazing stories, insights, and ideas from talented writers around the world. 
                            Join our community of thinkers and creators.
                        </p>
                    </div>

                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <div 
                                key={post.$id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <BlogCard
                                    id={post.$id}
                                    title={post.title}
                                    excerpt={post.excerpt || generateExcerpt(post.content)}
                                    author={post.author}
                                    date={formatDate(post.publishedDate || post.$createdAt)}
                                    image={post.featuredImage}
                                    onClick={() => handleCardClick(post.$id)}
                                />
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className='w-full py-8 mt-4 text-center'>
                            <h1 className='text-2xl font-bold text-gray-300 hover:text-white'>
                                No posts found
                            </h1>
                        </div>
                    )}
                </section>
            </Container>
        </div>
    )
}

export default Home