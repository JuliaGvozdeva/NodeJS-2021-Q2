const boardRepo = require('./board.memory.repository');

/**
 * Returns all boards.
 * @return {Array<object>} - List of all boards
 */
const getAll = () => boardRepo.getAll();

/**
 * Returns board data by his ID
 * @param {number} id - Board id
 * @returns {object} - Board data
 */
const get = (id) => boardRepo.get(id);

/**
 * Creates new board
 * @param {object} boardData - New board details
 * @returns {object} - New board details
 */
const post = (boardData) => boardRepo.post(boardData);

/**
 * Updates board details
 * @param {number} id - Board id
 * @param {object} boardData - Updated board details
 * @returns {object} - New detals for board with id
 */
const put = (id, boardData) => boardRepo.put(id, boardData);

/**
 * Deletes board by id
 * @param {number} id - Board id
 * @returns {boolean} - Success deletion flag
 */
const deleteBoard = (id) => boardRepo.removeBoard(id);

module.exports = { getAll, get, post, put, deleteBoard };
