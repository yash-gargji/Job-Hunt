import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

import dotenv from 'dotenv';
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
    
});

export default cloudinary;