const taskRepo = require('./task.memory.repository');

const getAll = (boardId) => taskRepo.getAll(boardId);

const get = (id, boardId) => taskRepo.get(id, boardId);

const post = (taskData, boardId) => taskRepo.post(taskData, boardId);

const put = (id, taskData, boardId) => taskRepo.put(id, taskData, boardId);

const deleteTask = (id, boardId) => taskRepo.removeTask(id, boardId);

module.exports = {getAll, get, post, put, deleteTask};