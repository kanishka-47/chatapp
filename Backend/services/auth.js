import jwt from "jsonwebtoken";
function setuser(user,res){
    const tocken=jwt.sign({
        _id:user.id,
        fullname:user.fullname,
        email:user.email,
    },process.env.JWT_SECRET,{
        expiresIn:"30d"//life time of tocken
    });
    res.cookie("token",tocken,{
       
        httpOnly:true,
        secure: true,
        sameSite: "strict",//third party cookies ko allow krne ke liye
    });
}
export default setuser;
