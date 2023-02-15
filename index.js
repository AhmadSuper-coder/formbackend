const express=require("express")
const mongoose=require("mongoose")
const app=express();
const doenv=require("dotenv").config();
const cors=require("cors");
const User=require("./Model/userSchema");
const nodemailer = require('nodemailer');



// middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.send("Hellow formthe backend")
})

app.post("/user",async (req,res)=>{
    try{
        const {name,dob,email,phone}=req.body;
        const newdob=dob.substring(0,10);
        const userData=await User({
            name,
            dob,
            email,
            phone
        })
        
        const result=await userData.save({ runValidators: true }, function(error) {
            if (error) {
              res.status(200).send("invalid");
            } else {
              res.status(201).send("created");
            //   console.log("created");

              const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port:465,
                secure:true,
                auth: {
                  user: 'ahmadraza0019121@gmail.com',
                  pass: process.env.MAIL_PASS
                }
              });
              
              const mailOptions = {
                from: 'stackFusion',
                to: email,
                subject: 'Form Submission Confirmation',
                text: `Dear [${name}],
                    Thank you for submitting the form on our website. We have received your information and will review it as soon as possible. If we need any further information from you, we will contact you by email or phone.

                    We appreciate your interest in our services and look forward to working with you.

                Best regards,

                [AHMAD RAJA]`
                };

              
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  
                } else {
                  
                }
              });
              

            }
          });


          

    }catch(e){
        res.send("something unexpected");
    }
})








app.get("/alldata",async (req,res)=>{
    try{
        const alldata=await User.find({});
        res.send(alldata)
    }catch(e){
        res.send("Error");
    }
})


const port=process.env.PORT || 5000;

// connect to mongodb 
mongoose.set("strictQuery",false);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(port,()=>{
        console.log(`backend running on ${port}`);
    })
})
.catch((err)=>{
    console.log(err);
})









