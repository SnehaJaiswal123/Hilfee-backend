const mongoose=require('../db/mongoose')

const profileSchema=mongoose.Schema({
    name:{
        type:String
    },
    img: {
        type:String
    },
    dob:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Profile=mongoose.model('Profile',profileSchema)

module.exports=Profile