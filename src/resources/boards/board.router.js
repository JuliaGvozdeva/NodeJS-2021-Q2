const router = require('express').Router();
const jsonParser = require('express').json();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
});
  
router.route('/:id').get(async (req, res) => {
    const board = await boardsService.get(req.params.id);

    if (board === false) {
        res.sendStatus(404);
    } else {
        res.send(board);
    }
});

router.route('/').post(jsonParser, async (req, res) => {
    if (!req.body) {
      res.sendStatus(400);
    }
    
    const board = await boardsService.post(req.body);
  
    res.status(201).send(board);
});

router.route('/:id').put(jsonParser, async (req, res) => {
    if (!req.body) {
      res.sendStatus(400);
    }
  
    const board = await boardsService.put(req.params.id, req.body);
  
    if (board === false) {
      res.sendStatus(404);
    } else {
      res.send(board);
    }
  });

  router.route('/:id').delete(async (req, res) => {
    const answer = await boardsService.deleteBoard(req.params.id);
  
    if (answer) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

module.exports = router;