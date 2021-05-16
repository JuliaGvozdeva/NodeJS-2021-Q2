const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();

const get = (id) => taskRepo.get(id);

const post = (taskData) => taskRepo.post(taskData);

const put = (id, taskData) => taskRepo.put(id, taskData);

const deleteTask = (id) => taskRepo.removeTask(id);

module.exports = {getAll, get, post, put, deleteTask};