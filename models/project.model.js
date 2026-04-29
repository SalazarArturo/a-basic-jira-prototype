import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Project = sequelize.define('projects', {
    projectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ownerId:{ //aqui solo decimos por el momento que habra esta columna pero en el index de models estableceremos que sera una foreign key referenciando a usuarios
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Project;
