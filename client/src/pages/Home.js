import React,{useState,useEffect,Fragment} from "react";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Profile from "../components/profile/Profile";
import {getAllBlogs,postBlog,deleteBlog,updateBlog,getBlog,likeBlog} from "../util/blogApi";
import { makeStyles } from '@material-ui/core/styles';
import MyButton from "../util/MyButton";
import {isAuthenticated,getUserData} from "../util/userApi";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DialogActions from "@material-ui/core/DialogActions";
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
//pb
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
},
card:{

   [theme.breakpoints.down('xs')]: {
     position:"relative",
     display:"flex",
     marginTop: 20,
marginLeft:10,
marginRight:10,


   },
   [theme.breakpoints.up('sm')]: {
     position:"relative",
     display:"flex",
      marginBottom: 20,
      marginRight:60,
      marginLeft:60
   },
 [theme.breakpoints.up('md')]: {
   position:"relative",
   display:"flex",
    marginBottom: 20,
    marginRight:100
   }
},

content:{
  [theme.breakpoints.down('sm')]: {
    padding:25,
  objectFit:"cover",

},
[theme.breakpoints.up('md')]: {
 padding:25,
objectFit:"cover",
}
},
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


const Home=()=>{
  dayjs.extend(relativeTime);
  const [blogs,setBlogs]=useState([]);
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

  const handleUpdateOpen=(blog)=>{
    setValues({title:blog.title,description:blog.description})
    setOpen(true);
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
      getBlogs();
    }
  })
  };
const getBlogs=()=>{
  getAllBlogs()
  .then(data=>{
if(data.error)
console.log(data.error)
else {
setBlogs(data);
}
})
}

const deleteblog=(blogId)=>{
deleteBlog(user._id,blogId,token).then(data=>{
  if(data.error)
  console.log(error);
  else {
    getBlogs();
  }
})

};

const handleEdit=(blogId)=>(event)=>{
  event.preventDefault();
setValues({...values});
updateBlog(blogId,user._id,token,values).then(data=>{
  setValues({title:"",description:""});
  handleClose();
  getBlogs();
}
)
}

const likeTheBlog=(blogId)=>{
  likeBlog(user._id,blogId,token)
  .then(data=>{
    getBlogs()
  })
}

const postComponent=()=>{

return(
      <Fragment>
      <Button onClick={handleOpen} color="secondary" variant="contained"  style={{marginLeft:260,marginTop:-130}}>
      Add a Blog
      </Button>
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

const blogComponent=(blog)=>{

  const deleteButton=isAuthenticated() && blog.user==user._id?(  <Fragment>
    <MyButton tip="Delete Blog" onClick={()=>deleteblog(blog._id)}>
<DeleteOutline color="secondary"/>
    </MyButton>
  </Fragment>):null;

    const updateButton=isAuthenticated() && blog.user==user._id?(
      <Fragment>
       <MyButton tip="Update Blog" onClick={()=>handleUpdateOpen(blog)} btnClassName={classes.deleteButton}>
   <EditIcon color="secondary"/>
       </MyButton>
       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
       <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
   <CloseIcon/>
       </MyButton>
       <DialogTitle>
       Edit blog
       </DialogTitle>
       <DialogContent>
       <form onSubmit={handleEdit(blog._id)}>
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
   Edit
   </Button>
   </form>
       </DialogContent>
   </Dialog>
       </Fragment>

    ):null;
    const likeButton=!isAuthenticated()?(
  <Link to ="/login">
        <MyButton tip="Like">
        <ThumbUpAltIcon color="primary"/>
          </MyButton>
          </Link>

      ):(
          <MyButton tip="Like" onClick={()=>likeTheBlog(blog._id)}>
          <ThumbUpAltIcon color="primary"/>
          </MyButton>
        );
  return(
      <Card className={classes.card}>
      <CardContent className={classes.content}>
         <Typography variant="h6" color="secondary" component={Link} to={`/users/${blog.user}`}>{blog.title}</Typography>
      <Typography variant="body2" color="textSecondary">{dayjs(blog.createdAt).fromNow()}</Typography>
  <Typography variant="body1">{blog.description}</Typography>
   {deleteButton}
   {updateButton}
  <span>{likeButton} {blog.like}</span> 
      </CardContent>
      </Card>
      )
    }

useEffect(()=>{
  getBlogs();
},[])

  return(
    <div>
      <Navbar/>
        <Grid container spacing={16} style={{marginTop:100}}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
      <Profile/>
    {isAuthenticated()?postComponent():null}
      </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
        {blogs.map((b)=>blogComponent(b))}
        </Grid>


        </Grid>
    </div>
  )
}

export default Home;
