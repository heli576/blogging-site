const express=require("express");
const router=express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin
}=require("../controllers/user");
const {userSignupValidator}=require("../validator");

router.post("/signup",userSignupValidator,signup);
router.post("/login",signin);
router.get("/signout",signout);

module.exports=router;
