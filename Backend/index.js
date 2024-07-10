const express=require('express');
const mongoose=require("mongoose");
const cookieParser=require('cookie-parser');
const connectDB=require('./config/dbConn');
const bodyParser=require('body-parser');
const cors=require('cors');
const verify=require("./middleware/verifyjwt");




const app=express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
        
    }
));

// Parse application/json



app.use(express.json());
app.use(cookieParser());
require('dotenv').config()


connectDB();

app.use('/signin',require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/logout',require('./routes/logout'));
app.use('/newpost',require('./routes/newpost'));
app.use('/refresh',require('./routes/refresh'));
app.use('/image',require('./routes/image'));
app.use('/allposts',require("./routes/allposts"));
app.use("/getpost",require("./routes/getpost"));
app.use('/getimage',require("./routes/getimage"));

app.use('/getuser',require('./routes/currentuser'));
app.use('/deletepost',require("./routes/deletepost"));
app.use('/deletefile',require('./routes/deletefile'));
app.use('/update',require("./routes/updatepost"));
app.use('/upload',require("./routes/upload"));
app.use(verify);
app.use("/myposts",require("./routes/myposts"));


mongoose.connection.once('open',()=>{
    console.log("mongodb is connected");
    app.listen(3500,()=>{console.log("Server is listening at port 3500")})

})