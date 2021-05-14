const User = require('./resources/users/user.model');
const Board = require('./resources/boards/board.model');

const db = {
    Users: [],
    Boards: [],
    Tasks: [],
}

const getAllEntities = tableName => db[tableName].filter((entity) => entity);

const checkExistingEntity = (table, id) => {
    const found = db[table].some((entity) => entity.id === id);
    return found;
}

const getEntity = (tableName, id) => {
    if (checkExistingEntity(tableName, id)) {
        const foundEntity = db[tableName].filter(entity => entity.id === id);

        if (tableName === 'Users' && foundEntity[0]) {
            return User.toResponse(foundEntity[0]);
        }

        return foundEntity[0];
    }

    return false;
}

const addUser = (userData) => {
    const newUser = new User(userData);
    db.Users.push(newUser);
    return User.toResponse(newUser);
}

const addEntity = (tableName, entityData) => {
    let newEntity = {};
    if (tableName === "Boards") {
        newEntity = new Board(entityData);
    }

    db[tableName].push(newEntity);

    return newEntity;
}

const deleteUser = id => {
    const found = db.Users.some((user) => user.id === id);

    if (found) {
        db.Users = db.Users.filter(user => user.id === id);
        return true;
    }

    return false;    
}

const updateUser = (id, userData) => {
    if (checkExistingEntity("Users", id)) {
        let updateData = {};

        db.Users = db.Users.map((user) => {
            if (user.id === id) {
                updateData = {
                    id,
                    name: userData.name || null,
                    login: userData.login || null,
                    password: userData.password || null,
                }
    
                return new User(updateData);
            }
    
            return user;
        });
    
        return User.toResponse(updateData);
    } 

    return false;    
}

const putBoard = (tableName, id, boardData) => {
    if (checkExistingEntity(tableName, id)) {
        let updateData = {};

        db[tableName] = db[tableName].map((entity) => {
            if (entity.id === id) {
                updateData = {
                    id,
                    title: boardData.title || null,
                    columns: boardData.columns || {}
                }
    
                return new Board(updateData);
            }
    
            return entity;
        });
    
        return updateData;
    } 

    return false;    
}

module.exports = { getAllEntities, getEntity, addUser, updateUser, deleteUser, addEntity, putBoard}
