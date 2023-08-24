import {connect } from 'mongoose';

async function db(){
    try{
        const conn = await connect('mongodb://127.0.0.1:27017/razorpay')
        console.log('Db connected successfully')
    }catch(e){
        console.log('Failed to connect to db');
    }
    
}

export default db;



