import React , {useState,  ChangeEvent} from 'react'
import { db, storage } from '../config/firebase'
import {   updateDoc, doc} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import { selectPix, setPix } from '../redux/userProfilePixSlice';
import { useDispatch, useSelector } from 'react-redux';



const UploadProfileImage  = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const downloadURL = useSelector(selectPix)
    const dispatch = useDispatch()

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
    
        if (files && files.length > 0) {
          setSelectedImage(files[0]);
        }
      };
    

    const handlleImageUpload = async () => {
        if(!selectedImage) {
            console.error('No image selected')
            return
        }

        const storageRef = ref(storage, 'profile_images/' + selectedImage.name);

        try {
            // Upload image to Firebase Storage
            await uploadBytes(storageRef, selectedImage);
    
            // Get download URL of the uploaded image
            const downloadURL = await getDownloadURL(storageRef);
    
            // Update Firestore document with the download URL
            const docRef = doc(db, 'userDetails', 'NahYlYQLZwMSZVVST12z'); 
            await updateDoc(docRef, {
                pix: downloadURL,
            });
            dispatch(setPix(downloadURL))
    
            alert('Image uploaded successfully');
        } catch (error) {
            console.log('Error uploading image:', error);
        }
    }

    
  return (
    <div className='w-full flex flex-col  justify-start text-left '>
        <h4 className='hidden lg:flex text-secondary font-semibold' >Your Profile Picture</h4>

        {downloadURL && (
            <img src={downloadURL} alt="profile pix" className='w-32 h-32 lg:w-48 lg:h-48 rounded-lg mt-4'/>

        )}
        


        
        <div>
            <input type="file"  onChange={handleImageChange} className='mt-4 w-full'/>
            <button onClick={handlleImageUpload} className='bg-pry-col mt-4 mb-4 lg:mb-0 flex justify-start text-[#FFF] lg:px-6 px-4  py-2 lg:py-3 rounded-[4px] font-bold'>Upload Image</button>

        </div>
            
        
    </div>
  )
}

export default UploadProfileImage