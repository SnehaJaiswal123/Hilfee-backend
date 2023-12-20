const Job = require("../Model/jobs");
const User = require("../Model/user");
const multer=require('multer')

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dw9yboxwi",
  api_key: "955522367718116",
  api_secret: "FhTmZ4hFU4IxGm5asF8AQhxV4xQ",
});

const createJob = async (req, res) => {
  try {
    console.log(req.body);
    const newJob = await Job.create({status:false,...req.body});
    res.send({ newJob });
    console.log({ newJob });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const getUserRole = async (req, res) => {
  try {
    const owner = req.query.owner;
    console.log(owner);
    const user = await User.findOne({ _id: owner });
    await user.populate("roles");
    res.json(user.roles);
    console.log(user.roles);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
};



const recording = async (req, res) => {
  console.log("recording api called");
  const videoFile = req.files.video;
  const id=req.body.id
  try {
    const result = await cloudinary.uploader.upload(videoFile.tempFilePath, { resource_type: 'video' });
    const updatedJob=await Job.findByIdAndUpdate(id, {videoUrl:result.secure_url, status:true }); 
    console.log({updatedJob});
    res.json(result.secure_url)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getjobbyid = async (req, res) => {
  console.log("recording by id api called");
  const id = req.query.id
  console.log(id);
  try {
    const job=await Job.findById(id); 
    console.log(job);
    res.json(job)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createJob, getUserRole, recording,getjobbyid };
