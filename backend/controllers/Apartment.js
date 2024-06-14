const Apartment = require("../model/Apartment");
const  User= require("../model/User");
const cloudinary=require("cloudinary")
exports.ListApartment = async (req, res) => {
  try {
      req.body.owner = req.user.id;
      const imageUrls = req.files;
      
      console.log(imageUrls)
      const cloudinaryImages = []; // Array to store Cloudinary image data
      //console.log(req.body)
      for (const imageUrl of imageUrls) {
          try {
              // Upload each image to Cloudinary
              const cloud = await cloudinary.v2.uploader.upload(imageUrl.path, {
                  folder: "apartment"
              });

              // Extract public_id and secure_url from the Cloudinary response
              const { public_id, secure_url } = cloud;

              // Add public_id and secure_url to the cloudinaryImages array
              cloudinaryImages.push({ public_id, url: secure_url });

              console.log(cloud); // Display the response from Cloudinary
          } catch (error) {
              console.error('Error uploading image to Cloudinary:', error);
              return res.status(500).send('Apartment can\'t be listed as there is an error uploading an image');
          }
      }

      // Set the array of Cloudinary image data to req.body.imageUrls
      req.body.imageUrls = cloudinaryImages;

      // Create the new apartment with the updated req.body
      const newApartment = await Apartment.create(req.body);

      res.status(201).json({
          success: true,
          message: "Apartment Listed",
          newApartment,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message,
      });
  }
}
exports.DeleteApartment=async(req,res)=>{
    try {
        //console.log("intitate")
        const apart=await Apartment.findById(req.params.id);
        if(!apart){
          return res.status(404).json({
              success: false,
              message: "Apartment Not Found",
            });
      }
      if (apart.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          message: "You can only delete your own listings",
        });
      }
        const imageUrls = apart.imageUrls;
        console.log(imageUrls)
        for (const imageUrl of imageUrls) {
          // Delete each image from Cloudinary
         
          const deletionResponse = await cloudinary.v2.uploader.destroy(imageUrl.public_id);
          //console.log(deletionResponse); // Display the response from Cloudinary
        }
        //console.log(apart);
        
       
          await apart.deleteOne();
        res.status(200).json({
            success: true,
            message:"Apartment Deleted",
           
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}
exports.UpdateApartment=async(req,res)=>{
    try {
        const apart=await Apartment.findById(req.params.id);
        if(!apart){
            return res.status(404).json({
                success: true,
                message: "Apartment Not Found",
              });
        }
        if (apart.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
              success: false,
              message: "You can only update your own listings",
            });
          }
          const imageUrls = apart.imageUrls;
        
        // for (const imageUrl of imageUrls) {
        //   // Delete each image from Cloudinary
         
        //   const deletionResponse = await cloudinary.v2.uploader.destroy(imageUrl.public_id);
        //   console.log(deletionResponse); // Display the response from Cloudinary
        // }
          const updatedListing = await Apartment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
          );
          res.status(200).json(updatedListing);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}
exports.Apartment=async (req,res)=>{
  try {
    const apartmentID=req.params.id;
    const apartments = await Apartment.findById(apartmentID).populate("owner")
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
exports.getUsersApartment=async (req,res)=>{
  try {
    const userID=req.user._id;
    const apartments = await Apartment.find({ owner: userID });
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
exports.getAllApartment=async (req,res)=>{
  try {
    
    const apartments = await Apartment.find({});
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
exports.getApartments=async (req,res)=>{
  try {
    const limit=parseInt(req.query.limit)||9;
    const startIndex=parseInt(req.query.startIndex)||0;
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }
   
    let parking = req.query.parking;
    
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }
    let available = req.query.available;

    if (available === undefined || available === 'false') {
      available = { $in: [false, true] };
    }
    
    let bedrooms = req.query.bedrooms;

    if (bedrooms === undefined || bedrooms === 'any') {
      bedrooms = { $exists: true };
    }
    else {
      // If bathrooms is specified, parse it to an integer and include it in the query
      bedrooms = parseInt(bedrooms);
    }
    let bathrooms = req.query.bathrooms;

    if (bathrooms === undefined || bathrooms === 'any') {
      bathrooms = { $exists: true };
    }
    else {
      // If bathrooms is specified, parse it to an integer and include it in the query
      bathrooms = parseInt(bathrooms);
    }
    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAT';

    const order = req.query.order || 'desc';

    const listings = await Apartment.find({
      name: { $regex: searchTerm, $options: 'i' },
       furnished,
      parking,
     available,
       bedrooms,
       bathrooms
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

      res.status(200).json({
        success: true,
        message:"Apartments are",
       listings
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
