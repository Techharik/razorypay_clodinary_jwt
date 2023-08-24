import express from 'express'
const router = express.Router();
import usermodal from "../modal/modal.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import auth from '../middlewares/auth.js';

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

router.post('/dashboard',(req,res)=>{
    res.render('index')
})

router.get('/pay',(req,res)=>{
    res.render('pay.js')
})



export default router;


