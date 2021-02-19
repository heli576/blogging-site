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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";



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
    top:"7%"
  },
  [theme.breakpoints.up('md')]: {
    position:"absolute",
    left:"90%",
    top:"7%"
  },

},
updateButton:{
  [theme.breakpoints.down('xs')]: {
    position:"absolute",
    left:"78%",
    top:"7%"
  },
  [theme.breakpoints.up('md')]: {
    position:"absolute",
    left:"85%",
    top:"7%"
  },

}
}));


const Home=()=>{
  const classes=useStyles();
  dayjs.extend(relativeTime);
  const [blogs,setBlogs]=useState([]);
  const [postDialog,setPostDialog]=useState(false);
  const [open,setOpen]=useState(false);
  const [values,setValues]=useState({
    title:"",
    description:""
  });

  const [updateblog,setUpdateBlog]=useState({});

  const [error,setError]=useState("");
  const {user,token}=isAuthenticated();

const handleOpen=()=>{
    setPostDialog(true);
  setValues({title:"",description:""})

  };
  const handleClose=()=>{
    setPostDialog(false);
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

  const handleUpdateOpen=(blog)=>{
    setOpen(true);
    setUpdateBlog(blog);
  }

  const handleUpdateChange=(name)=>(event)=>{
    const value=event.target.value;
   setUpdateBlog({...updateblog,[name]:value});
  };

const handleEdit=(blogId)=>(event)=>{
event.preventDefault();
setUpdateBlog({...updateblog});
const body={title:updateblog.title,description:updateblog.description};

updateBlog(blogId,user._id,token,body).then(data=>{
  setUpdateBlog({});
  setOpen(false);
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



const blogComponent=(blog)=>{
const deleteButton=isAuthenticated() && blog.user==user._id?(  <Fragment>
    <MyButton tip="Delete Blog" onClick={()=>deleteblog(blog._id)} btnClassName={classes.deleteButton}>
<DeleteOutline color="primary"/>
    </MyButton>
  </Fragment>):null;

    const updateButton=isAuthenticated() && blog.user==user._id?(
      <Fragment>
         <MyButton tip="Update Blog" onClick={()=>handleUpdateOpen(blog)} btnClassName={classes.updateButton}>
     <EditIcon color="secondary"/>
         </MyButton>
         <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm">
   <MyButton tip="Close" onClick={()=>setOpen(false)} tipClassName={classes.closeButton}>
<CloseIcon/>
   </MyButton>
   <DialogTitle>
   Edit blog
   </DialogTitle>
   <DialogContent>
      <form onSubmit={handleEdit(updateblog._id)}>
        <TextField
        name="title"
        type="text"
        label="Title"
        placeholder="Blog title"
        className={classes.textField}
        value={updateblog.title}
        onChange={handleUpdateChange("title")}
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
      value={updateblog.description}
      onChange={handleUpdateChange("description")}
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
        <ThumbUpAltIcon color="secondary"/>
          </MyButton>
          </Link>

      ):(
          <MyButton tip="Like" onClick={()=>likeTheBlog(blog._id)}>
          <ThumbUpAltIcon color="secondary"/>
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
<span>{likeButton}{blog.like} Likes</span>
      </CardContent>
      </Card>
      )
    }

useEffect(()=>{
  getBlogs();
},[])

  return(
    <div>
      <AppBar position="fixed" color="secondary">
       <Toolbar className="nav-container">
      {isAuthenticated()?(
        <Fragment>
       <Link to="/">
       <MyButton tip="Home">
       <HomeIcon/>
       </MyButton>
       </Link>
       <Fragment>
        <MyButton onClick={handleOpen} tip="Post a blog!">
  <AddIcon/>
        </MyButton>
     <Dialog open={postDialog} onClose={handleClose} fullWidth maxWidth="sm">
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

       </Fragment>

      ):(
        <Fragment>
       <Button color="inherit" component={Link} to="/login">Login</Button>
       <Button color="inherit" component={Link} to="/">Home</Button>
       <Button color="inherit" component={Link} to="/signup">Signup</Button>
       </Fragment>
      )}
      </Toolbar>
        </AppBar>
        <Grid container spacing={16} style={{marginTop:100}}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
      <Profile/>
     </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
        {blogs.map((b)=>blogComponent(b))}
        </Grid>


        </Grid>
    </div>
  )
}

export default Home;
