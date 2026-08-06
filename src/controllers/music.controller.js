const musicModel=require('../models/music.model');
const {uploadFile}=require('../services/storage.service');
const jwt=require('jsonwebtoken');
const albumModel=require('../models/album.model');


async function createMusic(req,res){

  //cmnt isliye kiya kyunki hmne middleware m likh diya sb
  // const token=req.cookies.token;

  // if(!token){
  //   return res.status(401).json({message:"unauthorized"});
  // }

  // try{
  //   const decoded=jwt.verify(token,process.env.JWT_SECRET);

  //   if(decoded.role!="artist"){
  //     return res.status(403).json({message:"You don't have access to create music"});
  //   }

  const {title}=req.body;

  const file=req.file;
  const result=await uploadFile(file.buffer.toString('base64'));


  const music=await musicModel.create({
    uri:result.url,
    title,
    artist:req.user.id
  })

  res.status(201).json({
    message:"Music created successfully",
    music:{
      id:music._id,
      uri:music.uri,
      title:music.title,
      artist:music.artist
    }
  })

  }
  // catch(err){
  //   console.log(err);
  //   return res.status(401).json({message:"Unauthorized"});
  // }


async function createAlbum(req,res){

  // const token=req.cookies.token;

  // if(!token){
  //   return res.status(401).json({
  //     message:"Unauthorized"
  //   })
  // }
  
  // try{
  //   const decoded=jwt.verify(token,process.env.JWT_SECRET);
  //   if(decoded.role!="artist"){
  //     return res.status(403).json({message:"You don't have access to create album"});
  //   }

    const {title,musics}=req.body;

    const album=await albumModel.create({
      title,
      musics:musics,
      artist:req.user.id
    })

    res.status(201).json({
      message:"Album created successfully",
      album:{
        id:album._id,
        title:album.title,
        artist:album.artist,
        musics:album.musics
      }
    })

  }
  // catch(err){
  //   return res.status(401).json({message:"Unauthorized:",err});
  // }



module.exports={createMusic,createAlbum};