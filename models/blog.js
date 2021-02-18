const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const blogSchema=new mongoose.Schema({
  title:{
    type:String,
    trim:true,
    required:true,
    maxlength:2000,

  },
  description:{
    type:String,
    required:true,
    maxlength:1000000000000,
    trim:true
},
like:{
    type:Number,
    default:0
  },
  user: { type: ObjectId, ref: "User" }
},{timestamps:true}
);


module.exports=mongoose.model("Blog",blogSchema);
