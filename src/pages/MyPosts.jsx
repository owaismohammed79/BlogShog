import { Container } from "../components/index"
import { useSelector } from 'react-redux'
import generateExcerpt from '../utils/generateExcerpt'
import formatDate from '../utils/formatDate'
import { useNavigate } from 'react-router-dom'
import { BlogCard } from '../components'

function MyPosts() {
    const posts = useSelector(state => state.posts.posts)
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const filteredPosts = posts.filter(post => post.userId === userData.$id);

    const handleCardClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    if(!filteredPosts || filteredPosts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts found
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPosts.map((post, index) => (
                    <div 
                        key={post.$id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <BlogCard 
                            id={post.$id}
                            title={post.title}
                            image={post.featuredImage}
                            excerpt={post.excerpt || generateExcerpt(post.content)}
                            date={formatDate(post.publishedDate || post.$createdAt)}
                            author={post.author}
                            onClick={() => handleCardClick(post.$id)}
                        />
                    </div>
                ))}
                </div>
            </Container>
        </div>
    )
}

export default MyPosts