const mongoose=require("mongoose");
const apartmentSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    imageUrls: {
        type: Array,
        //required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    createdAT: {
        type: Date,
        default: Date.now(),
      }

})
module.exports=mongoose.model("Apartments",apartmentSchema);