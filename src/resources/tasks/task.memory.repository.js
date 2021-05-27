const {
  getAllBoardTasks,
  getEntity,
  addTask,
  updateTask,
  deleteTask,
} = require('../../virtualDB');

const TABLE_NAME = 'Tasks';

/**
 * Returns all tasks from board id.
 * @param {number} boardId - Board id
 * @return {Array<object>} - List of all tasks
 */
const getAll = async (boardId) => getAllBoardTasks(TABLE_NAME, boardId);

/**
 * Returns task data by his ID
 * @param {number} id - Task id
 * @param {number} boardId - Board id
 * @returns {object} - Task data
 */
const get = async (id, boardId) => getEntity(TABLE_NAME, id, boardId);

/**
 * Creates new task
 * @param {object} taskData - New task details
 * @param {number} boardId - Board id
 * @returns {object} - New task details
 */
const post = async (taskData, boardId) => addTask(taskData, boardId);

/**
 * Updates task details
 * @param {number} id - Task id
 * @param {object} taskData - Updated user details
 * @param {number} boardId - Board id
 * @returns {object} - New detals for task with id
 */
const put = async (id, taskData, boardId) => updateTask(TABLE_NAME, id, taskData, boardId);

/**
 * Deletes user by id
 * @param {number} id - Board id
 * @param {number} boardId - Bord id
 * @returns {boolean} - Success deletion flag
 */
const removeTask = async (id, boardId) => deleteTask(id, boardId);

module.exports = { getAll, get, post, put, removeTask };
