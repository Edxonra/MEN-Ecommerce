const express = require('express')
const multer = require('multer');
const router = express.Router()

storageFolder = process.env.STORAGE

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+".jpg");
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  if(!req.file){
    return res.send('No image')
  }
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const fileExtension = req.file.originalname.toLowerCase().slice(-4);
  if (!allowedExtensions.includes(fileExtension)) {
    return res.send('Invalid file format');
  }
  res.send('Image uploaded successfully');
});

module.exports = router