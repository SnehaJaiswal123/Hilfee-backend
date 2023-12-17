const express=require('express')
const router=express.Router();
const multer=require('multer')
const { createJob,getUserRole,recording} = require('../Controller/jobs');

router.post('/createjob',createJob)

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/recording', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'video' },
      (error, result) => {
        if (error) throw error;
        res.json({ secure_url: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Error uploading to Cloudinary' });
  }

});

router.get('/getuserrole',getUserRole)

module.exports=router