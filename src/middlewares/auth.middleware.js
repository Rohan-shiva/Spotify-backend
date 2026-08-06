const jwt=require('jsonwebtoken');


//ye middleware hai isme 3 chize jaegi hi jaegi req,res,next
async function authArtist(req,res,next){
  const token=req.cookies.token;

  if(!token){
    return res.status(401).json({message:"Unauthorized"})
  }

  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(decoded.role!="artist"){
      return res.status(403).json({message:"You don't have acccess "})
    }

    //ye hmne new property create kri
    req.user=decoded;

    next();
    
  }catch(err){
    console.log(err);
    return res.status(401).json({message:"Unauthorized"});
  }
}


async function authUser(req,res,next){
  const token=req.cookies.token;

  if(!token){
    return res.status(401).json({message:"Unauthorized"})
  }

  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(decoded.role!="user"){
      return res.status(403).json({message:"You don't have acccess "})
    }

    //ye hmne new property create kri
    req.user=decoded;

    next();
    
  }catch(err){
    console.log(err);
    return res.status(401).json({message:"Unauthorized"});
  }
}

module.exports={authArtist,authUser};