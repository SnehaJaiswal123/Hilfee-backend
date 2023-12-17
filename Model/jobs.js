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
    }
})

const jobRole=mongoose.model('Jobrole',jobSchema)

module.exports=jobRole