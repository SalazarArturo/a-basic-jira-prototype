import { User } from "../models/index.js";

async function registerUserService(userCredentials){
    try {
        const result = User.create(userCredentials);
        return result;
    } catch (error) {
        throw error;
    }
}

async function findUserByEmailService(email){ // si entendia como funcionaba la arquitectura en capaz esto me confunde un poco ... 
    //se suponia que los servicios manebajan logica de negocio y estas llamadas a nuestra db las delagabamos al repository 
    //pero la logica de negocio en este caso basicamente la delegamos a nuestros middlewares, pero "x" no todos cogen en la vida.
    try {
        const result = await User.findOne({where:{email: email}});
        return result;
    } catch (error) {
        throw error;
    }
}

export {
    registerUserService,
    findUserByEmailService
}