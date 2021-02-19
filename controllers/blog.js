const Blog=require("../models/blog");
const {errorHandler}=require("../helpers/dbErrorHandler");


exports.blogById=(req,res,next,id)=>{
  Blog.findById(id)
  .exec((err,blog)=>{
    if(err||!blog){
      return res.status(400).json({
        error:"Blog does'nt exists."
      });
    }
    req.blog=blog;
    next();
  });
};

exports.getBlog=(req,res)=>{
  Blog.findById(req.params.blogId)
  .exec((err,blog)=>{
    if(err||!blog){
      return res.status(400).json({
        error:"Blog does'nt exists."
      });
    }
    res.json(blog);
  });
};



exports.createBlog=(req,res)=>{
//console.log(req.profile);
const user=req.profile;
const blog=new Blog({
  title:req.body.title,
  description:req.body.description,
  user
})
blog.save((error,data)=>{
  if(error){
    return res.status(400).json({
      error:"Title and description are required"
    })
  }
  res.json(data);
})
};

exports.updateBlog=(req,res)=>{
  if(req.blog.user!=req.params.userId)
  return res.status(400).json({error:"Access denied"})
  Blog
    .findOneAndUpdate({_id:req.params.blogId}, req.body)
    .exec(function(err, blog){
      if(err) {return res.status(500).json({err: err.message});}
      res.status(200).json({message: 'Successfully updated'})
    });
};

exports.deleteBlog=(req,res)=>{
  let blog=req.blog;
  if(blog.user!=req.params.userId)
  return res.status(400).json({error:"Access denied"});
  blog.remove((err,deletedBlog)=>{
    if(err){
      return res.status(400).json({error:errorHandler(err)});
    }
    res.json({message:"Blog deleted successfully"});
  });
};



exports.getAllBlogs=(req,res)=>{
  Blog.find()
.sort('-createdAt')
.exec((err,blogs)=>{
  if(err){
    return res.status(400).json({
      error:errorHandler(error)
    })
  }
  res.json(blogs);
})
}

exports.likeBlog=(req,res)=>{
  let blog=req.blog;
  blog.like=blog.like+1;
  Blog.update({_id:req.params.blogId},{$set:{like:blog.like}},(err,blog)=>{
  if(err){
    return res.status(400).json({
      error:errorHandler(err)
    });
  }
  res.status(200).json("liked successfully");
})

}
