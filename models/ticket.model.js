import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Ticket = sequelize.define('tickets', {
    ticketId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: { //llave foranea a tabla/modelo proyectos para especificar a que proyecto pertenece el ticket
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('pendiente', 'progreso', 'completado'),
        defaultValue: 'pendiente',
        allowNull: false
    },
    assignedUserId: { //esta sera una llave foranea a la tabla/modelo usuarios pero pivoteara con el userId de la tabla/modelo asignedProjects para comparaciones y validaciones
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Ticket;