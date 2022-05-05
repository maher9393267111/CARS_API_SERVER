
const express = require("express");
const router = express.Router();

const {createCar,
    
    getAllcars,
    filterCars,

} = require("../controllers/car");

const multer = require("multer");
//const { loginCheck } = require("../middleware/auth");

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "contbackend/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });



router.post("/create", upload.array("images"), createCar);

router.get("/get-all", getAllcars);

router.post("/filter", filterCars);




module.exports = router;