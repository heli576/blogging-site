const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const expressValidator=require("express-validator");
const cors=require("cors");
const {MONGODB_URI}=require("./config/keys");

const app=express();

mongoose.connect(MONGODB_URI,
  {useNewUrlParser:true,
    useUnifiedTopology: true ,
  useCreateIndex:true,
  useFindAndModify: false
}
)
.then(()=>console.log("DB Connected"));

// Routes
const userRoutes=require("./routes/user");
const blogRoutes=require("./routes/blog");

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api",userRoutes);
app.use("/api",blogRoutes);

const port=process.env.PORT||8000;

app.listen(port,()=>{
  console.log(`Server is running on port ${port} `);
});
