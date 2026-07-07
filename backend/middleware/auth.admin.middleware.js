import jwt from 'jsonwebtoken'




const authAdmin = async (req, res, next) => {

    try {

        // logic to verify token
        const { atoken } = req.headers;
        if (!atoken) {
            return res.json({
                success: false,
                message: 'Not Authorized Login Again'
            })
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        if (token_decode.payload !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: 'Not Authorized Login Again'
            })
        } else {
            next()
        }
    } catch (error) {
        console.log('Something went wrong', error)
        res.json({ success: false, message: error.message });
    }

}



export { authAdmin }