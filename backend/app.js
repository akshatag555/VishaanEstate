const express=require ('express');
const app=express();
const cors = require('cors');
const cookieParser=require('cookie-parser')
if(process.env.Node_ENV!=="production"){
    require("dotenv").config({path:'backend/config/config.env'});
}
app.use(express.json());
app.use(express.json({limit:'50mb'}))
const bodyParser = require('body-parser');
// app.use(bodyParser.json({ limit: '50mb',extended:true }));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 99999999999999,
    extended: true 
  }));
app.use(cookieParser())
app.use(cors());
 const apartment=require("./routes/Apartment");
const user=require("./routes/User")
//using route
 app.use("/api/v1",apartment)
 app.use("/api/v1",user)
module.exports=app;