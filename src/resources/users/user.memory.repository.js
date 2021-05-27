const {
  getAllEntities,
  getEntity,
  addUser,
  updateUser,
  deleteUser,
} = require('../../virtualDB');

const TABLE_NAME = 'Users';

/**
 * Returns all users.
 * @return {Array<object>} - List of all users
 */
const getAll = async () => getAllEntities(TABLE_NAME);

/**
 * Returns user data by his ID
 * @param {number} id - User id
 * @returns {object} - User data
 */
const get = async (id) => getEntity(TABLE_NAME, id);

/**
 * Creates new user
 * @param {object} userData - New user details
 * @returns {object} - New user details without password
 */
const post = async (userData) => addUser(userData);

/**
 * Updates user ddetails
 * @param {number} id - User id
 * @param {object} userData - Updated user details
 * @returns {object} - New detals for user with id
 */
const put = async (id, userData) => updateUser(id, userData);

/**
 * Deletes user by id
 * @param {number} id - User id
 * @returns {boolean} - Success deletion flag
 */
const removeUser = async (id) => deleteUser(id);

module.exports = { getAll, get, post, put, removeUser };
