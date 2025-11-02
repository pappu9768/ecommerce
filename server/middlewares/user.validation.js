import Joi from 'joi';


export const signupValidation = (req, res, next) => {
    try {
        const signupSchema = Joi.object({
            name: Joi.string().min(4).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).max(12).required(),
            mobile: Joi.number().required(),
        })

        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
               
                error

            })
        }

    } catch (error) {
        console.error(error);

        res.json({
            message: "Error found in validating",
            error
        })
    }
    next();
}

export const loginValidation = (req, res, next) => {
    try {
        const loginSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(4).max(12).required()
        })

        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error
            })
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: "Error found in validating",
            error
        })

    }
    next();
}