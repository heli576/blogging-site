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
      error:errorHandler(error)
    })
  }
  res.json(data);
})
};

exports.updateBlog=(req,res)=>{
  Blog
    .findOneAndUpdate({_id:req.params.blogId}, req.body)
    .exec(function(err, blog){
      if(err) return res.status(500).json({err: err.message});
      //res.json({blog, message: 'Successfully updated'})
    });
    Blog.findById(req.params.blogId)
    .exec((err,blog)=>{
      if(err){
        console.log(err);
      }
      res.json(blog);
    })
};
