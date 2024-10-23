const fs = require("fs");
const multer = require("multer");

// Configure storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Naming the file
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
