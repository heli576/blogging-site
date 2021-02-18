import React,{Fragment,useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MyButton from "../../util/MyButton";

//MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import {deleteBlog} from "../../util/blogApi";
import {isAuthenticated} from "../../util/userApi";

const useStyles = makeStyles((theme) => ({
...theme.spreadThis,
deleteButton:{
  [theme.breakpoints.down('xs')]: {
    position:"absolute",
    left:"85%",
    top:"10%"
  },
  [theme.breakpoints.up('md')]: {
    position:"absolute",
    left:"90%",
    top:"10%"
  },

}
}));

const DeleteBlog=(props)=>{
  const classes=useStyles();
  const {user,token}=isAuthenticated();
  const [open,setOpen]=useState(false);

  const handleOpen=()=>{
    setOpen(true);
  };
  const handleClose=()=>{
  setOpen(false);
  };
  const deleteblog=(e)=>{
  deleteBlog(user._id,props.blogId,token);
  setOpen(false);
  };

  useEffect(()=>{
  const blogId=props.blogId;
  deleteBlog(blogId);
},[props]);

    return(
      <Fragment>
      <MyButton tip="Delete Blog" onClick={handleOpen} btnClassName={classes.deleteButton}>
<DeleteOutline color="secondary"/>
      </MyButton>
      <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm">
      <DialogTitle>
      Are you sure you want to delete this blog?
      </DialogTitle>
      <DialogActions>
      <Button onClick={handleClose} color="primary">
      Cancel
      </Button>
      <Button onClick={deleteblog} color="secondary">
      Delete
      </Button>
      </DialogActions>
      </Dialog>
      </Fragment>
    );
  }


export default DeleteBlog;
