import React,{useEffect} from "react";
import MyButton from "../../util/MyButton";
import {Link} from "react-router-dom";

//icons
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import {likeBlog} from "../../util/blogApi";
import {isAuthenticated} from "../../util/userApi";

const LikeButton=(props)=>{
  const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().token;

  const likeTheBlog=(e)=>{
    likeBlog(userId,props.blogId,token)
  }
  useEffect(()=>{
  const blogId=props.blogId;
  likeTheBlog(blogId);
},[props]);

  const likeButton=!isAuthenticated()?(
<Link to ="/login">
      <MyButton tip="Like">
      <ThumbUpAltIcon color="primary"/>
        </MyButton>
        </Link>

    ):(
        <MyButton tip="Like" onClick={likeTheBlog}>
        <ThumbUpAltIcon color="primary"/>
        </MyButton>
      );
    return likeButton;
    }



export default LikeButton;
