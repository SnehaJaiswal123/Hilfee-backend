const Job = require("../model/jobs");
const User = require("../model/user");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dw9yboxwi",
  api_key: "955522367718116",
  api_secret: "FhTmZ4hFU4IxGm5asF8AQhxV4xQ",
});



const createJob = async (req, res) => {
  try {
    console.log(req.body);
    const newJob = await Job.create(req.body);
    res.send({ newJob });
    console.log({ newJob });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const getUserRole = async (req, res) => {
  try {
    const owner=req.query.owner
    console.log(owner);
    const user = await User.findOne({ _id:owner });
    await user.populate("roles");
    res.json(user.roles);
    console.log(user.roles);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
};


const recording = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
      if (error) throw error;
      res.json({ secure_url: result.secure_url });
    }).end(req.file.buffer);
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Error uploading to Cloudinary' });
  }
};

module.exports = { createJob, getUserRole, recording };
