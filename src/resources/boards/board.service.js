const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const get = (id) => boardRepo.get(id);

const post = (boardData) => boardRepo.post(boardData);

const put = (id, boardData) => boardRepo.put(id, boardData);

const deleteBoard = (id) => boardRepo.removeBoard(id);

module.exports = {getAll, get, post, put, deleteBoard};