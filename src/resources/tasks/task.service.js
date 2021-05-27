const taskRepo = require('./task.memory.repository');

/**
 * Returns all tasks from board id.
 * @param {number} boardId - Board id
 * @return {Array<object>} - List of all tasks
 */
const getAll = (boardId) => taskRepo.getAll(boardId);

/**
 * Returns task data by his ID
 * @param {number} id - Task id
 * @param {number} boardId - Board id
 * @returns {object} - Task data
 */
const get = (id, boardId) => taskRepo.get(id, boardId);

/**
 * Creates new task
 * @param {object} taskData - New task details
 * @param {number} boardId - Board id
 * @returns {object} - New task details
 */
const post = (taskData, boardId) => taskRepo.post(taskData, boardId);

/**
 * Updates task details
 * @param {number} id - Task id
 * @param {object} taskData - Updated user details
 * @param {number} boardId - Board id
 * @returns {object} - New detals for task with id
 */
const put = (id, taskData, boardId) => taskRepo.put(id, taskData, boardId);

/**
 * Deletes task by id
 * @param {number} id - Task id
 * @param {number} boardId - Bord id
 * @returns {boolean} - Success deletion flag
 */
const deleteTask = (id, boardId) => taskRepo.removeTask(id, boardId);

module.exports = { getAll, get, post, put, deleteTask };
