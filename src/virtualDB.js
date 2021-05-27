const User = require('./resources/users/user.model');
const Board = require('./resources/boards/board.model');
const Task = require('./resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
};

/**
 * Returns list of entities from a table
 * @param {string} tableName - Entity table name
 * @returns {Array<object>} - List of entities from the table
 */
const getAllEntities = (tableName) => db[tableName].filter((entity) => entity);

/**
 * Checks the existence of an entity with an identifier in a table
 * @param {string} table - Entity table name
 * @param {number} id - Entity id
 * @returns {boolean} - The result is the existence of an entity
 */
const checkExistingEntity = (table, id) => {
  const found = db[table].some((entity) => entity.id === id);
  return found;
};

/**
 * Returns all boards
 * @param {string} tableName - Name of table with boards
 * @param {number} boardId - Board id
 * @returns {Array<object>} - The list of all boards
 */
const getAllBoardTasks = (tableName, boardId) => {
  if (checkExistingEntity('Boards', boardId)) {
    return db[tableName].filter((entity) => entity.boardId === boardId);
  }
  return {
    error: `There is no board with id = ${boardId}. Check the value and try again.`,
  };
};

/**
 * Returns details for entity with id from a table
 * @param {string} tableName - Entity table name
 * @param {number} id - Entity id
 * @param {number} boardId - Board id
 * @returns {object | boolean} - Entity details or error flag or error message
 */
const getEntity = (tableName, id, boardId) => {
  if (checkExistingEntity(tableName, id)) {
    const foundEntity = db[tableName].filter((entity) => entity.id === id);

    if (tableName === 'Users' && foundEntity[0]) {
      return User.toResponse(foundEntity[0]);
    }
    if (tableName === 'Tasks' && foundEntity[0]) {
      if (foundEntity[0].boardId !== boardId) {
        return {
          error: `There is no task with boardId=${boardId}. Check the value and try again.`,
        };
      }
    }

    return foundEntity[0];
  }

  return false;
};

/**
 * Creates a new user and returns new user details with id but without password
 * @param {object} userData - New user details
 * @returns {object} - User details with id but without password
 */
const addUser = (userData) => {
  const newUser = new User(userData);
  db.Users.push(newUser);
  return User.toResponse(newUser);
};

/**
 * Creates a new entity in the table
 * @param {string} tableName - Entity table name
 * @param {number} id - Entity id
 * @param {number} boardId - Board id
 * @returns {object} - New entity details
 */
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
};

/**
 * Updates user details by user id and returns new user details with id but without password
 * @param {number} id - User id
 * @param {object} userData - New user details
 * @returns {object} - New user details with id but without password
 */
const updateUser = (id, userData) => {
  if (checkExistingEntity('Users', id)) {
    let updateData = {};

    db.Users = db.Users.map((user) => {
      if (user.id === id) {
        updateData = {
          id,
          name: userData.name || null,
          login: userData.login || null,
          password: userData.password || null,
        };

        return new User(updateData);
      }

      return user;
    });

    return User.toResponse(updateData);
  }

  return false;
};

/**
 * Updates bord details
 * @param {string} tableName - Board table name
 * @param {number} id - Bord id
 * @param {object} boardData - New boards details
 * @returns {object} - Returns updated board details
 */
const putBoard = (tableName, id, boardData) => {
  if (checkExistingEntity(tableName, id)) {
    let updateData = {};

    db[tableName] = db[tableName].map((entity) => {
      if (entity.id === id) {
        updateData = {
          id,
          title: boardData.title || null,
          columns: boardData.columns || {},
        };

        return new Board(updateData);
      }

      return entity;
    });

    return updateData;
  }

  return false;
};

/**
 * Returns error message
 * @param {number} id - Entity id
 * @returns {object} - Error message
 */
const returnError = (id) => ({
  error: `The entity with id = ${id} was not found. Check the value and try again.`,
});

/**
 * Checks entity relationships
 * @param {number} userId - User id
 * @param {number} boardId - Board id
 * @param {number} columnId - Column id
 * @param {number} requestBoardId - Bord id from request
 * @returns {object | string} - Result of checking
 */
const checkTaskEntities = (userId, boardId, columnId, requestBoardId) => {
  if (boardId && requestBoardId) {
    if (boardId !== requestBoardId) {
      return { error: `BoardId in request and body don't match.` };
    }
    if (!checkExistingEntity('Boards', boardId)) {
      return returnError(boardId);
    }
    if (!checkExistingEntity('Boards', requestBoardId)) {
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
      return {
        error: `There is no column with id = ${columnId} in the board with id = ${boardId}`,
      };
    }
  }

  return 'Success';
};

/**
 * Creates new task
 * @param {object} taskData - New task data
 * @param {number} requestBoardId - Bord id from request
 * @returns {object} - Crated task data
 */
const addTask = (taskData, requestBoardId) => {
  const userId = taskData.userId || null;
  const { boardId, columnId } = taskData;
  const checkTaskData = checkTaskEntities(
    userId,
    boardId,
    columnId,
    requestBoardId
  );

  if (checkTaskData !== 'Success') {
    return checkTaskData;
  }
  return addEntity('Tasks', taskData, requestBoardId);
};

/**
 *
 * @param {string} tableName - Task table name
 * @param {number} id - Task id
 * @param {object} taskData - Task data for update
 * @param {number} requestBoardId - Bord id from request
 * @returns {object} - Updated task data
 */
const updateTask = (tableName, id, taskData, requestBoardId) => {
  if (checkExistingEntity(tableName, id)) {
    const checkTaskData = checkTaskEntities(
      taskData.userId,
      taskData.boardId,
      taskData.columnId,
      requestBoardId
    );

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
        };
        return new Task(updateData);
      }

      return entity;
    });

    return updateData;
  }

  return false;
};

/**
 * Deletes task by id
 * @param {number} id - Task id
 * @param {number} boardId - Board id
 * @returns {boolean} - Removal result
 */
const deleteTask = (id, boardId) => {
  const found = db.Tasks.some(
    (entity) => entity.id === id && entity.boardId === boardId
  );

  if (found) {
    db.Tasks = db.Tasks.filter((task) => task.id !== id);
    return true;
  }

  return false;
};

/**
 * Delete user by id
 * @param {number} id - User id
 * @returns {boolean} - Removal result
 */
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
};

/**
 * Delete board by id
 * @param {number} id - Board id
 * @returns {boolean} - Removal result
 */
const deleteBoard = (id) => {
  const found = checkExistingEntity('Boards', id);
  let successDeleting = true;

  if (found) {
    db.Boards = db.Boards.filter((task) => task.id !== id);

    db.Tasks.forEach((task) => {
      if (task.boardId === id) {
        successDeleting = deleteTask(task.id, id);
      }
    });

    return successDeleting;
  }

  return false;
};

module.exports = {
  getAllEntities,
  getEntity,
  addUser,
  updateUser,
  deleteUser,
  addEntity,
  putBoard,
  addTask,
  updateTask,
  deleteTask,
  deleteBoard,
  getAllBoardTasks,
};
