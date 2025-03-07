const sendEmail = require('./mail')

const  generatePDF =require('./pdfController')


const User = require("../model/user")
const Form = require("../model/form")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { response } = require('express')

const submitHealthForm = async (req, res) => {
    try {
      const {
        name, email, mobile, age, gender, inspectorName, bloodPressure, heartRate,
        temperature, respiratoryRate, bloodSugar, weight, height, allergies,
        chronicConditions, medications, smoking, alcoholConsumption, notes
      } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ name, email, mobile, age, gender });
        await user.save();
      }

      const form = new Form({
        userId: user._id,
        inspectorName,
        bloodPressure,
        heartRate,
        temperature,
        respiratoryRate,
        bloodSugar,
        weight,
        height,
        allergies,
        chronicConditions,
        medications,
        smoking,
        alcoholConsumption,
        notes
      });

      await form.save();

      const pdfBuffer = await generatePDF(form,user); // Get PDF as buffer

      await sendEmail({
        to: user.email,
        subject: 'Your Health Inspection Report',
        text: 'Please find attached your health inspection report.',
        attachments: [
          {
            filename: `Health_Report_${form._id}.pdf`,
            content: pdfBuffer, // Attach PDF buffer
            encoding: 'base64',
          },
        ],
      });

      res.status(201).json({ message: 'Form submitted successfully, and PDF sent to email.', form });
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: error.message });
    }
  };

 const login = async(req, res)=>{
    try {




        const {email, password} = req.body

        const user = await User.findOne({email:email})
        if(!user || user.userType != 'admin'){
            return res.status(403).json({message:"user not found"})
        }





        if(password != "admin@123"){
            return res.status(403).json({message:"invalid credentials"})
        }

        const token = jwt.sign({id:user._id, email:user.email, userType:user.userType}, process.env.JWT_SECRET,{expiresIn:"7d"})

        return res.status(200).json({token:token})








    } catch (error) {
        console.log(error)
    }

}

const getUser = async(req, res) =>{
    try {

        const userType = req.user.userType


        if(userType !="admin"){
            return res.status(403).json({message:"unauthorized"})

        }

        const users = await User.find({userType:"user"})
        

       return  res.status(200).json({message:"success", users})

    } catch (error) {
        console.log(error)
    }
}

module.exports = { login, submitHealthForm, getUser};

