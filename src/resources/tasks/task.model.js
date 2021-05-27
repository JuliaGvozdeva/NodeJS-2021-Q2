const uuid = require('uuid').v4;

class Task {
  /**
   * Create a task.
   * @param {string} title - Task title
   * @param {number} order - Task order
   * @param {string} description - Task description
   * @param {number} userId - Task id
   * @param {number} boardId - Board id
   * @param {number} columnId - Column id
   */
  constructor({
    id = uuid(),
    title = 'Task1',
    order = 1,
    description = 'Test description for the first task',
    userId = '', // assignee
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
