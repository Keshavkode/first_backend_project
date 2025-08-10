import {v2 as cloudinary} from "cloudinary"
import { error } from "console";
import fs from "fs"


// import { v2 as cloudinary } from 'cloudinary';

// (async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
//   

const uploaderfile = async (localfilepath)=>{
 try{
  if(!localfilepath) return error

//   upload file
 const response  =await cloudinary.uploader .upload(localfilepath, {
        resource_type : "auto"
       } )
//  file upload ho gai
  console.log("fule is upload ho gai " ,response.url)
  return response;
 }catch(error){
    fs.unlinkSync(localfilepath)
    return null
    
 }
    
}
 export {uploaderfile}













































// Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();