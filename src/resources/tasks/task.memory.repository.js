
const {getAllBoardTasks, getEntity, addTask, updateTask, deleteTask} = require('../../virtualDB');

const TABLE_NAME = 'Tasks';

const getAll = async (boardId) => getAllBoardTasks(TABLE_NAME, boardId);

const get = async (id, boardId) => getEntity(TABLE_NAME, id, boardId);

const post = async (taskData, boardId) => addTask(taskData, boardId);

const put = async (id, taskData, boardId) => updateTask(TABLE_NAME, id, taskData, boardId)

const removeTask = async (id, boardId) => deleteTask(id, boardId)

module.exports = { getAll, get, post, put, removeTask};
