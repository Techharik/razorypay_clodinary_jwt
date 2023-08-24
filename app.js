import express from 'express';
import db from './server/db/config.js';
import router from './server/controllers/Router.js'
import cookieParser from 'cookie-parser';
import  fileUpload from 'express-fileupload';

const app = express();


app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}));


db()



app.use('/',router)


app.get('/',(req,res)=>{
  res.send('Hello world');
})






app.get('*',(req,res)=>{
    res.send('Page Not Found')
})


app.listen(4000, ()=>{
    console.log('severver Started Successfully');
})