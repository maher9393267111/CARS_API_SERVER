
const express = require("express");
const router = express.Router();

const {createMarka, getAllmarkas} = require("../controllers/marka");

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



router.post("/create", upload.single("image"), createMarka);

router.get("/get-all", getAllmarkas);




module.exports = router;