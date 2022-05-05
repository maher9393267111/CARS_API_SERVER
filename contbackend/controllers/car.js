const carModel = require("../models/car");
const cloudinary = require("../helper/cloudinary");
const markaModel = require("../models/marka");

// create car

exports.createCar = async (req, res, next) => {
  const {
    name,
    marka_id,
    marka_name,
    price,
    title,
    description,
    distance,
    maked_year,
  } = req.body;
  console.log(req.body);

  const folder = "cars";
  ("hello ex branch here");

  //check if marka_id exist in marka schema as objectid if not exist stop the process

  const marka = await markaModel.findById(marka_id);

  if (!marka) {
    console.log("marka not found");
    return;
  }

  if (marka) {
    console.log(marka, "marka is exist");

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
};

//get all cars

exports.getAllcars = async (req, res, next) => {
  const cars = await carModel.find().select("name marka_name price maked_year distance");

  res.status(200).json({
    success: true,
    message: "cars fetched",
    data: cars,
  });
};

// filter cars with all fields is not empty

exports.filterCars = async (req, res, next) => {
  const { marka_name, distance, maked_year, max_price } = req.body;
  console.log(req.body.marka_name);

  //convert distance to number and max_price to number

  console.log(Number.isNaN(distance), Number.isNaN(max_price));

  // find where price is equal to max_price or less than max_price

  const price = max_price ? { price: { $lte: max_price } } : {};
  


  //$and use to filter by multiple conditions
  const carFilter = await carModel.find({
    $and: [
      { mark_name: marka_name },
      { distance: distance },
      { maked_year: maked_year },
      price,
    ],
  });

  // const cars = await carModel.find({marka_name,distance,maked_year,price:{$lte:max_price}});

  res.status(200).json({
    success: true,
    message: "cars fetched",
    data: carFilter,
  });
};



// pagination all cars
// http://localhost:5000/api/car/pagination?page=2&limit=10

exports.paginationCars = async (req, res, next) => {

    const { page, limit } = req.query;
    
    const skip = (page - 1) * limit;
    
    const cars = await carModel.find().skip(skip).limit(limit).select("name marka_name price ");
    
    res.status(200).json({
        success: true,
        message: "cars fetched",
        data: cars,
    });
    }



    