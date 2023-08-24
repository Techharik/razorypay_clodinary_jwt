import { Schema , model } from "mongoose";




const userSchema = new Schema({
    email:String,
    password:String,
    username:String
})


const usermodal = new model('Buyer',userSchema);

export default usermodal;

