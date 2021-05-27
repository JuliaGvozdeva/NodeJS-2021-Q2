const uuid = require('uuid').v4;

class User {
  /**
   * Create an user.
   * @param {string} name - User name
   * @param {string} login - User login
   * @param {string} password - User password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns user data without password
   * @param {object} user User data
   * @returns {object} - User data without password
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
