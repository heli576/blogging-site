const User=require("../models/user");
const jwt=require("jsonwebtoken");
const expressJwt=require("express-jwt");
const {errorHandler}=require("../helpers/dbErrorHandler");
const {JWT_SECRET}=require("../config/keys");


exports.signup = (req, res) => {
  const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({error: 'Email is taken'});
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        const token=jwt.sign({_id:user._id},JWT_SECRET);
        res.cookie("t",token,{expire:new Date()+9999})
        const {_id,name,email}=user;
        res.json({token,user:{_id,email,name}})

    });
};

exports.signin=(req,res)=>{
 const {email,password}=req.body;
  User.findOne({email},(err,user)=>{
    if(err||!user){
      return res.status(400).json({error:"Email does not exist"});
    }

    if(!user.authenticate(password)){
      return res.status(401).json({error:"Email and password don't match"});
    }

    const token=jwt.sign({_id:user._id},JWT_SECRET);
    res.cookie("t",token,{expire:new Date()+9999})
    const {_id,name,email}=user;
    return res.json({token,user:{_id,email,name}})

  });
};

exports.signout=(req,res)=>{
  res.clearCookie("t")
  res.json({message:"Signout successfully"});
};

exports.requireSignin = expressJwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth=(req,res,next)=>{
let user = req.profile && req.auth && req.profile._id == req.auth._id;
if(!user){
    return res.status(403).json({error:"Access denied"});
  }
  next();
};
