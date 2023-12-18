const mongoose=require('mongoose')
require('dotenv').config();

const mongo=async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("db connected"))
    .catch((e)=>console.log(e))
}
mongo()

module.exports=mongoose
