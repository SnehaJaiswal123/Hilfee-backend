const mongoose=require('../db/mongoose')
const bcrypt=require('bcrypt')

const userScehma=mongoose.Schema({
    email:{
       type:String,
       unique:true
    },
    password:{
        type:String
    },
    cpassword:{
        type:String
    }
})

userScehma.virtual('roles',{
    ref:"Jobrole",
    localField:'_id',
    foreignField:'owner'
})
userScehma.methods.matchPassword=async function (enteredPass){
    return bcrypt.compare(enteredPass,this.password)
}

userScehma.pre('save',async function(next){
    if(this.isModified('password')){
        if(this.password!=this.cpassword){
           throw Error("password aren't same")
        }
        this.password=await bcrypt.hash(this.password,8)
        console.log("password hashed");
    }
    next()
})

const User=mongoose.model('User',userScehma)

module.exports=User