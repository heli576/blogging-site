const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const blogSchema=new mongoose.Schema({
  title:{
    type:String,
    trim:true,
    required:true,
    maxlength:500,

  },
  description:{
    type:String,
    required:true,
    maxlength:50000,
},
like:{
    type:Number,
    default:0
  },
  user: { type: ObjectId, ref: "User" }
},{timestamps:true}
);


module.exports=mongoose.model("Blog",blogSchema);
