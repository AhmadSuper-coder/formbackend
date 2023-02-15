const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    dob:{
        type:Date,
        default:Date.now
    },

    email:{
        type:String,
        required:true
    },

    phone: {
        type: String,
        match: /^\d{10}$/
    }
}
)

 
const userModel=mongoose.model('User',userSchema);


module.exports=userModel;
