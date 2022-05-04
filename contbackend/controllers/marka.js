const markaModel = require('../models/marka');
const cloudinary = require('../helper/cloudinary');


// create marka

exports.createMarka = async(req, res, next) => {


   const {name} = req.body;

  
   const imageinfo = req.file;

   // upload image to cloudinary to category folder
   
   const folder = 'category';
   
     console.log(imageinfo);
   
     const image = req.file.path;
     console.log("image--->", image);
     console.log("req.body--->", req.body.name);
   
     // cloudinary
   
     const result = await cloudinary.uploader.upload(image, { folder: folder });
   
     console.log("setion image------>", result.secure_url);


     const imagedata = {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };



      const newmarka = new markaModel({
        name: name,
        image: imagedata,
      });

      try {
        await newmarka.save();
    
        res.status(201).json(newmarka);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }



}




exports.getAllmarkas = async (req, res) => {

    try {
        const allCategory = await markaModel.find();
    
        res.status(200).json(allCategory);

    }

    catch (error) {
      res.status(409).json({ message: error.message });
    }

   




    }
