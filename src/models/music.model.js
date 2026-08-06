const mongoose=require('mongoose');

const musicSchema=new mongoose.Schema({
  uri:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  artist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user", //iska mtlb arrist ke andr "user" collection ke andr jo id h vo jaegi
    required:true
  }
})

const musicModel=mongoose.model("music",musicSchema);

module.exports=musicModel;