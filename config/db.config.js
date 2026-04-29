import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_URL, {

        dialect: 'postgres',
        logging: false,
        define:{
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

async function connectDb(){
    try {
        await sequelize.authenticate(); //metodo para hacer la conexion, aqui lo que podria caer en el catch son errores de configuracion o de conexion propiamente dicho, DAAAAH
        console.log('Conexion en la db exitosa !');

    } catch (error) {
        throw error;
    }
}

export {
    sequelize,
    connectDb
}