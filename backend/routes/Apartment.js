const express = require("express");
const { ListApartment, DeleteApartment, UpdateApartment, getApartments, getUsersApartment, Apartment } = require('../controllers/Apartment');
const { isauth } = require("../middleware/auth");

const { upload } = require("../middleware/multer");
// const multer=require ('multer');
// const path = require('path');


// const storage = multer({
//   fileFilter: function (req, file, callback) {
//       const fileExtension = file.originalname.split(".").pop().toLowerCase();

//       if (["png", "jpg", "jpeg"].indexOf(fileExtension) === -1) {
//           return callback(null, false);
//       }
//       callback(null, true);
//   },
//   storage: multer.diskStorage({
//       destination: (req, file, cb) => {
//           const uploadFolderPath = path.join(__dirname, '../uploads');
//           cb(null, uploadFolderPath);
//       },
//       filename: (req, file, cb) => {
//           cb(null, `${Date.now().toString()}-${file.originalname}`);
//       },
//   }),
// });
  
const router = express.Router();
router.route("/apartment/list").post(isauth,upload.array('photos',6),ListApartment);
router.route("/apartment/:id").delete(isauth,DeleteApartment);
router.route("/apartment/:id").put(isauth,UpdateApartment);
router.route("/apartment/get").get(isauth,getApartments);
router.route("/myapartments").get(isauth,getUsersApartment);
router.route("/apartments").get(isauth,getApartments);
router.route("/apartment/:id").get(isauth,Apartment);
module.exports=router;