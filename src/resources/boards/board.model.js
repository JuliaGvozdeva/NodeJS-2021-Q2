const uuid = require('uuid').v4;
const Column = require('../columns/columns.model');

class Board {
    constructor({
        id = uuid(),
        title = "BOARD",
        columns = [],
    } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns.map(column => new Column(column));
    }
}

module.exports = Board;