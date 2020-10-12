const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const AddressSchema = new mongoose.Schema({
    user :{
        type:ObjectId,
        ref : "User"
    },
    name :{
        type:String,
        required:true,
        trim:true
    },
    phone :{
        type:Number,
        minlength:10,
        trim:true,
        required:true,
    },
    pincode :{
        type:Number,
        minlength:6,
        required:true,
        trim:true
    },
    area :{
        type:String,
        required:true,
        trim:true
    }
})

module.exports = mongoose.model("Address",AddressSchema)