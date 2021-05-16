const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const post = userData =>  usersRepo.post(userData);

const put = (id, userData) =>  usersRepo.put(id, userData);

const deleteUser = id => usersRepo.removeUser(id);

module.exports = { getAll, get, post,  put, deleteUser };
