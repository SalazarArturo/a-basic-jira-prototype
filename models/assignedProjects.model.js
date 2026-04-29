import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const AssignedProject = sequelize.define('assigned_projects', {
    assignedProjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default AssignedProject;