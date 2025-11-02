import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

export const userAuthorization = async(req, res, next) => {
    try {
        const checkAuthorization = req.headers['authorization']
        if(!checkAuthorization){
            return res.status(400).json({
                message:"Token not provided"
            })
        }
        const result = jwt.verify(checkAuthorization, process.env.SECRET_KEY)
        
        const findUser = await userModel.findById(result._id).select("role");
        req.user = findUser;

        req.name = result.name
        console.log(findUser)
        console.log(result)
        next()
    } catch (error) {
        console.error(error)
    }

}