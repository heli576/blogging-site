const express=require("express");
const router=express.Router();
const {requireSignin,isAuth,userById}=require("../controllers/user");
const {createBlog,blogById,updateBlog,deleteBlog,getAllBlogs,likeBlog,getBlog}=require("../controllers/blog");

router.post("/blog/:userId",requireSignin,isAuth,createBlog);
router.get("/blog/:blogId",getBlog);
router.put("/blog/:blogId/:userId",requireSignin,isAuth,updateBlog);
router.delete("/blog/:blogId/:userId",requireSignin,isAuth,deleteBlog);
router.get("/blog",getAllBlogs);
router.put("/likeblog/:blogId/:userId",requireSignin,isAuth,likeBlog);

router.param("userId",userById);
router.param("blogId",blogById);

module.exports=router;
