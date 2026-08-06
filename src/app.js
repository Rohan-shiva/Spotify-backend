const express=require('express');
const cookieParser=require('cookie-parser');
const connectDB = require('./DB/db');
const authRoutes=require('../src/routers/auth.routes');
const musicRoutes=require('../src/routers/music.routes');

const app=express();
connectDB();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/music',musicRoutes);


module.exports=app;