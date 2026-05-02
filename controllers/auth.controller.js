import {findUserByEmailService, registerUserService} from '../services/user.service.js';

import bcrypt from 'bcrypt';
import tokenUtils from '../utils/jwt.utils.js';


async function registerUser(req, res){
    const {name, email, password} = req.body;
     try {
        const existingUser = await findUserByEmailService(email);
        if(existingUser){
            return res.status(400).json({message: 'El email ya esta registrado'});
        }
       
       const hashedPassword = await bcrypt.hash(password, 10); //hasheamos la password del usuario para que se guarde asi en la db

       const user = await registerUserService({name, email, hashedPassword}); //aqui el usuario estaria medio al dope, osea la variable user
       return res.status(201).json({message: 'nuevo usuario registrado con exito !'});
       
     } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Error interno en el servidor, intente nuevamente'});
     }
}


async function postLoginCredentials(req, res){
    const {email, password} = req.body;
    try {
        const user = await findUserByEmailService(email);
        if(!user){
            return res.status(400).json({message: 'Usuario o contraseña incorrectas'});
        }

        const passwordResult = await bcrypt.compare(password, user.hashedPassword);
        if(!passwordResult){
            return res.status(400).json({message: 'Usuario o contraseña incorrectas'});
        }

        //si paso todo eso le damos un un tokensillo para su sesaoon
        const sessionToken = tokenUtils.generateToken({
            userId: user.userId,
            name: user.name
        });

        return res.status(200).json({sessionToken});

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'Error interno en el servidor, intente nuevamente'});
    }
}

export{
    postLoginCredentials,
    registerUser
}