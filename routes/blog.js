const express=require("express");
const router=express.Router();
const {requireSignin,isAuth,userById}=require("../controllers/user");
const {createBlog,blogById}=require("../controllers/blog");


router.post("/blog/:userId",requireSignin,isAuth,createBlog);

router.param("userId",userById);
router.param("blogId",blogById);



module.exports=router;
