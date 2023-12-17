const express=require('express')
const router=express.Router()
const multer=require('multer')
const {createProfile,getProfile}=require('../Controller/profile')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + '-' + file.originalname)
    }
})

const upload=multer({
    storage:storage
})

router.post('/createprofile',createProfile)
router.get('/getprofile',getProfile)

module.exports=router