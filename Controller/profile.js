const Profile=require('../model/profile')
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY , 
  api_secret:process.env.API_SECRET 
});

const createProfile=async(req,res)=>{
     const {name,dob,owner}=req.body;
    try{
      const file = req.files.file;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      const img=result.url
      const profileExist=await Profile.findOne({owner})
      if(profileExist){
        console.log('Profile updated');
        await Profile.findOneAndUpdate({owner},{img,dob,name,owner})
        .then((rest)=>res.json(rest))
        .catch(((e)=>res.send(e)))
      }
      else{
        console.log(name,img,dob,owner);
        console.log("profile created");
        const nprofile=await Profile.create({img,dob,name,owner})
        .then((result)=>console.log(result))
        .catch(((e)=>res.send(e)))
      }
    }
    catch(e){
           res.send(e)
           console.log(e);
    }
}

const getProfile=async(req,res)=>{
  const owner=req.query.owner
    console.log(req.query.owner);
    try{
        const userProfileExist=await Profile.findOne({owner})
        if(userProfileExist){
          console.log(userProfileExist);
          res.json(userProfileExist)
        }
        else{
          console.log("no user");
          res.json({msg:"no user"})
        }
    }
    catch{

    }
}

module.exports={createProfile,getProfile}