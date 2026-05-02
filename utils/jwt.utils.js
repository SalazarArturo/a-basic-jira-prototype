import jwt from 'jsonwebtoken';

export default {
    generateToken: (payload) =>{
        const sessionToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1hr'});
        return sessionToken;
    },
    validateToken: (token) =>{
        try {
            const nakedPayload = jwt.verify(token, process.env.SECRET_KEY);
            return nakedPayload;
        } catch (error) {
            throw error;
        }
    }
}