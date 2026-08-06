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

  async function getAllMusic(req,res){
    const musics=await musicModel
    .find()
    .skip(1) // ek song skipkr dena
    .limit(2); // ek time p 2 song aa skte h
    // const musics=await musicModel.find().populate("artist"); //populate artist ki saari detail bhi de dega

    res.status(200).json({
      message:"Musics fetched successfully",
      musics:musics
    })
  }


  //for e.g., 10 album h spotify p, each album contain 50 songs so at one time 500 songs will load on screen that can slow down process
  //to optimize it we use select
  async function getAllAlbums(req,res){
    const albums=await albumModel.find().select("title artist").populate("artist","username email"); //populate artist ki saari detail bhi de dega

    res.status(200).json({
      message:"Albums fetched successfully",
      albums:albums
    })
  }


  async function getAlbumById(req,res){
    const albumId=req.params.albumId;

    const album=await albumModel.findById(albumId).populate("artist","username email");

    return res.status(200).json({
      message:"Albums created successfully",
      album:album
    })
  }
module.exports={createMusic,createAlbum,getAllMusic,getAllAlbums,getAlbumById};