const multer=require ('multer');
const path = require('path');


const storage = multer({
  fileFilter: function (req, file, callback) {
      const fileExtension = file.originalname.split(".").pop().toLowerCase();

      if (["png", "jpg", "jpeg"].indexOf(fileExtension) === -1) {
          return callback(null, false);
      }
      callback(null, true);
  },
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
          const uploadFolderPath = path.join(__dirname, '../uploads');
          cb(null, uploadFolderPath);
      },
      filename: (req, file, cb) => {
          cb(null, `${Date.now().toString()}-${file.originalname}`);
      },
  }),
});
  
module.exports = {
  upload: storage
};