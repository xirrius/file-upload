const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) { // no path supplied
      console.log(`File does not exist.`);
      return null
    };
    const response = await cloudinary.uploader.upload(localFilePath, { // cloudinary ke uploader se hm file ko upload krte h, by providing the file path in our server
      resource_type: "auto", // type of file - .jpg, .png
    }); // this returns the url of the uploaded file
    console.log("file is uploaded on cloudinary.", response.url);
    return response.url; // uploadOnCloudinary yhi url return kr dega
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadOnCloudinary;
