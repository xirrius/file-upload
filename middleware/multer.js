const fs = require("fs");
const multer = require("multer");

// Configure storage options
const storage = multer.diskStorage({ // allows you to decide where to store the file and what to name it
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
