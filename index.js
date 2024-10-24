// upload
// express-fileupload - alternative of multer
// multer - multipart/form-data - file, image, video, audio 
// server receives file - temporarily store karenge
// 3rd party server m file upload - wo return karege link
// file store ki thi use delete krke, link use karenge
// cloudinary - 3rd party server

require('dotenv').config()
const express = require("express");
const cors = require("cors");
const upload = require("./middleware/multer");
const uploadOnCloudinary = require("./utils/cloudinary");

const app = express();

app.use(express.json());
app.use(express.static("./public/template")); // static asset rendering. jb hm localhost:5000 open karenge browser m toh index.html dikhega
app.use(cors());


// ye route pr hm tb navigate karenge jb hm form submit karenge
app.post(
  "/upload", 
  upload.fields([ 
    // this upload middleware comes from multer. ye hmare sare files ko upload kr dega. yha jo name diya h it is the same as the name of input field in index.html jisme humare file store h.
    { name: "profile_picture", maxCount: 1 },
    { name: "video_file", maxCount: 1 },
    { name: "audio_file", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  async (req, res) => {
    // Access the uploaded files and text fields
    console.log(req.files); // All uploaded files
    console.log(req.body.username);

    const profile = await uploadOnCloudinary(req.files.profile_picture[0].path); // upload img on cloudinary
    // const video = await uploadOnCloudinary(req.files.video_file[0].path);
    // const audio = await uploadOnCloudinary(req.files.audio_file[0].path);
    // const document = await uploadOnCloudinary(req.files.document[0].path);

    // display the uploaded img
    res.send(`<h1>Hi there, ${req.body.username}</h1>
      <img src='${profile}' alt=''/> 
      `);
    //   <video width="600" controls>
    //     <source src="${video}" type="video/mp4">
    //     Your browser does not support the video tag.
    // </video>'
    //   <audio controls>
    //     <source src="${audio}" type="audio/mpeg">
    //     Your browser does not support the audio element.
    // </audio>
    // <iframe src="${document}" width="600" height="500">
    //     Your browser does not support iframes. Please download the PDF instead: 
    //     <a href="${document}">Download PDF</a>
    // </iframe>
  }
);

app.listen(5000, () => {
  console.log(`Server listening on http://localhost:5000.`);
});
