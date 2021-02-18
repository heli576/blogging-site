import React,{Fragment,useState,useEffect,useCallback} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MyButton from "../../util/MyButton";
import {isAuthenticated} from "../../util/userApi";
import {postBlog} from "../../util/blogApi";


//MUI core
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
...theme.spreadThis,
submitButton:{
  position:"relative",
  float:"right",
  marginTop:10
},
progressSpinner:{
  position:"absolute"
},
closeButton:{

  [theme.breakpoints.down('xs')]: {
    position:"absolute",
    left:"80%",
    marginTop:4
  },
  [theme.breakpoints.up('sm')]: {
    position:"absolute",
    left:"90%",
    marginTop:4
  },
[theme.breakpoints.up('md')]: {
  position:"absolute",
  left:"90%",
  marginTop:4
  }
}
}));


const PostBlog=()=>{
  const classes=useStyles();
  const [open,setOpen]=useState(false);
  const [values,setValues]=useState({
    title:"",
    description:""
  });
  const [error,setError]=useState("");
  const {user,token}=isAuthenticated();

  const handleOpen=()=>{
  setOpen(true);
  };
  const handleClose=()=>{
    setOpen(false)
  };

const {title,description}=values;

  const handleChange=(name)=>(event)=>{
    const value=event.target.value;
   setValues({...values,[name]:value});
  };
  const handleSubmit=(event)=>{
    event.preventDefault();
    setValues({...values});
  postBlog(user._id,token,{title,description})
  .then((data)=>{
    if(data.error)
    setError(data.error);
    else{
      setValues({title:"",description:""})
      setError("");
      handleClose();
    }
  })
  };

return(
      <Fragment>
      <MyButton onClick={handleOpen} tip="Post a blog!">
<AddIcon/>
      </MyButton>
      <Dialog
      open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
<CloseIcon/>
      </MyButton>
      <DialogTitle>
      Post a New Blog
      </DialogTitle>
      <DialogContent>
      <form onSubmit={handleSubmit}>
        <TextField
        name="title"
        type="text"
        label="Title"
        placeholder="Blog title"
        className={classes.textField}
        value={title}
        onChange={handleChange("title")}
        fullWidth
        />
      <TextField
      name="description"
      type="text"
      label="Description"
      multiline
      rows="4"
      placeholder="Blog description"
      className={classes.textField}
      value={description}
      onChange={handleChange("description")}
      fullWidth
      />
      {error && (
        <Typography variant="body2" className={classes.customError}>
      {error}
        </Typography>
      )}
  <Button type="submit" variant="contained" color="secondary" className={classes.submitButton}>
Post
</Button>
</form>
      </DialogContent>

      </Dialog>
      </Fragment>
    )
  }



 export default PostBlog;
