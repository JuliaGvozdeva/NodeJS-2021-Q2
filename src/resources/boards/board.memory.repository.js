const {
  getAllEntities,
  getEntity,
  addEntity,
  putBoard,
  deleteBoard,
} = require('../../virtualDB');

const TABLE_NAME = 'Boards';

/**
 * Returns all boards.
 * @return {Array<object>} - List of all boards
 */
const getAll = async () => getAllEntities(TABLE_NAME);

/**
 * Returns board data by his ID
 * @param {number} id - Board id
 * @returns {object} - Board data
 */
const get = async (id) => getEntity(TABLE_NAME, id);

/**
 * Creates new board
 * @param {object} boardData - New board details
 * @returns {object} - New board details
 */
const post = async (boardData) => addEntity(TABLE_NAME, boardData);

/**
 * Updates board details
 * @param {number} id - Board id
 * @param {object} boardData - Updated board details
 * @returns {object} - New detals for board with id
 */
const put = async (id, boardData) => putBoard(TABLE_NAME, id, boardData);

/**
 * Deletes board by id
 * @param {number} id - Board id
 * @returns {boolean} - Success deletion flag
 */
const removeBoard = async (id) => deleteBoard(id);

module.exports = { getAll, get, post, put, removeBoard };
