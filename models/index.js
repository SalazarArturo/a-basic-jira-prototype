import User from './user.model.js';
import Project from './project.model.js';
import AssignedProject from './assignedProjects.model.js';
import Ticket from './ticket.model.js';


User.hasMany(Project, {
    foreignKey: 'ownerId'
});

Project.belongsTo(User, {
    foreignKey: 'ownerId'
});

User.belongsToMany(Project, {
    through: AssignedProject,
    foreignKey: 'userId'
});

Project.belongsToMany(User, {
    through: AssignedProject,
    foreignKey: 'projectId'
});

Project.hasMany(Ticket, {
    foreignKey: 'projectId'
});

Ticket.belongsTo(Project, {
    foreignKey: 'projectId'
});

User.hasMany(Ticket, {
    foreignKey: 'assignedUserId'
});

Ticket.belongsTo(User, {
    foreignKey: 'assignedUserId'
});

export {
    User,
    Project,
    AssignedProject,
    Ticket
};