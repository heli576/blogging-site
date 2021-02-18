const express=require("express");
const router=express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
  getUser,
  getUserBlogs
}=require("../controllers/user");
const {userSignupValidator}=require("../validator");

router.post("/signup",userSignupValidator,signup);
router.post("/login",signin);
router.get("/signout",signout);
router.get("/user/:userId",getUser);
router.get("/blog/:userId",getUserBlogs);

module.exports=router;
