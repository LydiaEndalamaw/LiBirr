const app = require("express");
const router = app.Router();

router.post("/register",(req,res,next)=>{
  
    const { name,email,age,password } = req.body;
    // Do the database operation
    
    res.json({message :"User Registered Succesfully"});
})



router.post("/login",(req,res,next)=>{
  
    const { email,password } = req.body;
    // Do the database operation
    
    res.json({message :"Login success"});
})

module.exports = router;