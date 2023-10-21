import Image from 'next/image'
import "bootstrap/dist/css/bootstrap.css";
import styles from "../_css/createPost.module.css";

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'

const Dropzone = ({ className,crt_post,changeCon }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'video/*':[]
    },
    maxSize: 1024 * 5000000000,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!files?.length) return

   changeCon({...crt_post,attachements:files})
    console.log(crt_post)
    const formData = new FormData()
    files.forEach(file => formData.append('file', file))
    formData.append('upload_preset', 'friendsbook')

    // const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL
    // const data = await fetch(URL, {
    //   method: 'POST',
    //   body: formData
    // }).then(res => res.json())

   // console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} >
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()}  />
        <div className={`d-flex flex-column align-items-center ${styles.dragArea}`} >
          {
           <ArrowUpTrayIcon className='fill-current' style={{width:"100px"}} />  }
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='d-flex flex-column align-items-center'>
        
          <h2 className='font-semibold'>Preview</h2>
          <div >
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
          >
            Remove all files
          </button>
          <button
            type='submit'
            className='ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors'
          >
            Upload to Cloudinary
          </button>
        </div>

        {/* Accepted files */}
        <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 d-flex'>
          {files.map(file => (
            <li key={file.name}  style={{listStyleType:"none",marginLeft:"20px",flexWrap:"wrap"}}>
             {file.type.substring(0,1)=="i" && <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full object-contain rounded-md'
              />}
              
                
              <button
                type='button'
                className='rounded'
                style={{width:"17px",height:"17px",paddingTop:"0px",marginLeft:"-13px",marginTop:"-23px",maxWidth:"100px"}}
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon style={{marginTop:"-5px"}}/>
              </button>
              <p className='mt-2 flex-wrap' style={{maxWidth:"100px"}} >
                {file.name.substring(0,10)+".."+file.name.substring(file.name.length-5)}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        <h3 className='title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3'>
          Rejected Files
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between' style={{maxWidth:"100px"}}>
              <div>
                <p className='mt-2  text-sm font-medium flex-wrap' style={{flexWrap:"wrap",maxWidth:"100px"}}>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </form>
  )
}

export default Dropzone
