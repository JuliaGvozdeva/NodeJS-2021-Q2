const usersRepo = require('./user.memory.repository');

/**
 * Returns all users.
 * @return {Array<object>} - List of all users
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns user data by his ID
 * @param {number} id - User id
 * @returns {object} - User data
 */
const get = (id) => usersRepo.get(id);

/**
 * Creates new user
 * @param {object} userData - New user details
 * @returns {object} - New user details without password
 */
const post = (userData) => usersRepo.post(userData);

/**
 * Updates user details
 * @param {number} id - User id
 * @param {object} userData - Updated user details
 * @returns {object} - New detals for user with id
 */
const put = (id, userData) => usersRepo.put(id, userData);

/**
 * Deletes user by id
 * @param {number} id - User id
 * @returns {boolean} - Success deletion flag
 */
const deleteUser = (id) => usersRepo.removeUser(id);

module.exports = { getAll, get, post, put, deleteUser };
