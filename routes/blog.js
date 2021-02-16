const express=require("express");
const router=express.Router();
const {requireSignin,isAuth,userById}=require("../controllers/user");
const {createBlog,blogById,updateBlog}=require("../controllers/blog");


router.post("/blog/:userId",requireSignin,isAuth,createBlog);
router.put("/blog/:blogId/:userId",requireSignin,isAuth,updateBlog);

router.param("userId",userById);
router.param("blogId",blogById);



module.exports=router;
