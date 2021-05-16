const router = require('express').Router();
const jsonParser = require('express').json();
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
});
  
router.route('/:id').get(async (req, res) => {
    const task = await tasksService.get(req.params.id);

    if (task === false) {
        res.sendStatus(404);
    } else {
        res.send(task);
    }
});

router.route('/').post(jsonParser, async (req, res) => {
    if (!req.body) {
      res.sendStatus(400);
    }
    
    const task = await tasksService.post(req.body);

    if (task.error) {
        res.status(400).json(task.error);
    } else {
        res.status(201).send(task);
    }
});

router.route('/:id').put(jsonParser, async (req, res) => {
    if (!req.body) {
      res.sendStatus(400);
    }
  
    const task = await tasksService.put(req.params.id, req.body);
  
    if (task === false) {
      res.sendStatus(404);
    } else {
      res.send(task);
    }
  });

  router.route('/:id').delete(async (req, res) => {
    const answer = await tasksService.deleteTask(req.params.id);
  
    if (answer) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

module.exports = router;