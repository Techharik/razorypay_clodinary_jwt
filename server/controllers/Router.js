import express from 'express'
const router = express.Router();
import usermodal from "../modal/modal.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import auth from '../middlewares/auth.js';
import {v2 as cloudinary} from 'cloudinary';
import Razorpay from 'razorpay';

cloudinary.config({ 
  cloud_name: 'dhvfoxf4a', 
  api_key: '476319513618693', 
  api_secret: '.........' 
});

router.get('/register',(req,res)=>{
    res.status(200).json('Register Your Credientials')


})
router.post('/register',async (req,res)=>{
   
    const {email, password,username} = req.body;

    if(!(email && password && username)){
        res.status(401).json('All fields are required')
    }

    const hash = await bcrypt.hash(password,10);
   

    const exitedUser = await usermodal.findOne({email})
        if(exitedUser){
             res.status(401).json('User Already Registered')
       }

    const user = await usermodal.create({
        email:email,
        password:hash,
        username:username
    })

     const token = jwt.sign({
        user_id:user._id,
        email,
        username
     },'Thisismykey',{expiresIn:'2h'}
     )
     
     user.password = undefined;

    // res.status(200).json({
    //     user,
    //     token,
    //     success:true
    // })
    const options = new Date( Date.now() + 24*60*60*1000)
    

    res.status(200).cookie('token',token,options).json({
        success: true,
        token,
        user,
      });


})


router.get('/dashboard',(req,res)=>{
    res.render('index')
})

router.post('/dashboard', async (req,res)=>{
    console.log(req.files)
    console.log(req.body)
    try{
        const sampleFile = req.files.sampleFile;
     
        const result = await cloudinary.uploader
        .upload(sampleFile.tempFilePath,{
            folder:'buyers'
        })
        
     
        res.json(result.secure_url)
    }catch(e){
        console.log(e)
    }
    

})

router.get('/pay',(req,res)=>{
    res.render('pay')
})

router.post('/pay',async (req,res)=>{
 const amount = req.body.amount

const instance = new Razorpay({ key_id: 'rzp_test_BLCxTdA1kFfVY8', key_secret: '...................' })

const myOrders = await instance.orders.create({
  amount: amount *100,
  currency: "INR",
  receipt: "receipt#1",
 
})

res.status(200).json(myOrders)

})



export default router;


