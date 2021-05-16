
const {getAllEntities, getEntity, addUser, updateUser, deleteUser} = require('../../virtualDB');

const TABLE_NAME = 'Users';

const getAll = async () => getAllEntities(TABLE_NAME);

const get = async id => getEntity(TABLE_NAME, id)

const post = async userData => addUser(userData)

const put = async (id, userData) => updateUser(id, userData)

const removeUser = async id => deleteUser(id)

module.exports = { getAll, get, post, put, removeUser};
