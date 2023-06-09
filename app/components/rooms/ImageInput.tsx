'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../../friebase/config';

import styles from './rooms.module.css'

let imageUploadHandler
let images

const ImageInput = () => {
    const [imagesPreview, setImagesPreview] = useState([])
    const [uploadProgress, setUploadProgress] = useState()

    const imageRef = useRef()

    const imageInputHandler = (e) => {
        if (e.target.files) {
            images = e.target.files
        }

        const files = Array.from(e.target.files)
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(prev => [...prev, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    /**
     * upload image to firebase database and get the url of the image
     */

    // Helper function
      imageUploadHandler = async (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = image.name
            const storageRef = ref(storage, fileName)
            const uploadFile = uploadBytesResumable(storageRef, image)

            uploadFile.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done")
                setUploadProgress(progress)
            },
                (error) => {
                    console.log(error)
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadFile.snapshot.ref).then(downloadURL => {
                        resolve(downloadURL)
                    })
                }
            )
        }
        )
        
    }

    /**
     * hide the image input  but
     * when click on the container
     * trigger the input
     */
    const onSelectImageHandler = () => {
        imageRef.current.click();
    };

    return (
        <div className={styles.imageInput__container}>
            <div onClick={onSelectImageHandler} className={styles.imageInput__featuredImage} >
                {images ? imagesPreview.map((image, index) => (
                    <div className={styles.previewImage__container}>
                        <button>x</button>
                        <Image key={index} src={image} alt="preview" width={90} height={110} />
                    </div>
                )) : (
                    <div>
                        <p>Select an image</p>
                    </div>
                )}
            </div>
            <input style={{display: "none"}} ref={imageRef} type="file" multiple onChange={imageInputHandler} />
            <p>Upload is <br></br>{parseFloat(uploadProgress).toFixed(2)} % done</p>
        </div>
    )
}

export const uploadPhotos = async () => {
    let imageUrls = await Promise.all(
        [...images].map((image) => imageUploadHandler(image))
    ).catch(() => {
        return
    })
    return imageUrls
}

export default ImageInput