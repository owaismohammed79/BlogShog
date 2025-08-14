import appwriteService from '../appwrite (service)/config'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { Calendar, User } from 'lucide-react';

function BlogCard({
    id,
    title,
    image,
    excerpt,
    date,
    author,
    onClick
}) {
    const [previewObject, setPreviewObject] = useState(null);
    
    useEffect(()=>{
        if (image) {
            setPreviewObject(appwriteService.filePreview(image));
        }
    },[image])

  return (
    <div 
        onClick={onClick}
        className="glass-effect rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:bg-gray-800/40 h-full flex flex-col"
    >
        <div className="relative h-48 overflow-hidden">
            <img 
                src={previewObject?.href} 
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white mb-3 transition-colors line-clamp-2">
                {title}
            </h3>
            <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed flex-grow">
                {excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{author || 'BlogShog User'}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{date}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

BlogCard.propTypes ={
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default BlogCard