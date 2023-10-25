const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_KEY,
    api_secret : process.env.CLOUDINARY_SECRET
});

const postStorage = new CloudinaryStorage({
    cloudinary,
    params : {
        folder : 'post',
        allowedFormats : ['jpeg','jpg','png', 'mp4', 'pdf', 'mp3']
    }
});

const userStorage = new CloudinaryStorage({
    cloudinary,
    params : {
        folder : 'user',
        allowedFormats : ['jpeg','jpg','png']
    }
});

module.exports = { postStorage, userStorage, cloudinary };