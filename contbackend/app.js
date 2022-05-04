
const path = require('path')
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// app
const app = express();

const marka =require('./routes/marka')
const car =require('./routes/car')

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
 app.use(express.static(path.join(__dirname, 'upload')));

 console.log(path.join(__dirname, 'upload'));






// routes middleware

app.use('/api/marka',marka)
app.use('/api/car',car)




//   readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));



mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
     
    })
    .then(() => console.log('DB Connected'));










//PORT 

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})