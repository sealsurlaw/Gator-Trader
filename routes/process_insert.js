var express = require("express");
var pgp = require('pg-promise');
var url = require('url');
var router = express.Router();
var db = require('../db');
var formidable = require('formidable');
var fs = require('fs');
var hash = require('object-hash');
var im = require('node-imagemagick');

var filename;
var thumbname;

let resizeWidth = 200;



// Function to call after crop is finished
var cropImageCallback = function(err, stdout, stderr){
  if (err) throw err;
  console.log('Cropped');
  console.log('Resizing');
  // Resize image
  im.resize({
    srcPath: './public/images/user_images/' + thumbname,
    dstPath: './public/images/user_images/' + thumbname,
    width:   resizeWidth
  }, resizeImageCallback(err, stdout, stderr));
}

// Function to call after resize is finished
var resizeImageCallback = function(err, stdout, stderr){
  if (err) throw err;
  console.log('Resized');
}

// Function to call after size is determined
var identifySizeCallback = function (err, features) {
  if (err) throw err;

  // Get height and width
  let width = features.width;
  let height = features.height;

  // Get smallest dimension
  let smallestDimension = Math.min(height, width);

  // Crop width from center
  console.log("Cropping...")
  im.crop({
    srcPath: './public/images/user_images/' + filename,
    dstPath: './public/images/user_images/' + thumbname,
    width: smallestDimension,
    height: smallestDimension,
    quality: 1,
    gravity: "Center"
  }, cropImageCallback);

}



router.post('/', function(req, res, next) {
  // Get incoming form
  var form = new formidable.IncomingForm();
  // Parse incoming form
  form.parse(req, function (err, fields, files) {

    // Hash the time now for uncollidable filenames
    var name = hash.sha1(Date.now());
    // If the file is a jpeg...
    if (files.image_file.type == 'image/jpeg') {
      // Append the correct suffix
      filename = name + '.jpg';
      thumbname = name + '_thumb.jpg';
    }
    // If the file is a png...
    else if (files.image_file.type == 'image/png') {
      // Append the correct suffix
      filename = name + '.png';
      thumbname = name + '_thumb.png';
    }
    else {
      res.write("Not an image file");
      res.end();
    }

    console.log(filename);

    // Get temp path of uploaded image
    var oldpath = files.image_file.path;
    // Specify new path for uploaded image
    var newpath = './public/images/user_images/' + filename;
    // Move and rename image file to public/images/
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;

      // Read height and width
      im.identify(newpath, identifySizeCallback);


      // Insert new item into database
      db.any(`INSERT INTO item(
          item_title,
          item_description,
          item_price,
          item_status,
          user_id,
          category_id,
          item_image,
          item_availability,
          item_image_thumbnail
        )
        VALUES
        (
          '` + fields.title + `',
          '` + fields.description + `',
          '` + fields.price + `',
          'Pending',
          ` + req.signedCookies.id + `,
          ` + fields.category + `,
          'images/user_images/` + filename + `',
          true,
          'images/user_images/` + thumbname + `'
        )`
      )
      // Query returns with data called 'myData'
      .then(function(myData) {
        res.write('Item stored in database!');
        res.end();
      })
      .catch(function(error) {
        // Print out error
        console.log(error);
      });
    });
  });
});
module.exports = router;
