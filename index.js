// configuring the evn variables:
require('dotenv').config();

const connectToMongoDB=require('./connectToMongodb');
connectToMongoDB();

const express=require('express');
const app=express();
const port=process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users',require("./Routes/UserRoutes"));
app.use('api/notes',require('./Routes/UserRoutes'));

app.listen(port,()=>{
    console.log("server running at port :",port);
})