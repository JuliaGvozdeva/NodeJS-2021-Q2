const User = require('./resources/users/user.model');

const db = {
    Users: [],
    Boards: [],
    Tasks: [],
}

const getAllEntities = tableName => db[tableName].filter((entity) => entity);

const checkExistingEntity = (table, id) => {
    const found = db[table].some((entity) => entity.id === id);
    return !!found;
}

const getEntity = (tableName, id) => {
    if (checkExistingEntity(tableName, id)) {
        const foundEntity = db[tableName].filter(entity => entity.id === id);
        if (tableName === 'Users' && foundEntity[0]) {
            return User.toResponse(foundEntity[0]);
        }

        return foundEntity;
    } 
        return false;
    
}

const addUser = (userData) => {
    const newUser = new User(userData);
    db.Users.push(newUser);
    return User.toResponse(newUser);
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

module.exports = { getAllEntities, getEntity, addUser, updateUser, deleteUser }
