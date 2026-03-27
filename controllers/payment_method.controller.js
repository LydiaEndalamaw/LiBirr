const bcrypt = require("bcrypt");
const User = require("../models/Paymentmethod.model");
const jwt =  require("jsonwebtoken")
class UserController {
  static Payment = async (req, res, next) => {
    try {
      const { name, email, age, password } = req.body;

      const hashedPw = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        name: name,
        email: email,
        age: age,
        password: hashedPw,
      });

      // Do the database operation

      res.json({ message: "User Registered Succesfully", user: newUser });
    } catch (error) {
      console.log("the error is here - ", error);
    }
  };
  static loginUser = async (req,res,next)=>{
  
    const { email,password } = req.body;
    // Do the database operation
    
    const user = await User.findOne({where: {email:email}});
    
    if(!user){
        return res.status(404).json({error: "User not found"});
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(401).json({error: "Incorrect Password"});

    }
    const token = jwt.sign({id: user.id},process.env.JWT_SECRET); 
    res.json({message :"Login success",user,token});
}
}


module.exports = UserController

