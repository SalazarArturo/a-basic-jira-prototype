function jsonReqIsValid(req, res, next){
    if(!req.body || Object.keys(req.body).length === 0){
        return res.status(400).json({
            message: 'Debe enviar datos validos'
        });
    }
    next();
}

export default jsonReqIsValid;