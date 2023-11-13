const express = require('express')

var fs = require('fs');
const path = require('path')
const app = express()
const port = 5000

var imagePath = path.join(path.resolve(__dirname), '/images/');
let jsonPath = path.join(path.resolve(__dirname,), '/data/articles.json');

app.use('/images', express.static(path.join(__dirname, 'images')))

app.get('/files', getDirectoryContent, (req, res) => {
  //res.send(res.locals.filenames)
    const arr = []
    
    fs.readFile(jsonPath, 'utf8', function (err, data) {
        let jsonData = JSON.parse(data);
        //console.log(jsonData)
        //res.writeHead(200, {'Content-Type': 'text/plain'});
        for (var i=0; i<res.locals.filenames.length; i++){
            const obj = {}
            obj.title = jsonData[i].title
            obj.desc = jsonData[i].description
            arr.push(obj)
        }
        console.log("Object is: " + JSON.stringify(arr))
        res.json(arr)
    })


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getDirectoryContent(req, res, next) {
    fs.readdir(imagePath , function (err, images) {
      if (err) { return next(err); }
      res.locals.filenames = images;
      next();
    });
  }