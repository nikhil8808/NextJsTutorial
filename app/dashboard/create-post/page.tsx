"use client";

import React from 'react'
import { useUser } from '@clerk/nextjs'
import TextEditorComponent from '@/app/components/TextEditorComponent';
import ReactQuill from 'react-quill-new';
import { FileInputComponent } from '@/app/components/FileInputComponent';
import { storeImage } from '@/app/firebase/firestore';


const CreatePostPage = () => {

  const { isLoaded, user } = useUser();
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    title: '',
    category: '',
    content: '',
  });


  const handleInputChange = (name:string,value:string) => {
   
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (user?.publicMetadata?.isAdmin !== true) {
    return <div>Access Denied. You do not have permission to create a post.</div>
  }

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  }

  const handleSubmit = async (e:any)=>{
    e.preventDefault();

    try{
      const imageUrl=await storeImage(file)
        console.log(" IMAGE UPLOADED SUCCESSFULLY")
        console.log(formData, file,imageUrl);
    }catch(err){
      console.log('Error submitting post:', err);
    }
  }


  return (
    <form className='w-full mx-auto max-h-screen flex justify-center'>
      <div className='min-w-3xl border-1 max-h-full rounded-xl flex flex-col gap-2  p-4'>
        <div className='flex justify-center'>
          <h4 className='text-xl font-semibold '>Create a post</h4>
        </div>
        <div className='flex items-center gap-4 px-4'>
          <div className='w-[70%]'>
            <input type="text"
             className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter post title"
              name="title"
              value={formData.title}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              />
          </div>

          <div className='w-[30%]'>
            <select 
            name="category" 
            id="category" 
            className="w-full p-2 border border-gray-300 rounded-md"
             onChange={(e) => handleInputChange(e.target.name, e.target.value)}
             
             >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>
        <div className='px-4'>
          <TextEditorComponent 
           handleInputChange={handleInputChange}
           content={formData.content}
          />
        </div>
        <div className='px-4'>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-4 w-full h-50 rounded-lg object-cover"
            />
          )}
        </div>
        <div className='px-4'>
          <FileInputComponent
            onFileChange={handleFileChange}

          />
        </div>
        <div className='flex justify-end px-4'>
          <button 
            onClick={handleSubmit}
          className='bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
          >
            Submit Post
          </button>
        </div>


      </div>

    </form>
  )
}

export default CreatePostPage