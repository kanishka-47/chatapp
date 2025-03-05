import { Router } from "express";
import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import setuser from "../services/auth.js";
import checkforauthenticationcookie from "../middleware/authmiddleware.js"

const router = Router();

router.post("/signup", async (req, res) => {
  const { fullname, email, password, confirmpassword } = req.body;

  try {
    // Validate if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if the user is already registered
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Hashing the password
    const hashpassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the new user object
    const newUser = new User({
      fullname,
      email,
      password: hashpassword, // Save only the hashed password
    });

    // Save the new user to the database
    await newUser.save();

    // Set session or token after creating the user
    if(newUser){
      setuser(newUser, res);

      // Send response
      return res.status(201).json({
        message: "User created successfully",
        newUser
      });
    }
   
  } catch (error) {
    // Log the error for debugging and return a 500 status
    console.error("Error during signup: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({error:"user not registered"});
    }
    const ismatch=await bcrypt.compare(password,user.password);

    if(!ismatch){
return res.status(400).json({error:"please enter right password"});
    }
   
        setuser(user,res);
        return res.status(200).json({message:"user found",user});
       
    
});

router.post("/logout",async(req,res)=>{
    res.clearCookie("token");
    
    return res.status(200).json({message:"logout successfully"});
})


router.get("/allusers",checkforauthenticationcookie(),async(req,res)=>{
  try{
    const loggedinuser=req.user._id;
    console.log(loggedinuser);
    const filtereduser=await User.find({_id:{$ne:loggedinuser}}).select("-password");
    res.status(201).json(
  
      filtereduser,
    )
  }catch(error){
    console.log("error inalluser",error);
    return res.status(500).json({ error: "An error occurred while retrieving users." });
  }
 
})
export default router;
