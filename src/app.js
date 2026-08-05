const express=require('express');
const cookieParser=require('cookie-parser');
const connectDB = require('./DB/db');

const app=express();
connectDB();


app.use(express.json());
app.use(cookieParser());

module.exports=app;