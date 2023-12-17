const expressAsyncHandler=require('express-async-handler')
const User=require('../model/user')
const signup=expressAsyncHandler(async(req,res)=>{
  const {email,password,cpassword}=req.body;
    try{
    if(email==''||password==''||cpassword==''){
        console.log("Enter all the fields")
        return res.status(204).send("Enter all the fields")
    }
  
    if(password!==cpassword){
      return res.status(403).send(`passwords don't match`)
    }
    const userExist=await User.findOne({email})
    if(userExist){
        console.log("User already exist");
        return res.status(409).send("User already exist")
    }

    const user=await User.create(req.body)
    console.log({user});
    res.send({user})
    }
    catch(e){
       console.log(e);
       res.status(400).send(e)
    }
})

const login=expressAsyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    if(email==''||password==''){
      return res.status(204).send("Enter all the fields")
    }
    console.log(email,password);
    const user=await User.findOne({email})
    console.log({user});
    if(user){
      const passMatched= await user.matchPassword(password)
      if(passMatched){
        res.send({user})
      }
      else{
        throw Error("Invalid Password") 
      }
       
    }
    else{
        throw Error("Invalid email")
    }

    
})


module.exports={signup,login}
