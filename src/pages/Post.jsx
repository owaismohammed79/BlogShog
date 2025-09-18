import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite (service)/config";
import { Button } from "../components";
import { useSelector } from "react-redux";
import Loading from "../components/ui/Loading";
import DOMPurify from 'dompurify';
import { ArrowLeft, Calendar, User, Share2, ArrowUp, CheckCircle2Icon } from 'lucide-react';
import formatDate from "../utils/formatDate";
import { Query } from "appwrite";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { createPortal } from 'react-dom';

export default function Post() {
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [error, setError] = useState(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    post.content = DOMPurify.sanitize(post.content, { USE_PROFILES: { html: true } });
                    setPost(post);
                    setPreviewUrl(appwriteService.filePreview(post.featuredImage));

                    appwriteService.getPosts([Query.limit(3)]).then((postsData) => {
                        if (postsData) {
                            const filteredPosts = postsData.documents
                                .filter((p) => p.$id !== slug)
                                .slice(0, 2);
                            setRelatedPosts(filteredPosts);
                        }
                    });

                } else {
                    navigate("/");
                }
            }).catch((error) => {
                setError(error.message || "Failed to fetch post.");
                console.log(error);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setAlertMessage("URL copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy URL:", err);
      setAlertMessage("Failed to copy!")
    } finally {
      setIsAlertVisible(true);
      setTimeout(() => setIsAlertVisible(false), 3000);
    }
  };

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (error) {
        return <div className="flex justify-center items-center h-screen font-bold text-red-500">{error}</div>
    }

    if (!post) {
        return (
            <div className="w-full flex justify-center items-center font-bold h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 pt-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to all posts</span>
                </button>
            </div>

            <div className="relative h-96 my-8 overflow-hidden">
                <img
                    src={previewUrl?.href}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                {isAuthor && (
                    <div className="absolute right-6 top-6 z-10">
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

            <article className="max-w-4xl mx-auto px-4 pb-20">
                {isAlertVisible && createPortal(
                    <div className="w-full">
                        <Alert variant="default" className="left-1/2 -translate-x-1/2 rounded-full w-56 md:w-60 fixed bottom-12 h-12 flex items-center justify-center">
                            <CheckCircle2Icon className="h-4 w-4" />
                            <AlertTitle className="m-0">{alertMessage}</AlertTitle>
                        </Alert>
                    </div>,
                    document.body
                )}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                        <div className="flex items-center space-x-2">
                            <User className="w-5 h-5" />
                            <span className="font-medium text-gray-300">{post.author || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span>{formatDate(post.publishedDate || post.$createdAt)}</span>
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800/50 rounded-full transition-colors" onClick={handleShare}>
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                        </button>
                    </div>

                    {post.excerpt && (
                        <p className="text-xl text-gray-300 leading-relaxed italic border-l-4 border-gray-600 pl-6">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                <div className="prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                {relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.$id}
                                    to={`/posts/${relatedPost.$id}`}
                                    className="glass-effect rounded-xl p-6 cursor-pointer group hover:scale-105 transition-all duration-300 block"
                                >
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                        {relatedPost.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>{relatedPost.author}</span>
                                        <span>{formatDate(relatedPost.publishedDate || relatedPost.$createdAt)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
            
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 z-50 animate-fade-in"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}