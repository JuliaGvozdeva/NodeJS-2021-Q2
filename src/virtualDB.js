const User = require('./resources/users/user.model');
const Board = require('./resources/boards/board.model');
const Task = require('./resources/tasks/task.model');

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
    if (tableName === 'Boards') {
        newEntity = new Board(entityData);
    } else if (tableName === 'Tasks') {
        newEntity = new Task(entityData);
    }

    db[tableName].push(newEntity);

    return newEntity;
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

const returnError = (id) => ({error: `The entity with id = ${id} was not found. Check the value and try again.`})

const checkTaskEntities = (userId, boardId, columnId) => { 
    if (userId && !checkExistingEntity('Users', userId)) {
        return returnError(userId);
    } if (boardId && !checkExistingEntity('Boards', boardId)) {
        return returnError(boardId);
    } if (columnId) {
        let flagExist = false;

        db.Boards.forEach((board) => {
            if (boardId === board.id) {
                const exist = board.columns.some((entity) => entity.id === columnId);
                if (exist) {
                    flagExist = true;
                }
            }
        });

        if (!flagExist) {
            return {error: `There is no column with id = ${columnId} in the board with id = ${boardId}`};
        }
    }

    return 'Success';
}

const addTask = (taskData) => {
    const userId = taskData.userId || null;
    const {boardId} = taskData;
    const {columnId} = taskData;
    const checkTaskData = checkTaskEntities(userId, boardId, columnId);

    if (checkTaskData !== 'Success') {
        return checkTaskData;
    } 
        return addEntity('Tasks', taskData);
    
}

const updateTask = (tableName, id, taskData) => {

    if (checkExistingEntity(tableName, id)) {
        const checkTaskData = checkTaskEntities(taskData.userId, taskData.boardId, taskData.columnId);

        if (checkTaskData !== 'Success') {
            return checkTaskData;
        } 
            let updateData = {};

            db[tableName] = db[tableName].map((entity) => {
                if (entity.id === id) {
                    updateData = {
                        id,
                        title: taskData.title,
                        order: taskData.order,
                        description: taskData.description,
                        userId: taskData.userId || null,
                        boardId: taskData.boardId,
                        columnId: taskData.columnId,
                    }
                    return new Task(updateData);
                }
        
                return entity;
            });
            
            return updateData;
        
    } 

    return false;    
}

const deleteTask = (id) => {
    const found = db.Tasks.some((task) => task.id === id);

    if (found) {
        db.Tasks = db.Tasks.filter((task) => task.id !== id);
        return true;
    }

    return false;  
}


const deleteUser = id => {
    const found = db.Users.some((user) => user.id === id);

    if (found) {
        db.Tasks.forEach((task) => {
            if (task.userId === id) {
                const updatedTask = {
                    id: task.id,
                    title: task.title,
                    order: task.order,
                    description: task.description,
                    userId: null,
                    boardId: task.boardId,
                    columnId: task.columnId,
                };
                
                updateTask('Tasks', task.id, updatedTask);
            }
        });

        db.Users = db.Users.filter((user) => user.id !== id);

        return true;
    }

    return false;    
}

module.exports = { getAllEntities, getEntity, addUser, updateUser, deleteUser, addEntity, putBoard, addTask, updateTask, deleteTask}
