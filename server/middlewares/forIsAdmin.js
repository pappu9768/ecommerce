export const isAdmin = (req, res, next) => {
    try {

        if (req.user.role === 1) {
            return next()
        } else {
            return res.status(403).json({
                message: "Access denied for admin panel",
                success:false
            })
        }


    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
}