const mongoose=require('../db/mongoose')

const jobSchema=mongoose.Schema({
    jobRole:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    videoUrl:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    }
})

const jobRole=mongoose.model('Jobrole',jobSchema)

module.exports=jobRole