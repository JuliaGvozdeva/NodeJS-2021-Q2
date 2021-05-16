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


const getAllBoardTasks = (tableName, boardId) => {
    if (checkExistingEntity('Boards', boardId)) {
        return db[tableName].filter((entity) => entity.boardId === boardId);
    } 
        return {error: `There is no board with id = ${boardId}. Check the value and try again.`}
    
}

const getEntity = (tableName, id, boardId) => {
    if (checkExistingEntity(tableName, id)) {
        const foundEntity = db[tableName].filter(entity => entity.id === id);

        if (tableName === 'Users' && foundEntity[0]) {
            return User.toResponse(foundEntity[0]);
        } if (tableName === 'Tasks' && foundEntity[0]) {
            if (foundEntity[0].boardId !== boardId) {
                return {error: `There is no task with boardId=${boardId}. Check the value and try again.`}
            }
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

const addEntity = (tableName, entityData, boardId) => {
    let newEntity = {};
    if (tableName === 'Boards') {
        newEntity = new Board(entityData);
    } else if (tableName === 'Tasks') {
        const newEntityData = entityData;
        if (!entityData.boardId) {
            newEntityData.boardId = boardId;
        }
        newEntity = new Task(newEntityData);
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

const checkTaskEntities = (userId, boardId, columnId, requestBoardId) => { 
    if (boardId && requestBoardId) {
        if (boardId !== requestBoardId) {
            return {error: `BoardId in request and body don't match.`}
        } if (!checkExistingEntity('Boards', boardId)) {       
            return returnError(boardId);
        } if (!checkExistingEntity('Boards', requestBoardId)) {       
            return returnError(requestBoardId);
        }
    } else if (userId && !checkExistingEntity('Users', userId)) {
        return returnError(userId);
    } else if (columnId) {
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

const addTask = (taskData, requestBoardId) => {
    const userId = taskData.userId || null;
    const {boardId, columnId} = taskData;
    const checkTaskData = checkTaskEntities(userId, boardId, columnId, requestBoardId);

    if (checkTaskData !== 'Success') {
        return checkTaskData;
    } 
        return addEntity('Tasks', taskData, requestBoardId);
    
}

const updateTask = (tableName, id, taskData, requestBoardId) => {
    if (checkExistingEntity(tableName, id)) {
        const checkTaskData = checkTaskEntities(taskData.userId, taskData.boardId, taskData.columnId, requestBoardId);

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

const deleteTask = (id, boardId) => {
    const found = db.Tasks.some((entity) => entity.id === id && entity.boardId === boardId);

    if (found) {
        db.Tasks = db.Tasks.filter((task) => task.id !== id);
        return true;
    }

    return false;  
}

const deleteUser = (id) => {
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

const deleteBoard = (id) => {
    const found = checkExistingEntity('Boards', id);
    let successDeleting = true;

    if (found) {
        db.Boards = db.Boards.filter((task) => task.id !== id);

        db.Tasks.forEach((task) => {
            if (task.boardId === id) {
                successDeleting = deleteTask(task.id, id);
            }
        })

        return successDeleting;
    }

    return false;  
}

module.exports = { getAllEntities, getEntity, addUser, updateUser, deleteUser, addEntity, putBoard, addTask, updateTask, deleteTask, deleteBoard, getAllBoardTasks}
