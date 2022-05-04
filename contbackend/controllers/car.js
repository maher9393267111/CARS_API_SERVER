const carModel = require('../models/car');
const cloudinary = require('../helper/cloudinary');
const markaModel = require('../models/marka');


// create car 


exports.createCar = async(req, res, next) => {


    const {name, marka_id,marka_name,price,title,description,distance,maked_year} = req.body;
console.log(req.body)

    const folder = "cars";


//check if marka_id exist in marka schema as objectid if not exist stop the process


    const marka = await markaModel.findById(marka_id);

    if (!marka) {
        console.log("marka not found");
return 
    }





if (marka)  {

    console.log(marka,'marka is exist')



  const images = req.files;

  console.log(images);

  const images_Array = [];

  for (let i = 0; i < req.files.length; i++) {
    console.log(i + "front_images looop -->", req.files[i]);

    const resp = await cloudinary.uploader.upload(
      req.files[i].path,

      //{ use_filename: true, unique_filename: false },
      { folder: folder },
      (error, result) => {
        if (error) {
          console.log(error);
        }
        //  console.log("resuuuuuuuult", result);
        images_Array.push({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
  }



const newData = new carModel({

    name,
    marka_id,
    marka_name,
    title,
    description,
    distance,
    maked_year,
    price,
    images: images_Array,

});

const newCar = new carModel(newData);

newCar.save((err, data) => {
    if (err) {
      res.json({
        success: false,
        message: "car not created",
        error: err,
      });
    } else {
      res.json({
        success: true,
        message: "car created",
        data,
      });
    }
  });
    
}


}



//get all cars

exports.getAllcars = async(req, res, next) => {

    const cars = await carModel.find();

    res.status(200).json({
        success: true,
        message: "cars fetched",
        data: cars,
    });

}



