import tokenValidator from '../utils/jwt.utils.js';

function authorizationValidator(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const splittedHeader = authHeader.split(' ');
    
    if(splittedHeader.length !== 2 || splittedHeader[0] !== 'Bearer'){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const arrivedToken = splittedHeader[1];

    try {
        const nakedToken = tokenValidator.validateToken(arrivedToken);

        req.user = nakedToken;
        next();

    } catch (error) {
        console.error(error.message);
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export default authorizationValidator