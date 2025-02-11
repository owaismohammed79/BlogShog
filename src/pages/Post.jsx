import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite (service)/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loading from "../components/ui/Loading";

export default function Post() {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    //Only if both the post and the userData exist then check if the person viewing this page is the author or not to give him edit access 
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const [previewUrl, setPreviewUrl] = useState(null);
    useEffect(() => {
        if (slug) {
            try{
                appwriteService.getPost(slug).then((post) => {
                    if (post) {
                        setPost(post);
                        setPreviewUrl(appwriteService.filePreview(post.featuredImage))
                    }
                    else navigate("/home");
                });
            } catch (error) {
                setError(error);
                console.log(error);
            }
        } else navigate("/home");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/home");
            }
        });
    };

    if(error) {
        return <div className="flex justify-center items-center h-screen font-bold">{error}</div>
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 h-96">
                    <img
                        src={previewUrl.href}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)
                    //This parsing is coz by default the RTE sends in the content in HTML format and this parses it to show the content as it should look and not the HRML
                    }
                    </div>
            </Container>
        </div>
    ) : (<div className="w-full flex justify-center items-center font-bold h-screen">
        <Loading />
        </div>);
}