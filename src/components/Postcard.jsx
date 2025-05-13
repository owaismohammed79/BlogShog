import appwriteService from '.././appwrite (service)/config' //Isme post creation, deletion, preview wale fns he
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

//This is the card component which will render the blog posts in card format
function Postcard({
    $id, //This is the name given by react router dom i.e $id is the var name (we can't change)
    title,
    featuredImage,
}) {
    const [previewObject, setPreviewObject] = useState(null);
    
    useEffect(()=>{
        setPreviewObject(appwriteService.filePreview(featuredImage));
    },[featuredImage, setPreviewObject])


  return (//Realize ki sab ko Link tag ke andar enclose kia h
    <Link to={`/posts/${$id}`}>
        <div className='w-full h-80 bg-gray-100 rounded-xl  flex flex-col justify-between'>
            <div className='h-2/3 rounded-xl flex'>
                {/*Idhar filePreview fn asks for fileId jisme ki featuredImage ki Id bhej rahe he kyunki uska preview chahiye na hame*/}
                <img src={previewObject?.href} alt ={title} className='rounded-t-xl w-full object-cover'/>
            </div>
            <div className='h-1/3 text-2xl font-bold flex flex-col justify-center items-center'>
                {title}
            </div>
        </div>
    </Link>
  )
}

Postcard.propTypes ={
    title: PropTypes.string.isRequired,
    $id: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired
}

export default Postcard