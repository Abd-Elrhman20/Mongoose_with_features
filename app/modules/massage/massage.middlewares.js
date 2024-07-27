import jwt from 'jsonwebtoken';

export const checkAuthenticatedUser = async (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        // return res.status(401).send({ message: 'Please SignIn' })
        throw new AppError("Please SignIn", 401);
    }

    // check token
    jwt.verify(token, 'secret', (err, decodedToken) => {
        if (err) {
            // return res.status(498).send({ message: 'Invalid Token' })
            throw new AppError("Invalid Token", 498);
        }
        // authentication
        console.log(req.body.receiverId);
        if (req.body.receiverId != decodedToken.id) {
            // return res.status(403).send({ message: 'unAuthenticated' })
            throw new AppError("unAuthenticated", 403);
        }
        req.user = decodedToken
        next()
    })
};