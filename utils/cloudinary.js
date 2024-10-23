const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "domyilmbz",
  api_key: "916673759325362",
  api_secret: "GGe1IBCq3lc8F3-EDYSCIw5iUQ4", // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log(`File does not exist.`);
      return null
    };
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded on cloudinary.", response.url);
    return response.url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadOnCloudinary;
