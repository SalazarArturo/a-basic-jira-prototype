import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';



import { sequelize, connectDb } from './config/db.config.js';
import './models/index.js'; //modelos con las relaciones establecidas
import authRouter from './routes/auth.route.js';
import projectRouter from './routes/project.route.js';
import ticketRouter from './routes/ticket.route.js';

const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/', authRouter);
app.use('/projects', projectRouter);
app.use('/projects/:projectId/tickets', ticketRouter);
//falta establecer aqui el router de tickets 

async function start(){
    try {
        await connectDb();
        await sequelize.sync({alter: true}); // sync() solo agrega lo que falta en la db (tablas) si ya hay una tabla con el mismo nombre que el modelo
        //da prioridad a lo que hay en la db. El alter:true si agrega cambios que hagamos en los modelos(tablas) y los lleva a la db
        console.log('Modelos sincronizados correctamente');

        app.listen(process.env.APP_PORT, () =>{
            console.log(`server is running on port: ${process.env.APP_PORT}`);
        });

    } catch (error) {
        console.error(`Error al iniciar el servidor: ${error.message}`);        
    }
}

start();


