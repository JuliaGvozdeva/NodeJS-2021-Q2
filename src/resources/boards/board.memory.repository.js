
const {getAllEntities, getEntity, addEntity, putBoard, deleteBoard} = require('../../virtualDB');

const TABLE_NAME = 'Boards';

const getAll = async () => getAllEntities(TABLE_NAME);

const get = async id => getEntity(TABLE_NAME, id);

const post = async boardData => addEntity(TABLE_NAME, boardData);

const put = async (id, boardData) => putBoard(TABLE_NAME, id, boardData);

const removeBoard= async id => deleteBoard(id);

module.exports = { getAll, get, post, put, removeBoard};
