import user from "../model/UserSchema.js";

export const getAll = async(req,res)=>{
    try {
        const users = await user.find();

        res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        console.log(error);
        
    }
}