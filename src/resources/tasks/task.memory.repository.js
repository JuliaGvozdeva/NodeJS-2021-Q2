
const {getAllEntities, getEntity, addTask, updateTask, deleteTask} = require('../../virtualDB');

const TABLE_NAME = 'Tasks';

const getAll = async () => getAllEntities(TABLE_NAME);

const get = async id => getEntity(TABLE_NAME, id);

const post = async (taskData) => addTask(taskData);

const put = async (id, taskData) => updateTask(TABLE_NAME, id, taskData)

const removeTask = async id => deleteTask(id)

module.exports = { getAll, get, post, put, removeTask};
