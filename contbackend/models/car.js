const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const carSchema = new mongoose.Schema(
  {
    name: {

      type: String,
      required: true, 
    },

    price: {
      type: Number,
      required: true,
    },

    description: {

      type: String,
    },
    title: {


      type: String,
    },

    marka_name: {
required: true,
      type: String,
    },

    marka_id: {

      type: ObjectId,
      ref: "Marka",

    },

    maked_year: {

      type: Number,

    },

    engine_capacity: {

      type: Number,

    },
    distance: {

      type: Number,

    },






    images: [

{secure_url: String, public_id: String,title:String}

    ]
   
   
  



  },

  { timestamps: true }
);

module.exports = mongoose.model("car", carSchema);