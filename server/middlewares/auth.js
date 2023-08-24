import jwt from 'jsonwebtoken'



const auth = async (req, res, next)=>{
try{
    const token =  req.cokies.token || req.header('Authorization').replace('Bearer ','');

    if(! token){
      res.status(401).json('Token is wrong');
    }
    
 
  const decoded=  jwt.verify(token, 'Thisismykey');
  console.log(decoded);
 
  return next(); 
}catch(e){
    res.status(401).json('Token is missing');
}
   

}


export default auth