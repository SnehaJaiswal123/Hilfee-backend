const express=require('express')
const router=express.Router();
const multer=require('multer')
const { createJob,getUserRole,recording,getjobbyid} = require('../Controller/jobs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createjob',createJob)
router.post('/recording',recording)
router.get('/getjobbyid',getjobbyid)
router.get('/getuserrole',getUserRole)

module.exports=router