import { Postcard, Container } from "../components/index"
import { useEffect, useState } from "react"
import appwriteService from "../appwrite (service)/config"
import Loading  from "../components/ui/Loading"
import { useSelector } from 'react-redux'

function MyPosts() {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const posts = useSelector(state => state.posts.posts)
    const userData = useSelector((state) => state.auth.userData);
    const filteredPosts = posts.filter(post => post.userId === userData.$id);

    const loadImages = async () => {
        if(posts){
            const imagePromises = posts.map(post => appwriteService.filePreview(post.featuredImage));
            await Promise.all(imagePromises);
            setImagesLoaded(true);
        }
    }

    useEffect(() => {
        loadImages();
    },[])

    if(!imagesLoaded) {
        return <div className="w-full flex justify-center items-center font-bold h-screen">
            <Loading />
        </div>
    }

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
        <div className="w-full px-9 sm:px-0 py-8">
            <Container>
                <div className="flex flex-wrap -mx-2">
                {posts && posts.map((post) => 
                (
                    post.userId === userData.$id &&
                    <div key = {post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <Postcard {...post} />
                    </div>
                ))}
                </div>
            </Container>
        </div>
    )
}

export default MyPosts