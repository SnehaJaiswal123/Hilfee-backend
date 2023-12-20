const express= require('express')
const app=express()
const cors=require('cors')
const fileUpload = require('express-fileupload')
const bodyParser=require('body-parser')

const userRouter=require('./Routes/user')
const jobRouter=require('./Routes/jobs')
const profileRouter=require('./Routes/profile')

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin:'*'
}))
app.use(fileUpload({
    useTempFiles:true
}));
app.use(userRouter)
app.use(jobRouter)
app.use(profileRouter)


app.listen('4000',console.log("app is running on 4000"))