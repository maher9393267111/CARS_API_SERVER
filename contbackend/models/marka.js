const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const markaSchema = new mongoose.Schema(
  {
    name: {

      type: String,
      required: true,
    },

    image: {
secure_url: String,
public_id: String


  },

},
  { timestamps: true }
);

module.exports = mongoose.model("Marka", markaSchema);