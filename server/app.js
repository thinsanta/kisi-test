const express = require('express')

var fs = require('fs');
const path = require('path')
const multer = require('multer');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

var imagePath = path.join(__dirname, '/images/');
let jsonPath = path.join(__dirname, '/data/articles.json');

// Takes the file and checks if it's a png, jpg file and uploads it to images directory
const storage = multer.diskStorage({
  destination: './images',
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    const fileExtension = file.originalname.split('.').pop();

    if (['png', 'jpg'].includes(fileExtension)) {
      cb(null, uniqueFilename);
    } else {
      cb(new Error('Only .png and .jpg images are allowed'));
    }
  },
});

// Enable CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const upload = multer({ storage: storage });

app.use('/images', express.static(path.join(__dirname, 'images')))

app.get('/files', getDirectoryContent, cors(corsOptions), (req, res) => {
    const arr = []
    
    fs.readFile(jsonPath, 'utf8', function (err, data) {
        let jsonData = JSON.parse(data);
        for (var i=0; i<res.locals.filenames.length; i++){
            const obj = {}
            obj.title = jsonData[i].title
            obj.desc = jsonData[i].description
            obj.image = res.locals.filenames[i]
            arr.push(obj)
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(arr)
        .end()
    })


})

// The request to make the upload of image is done here
app.post('/upload', upload.single('image'), async (req, res) => {
  const imageUrl = req.file.path;

  try {
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading image');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// get the names of the images
function getDirectoryContent(req, res, next) {
    fs.readdir(imagePath , function (err, images) {
      if (err) { return next(err); }
      res.locals.filenames = images;
      next();
    });
  }