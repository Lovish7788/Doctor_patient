import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    try {

        // logic to verify token
        const { token } = req.headers;
        if (!token) {
            return res.json({
                success: false,
                message: 'Not Authorized Login Again'
            })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body = req.body || {};
        req.body.userId = token_decode.id;
        next()
    } catch (error) {
        console.log('Something went wrong', error)
        res.status(500).json({ success: false, message: error.message });
    }

}



export { authUser }