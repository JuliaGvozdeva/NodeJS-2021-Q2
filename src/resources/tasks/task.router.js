const router = require('express').Router({ mergeParams: true });
const jsonParser = require('express').json();
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardsId);
    if (tasks.error) {
      res.status(404).json(tasks.error);
    } else {
      res.json(tasks);
    }
});
  
router.route('/:id').get(async (req, res) => {
    const task = await tasksService.get(req.params.id, req.params.boardsId);

    if (task === false) {
        res.sendStatus(404);
    } else if (task.error) {
      res.status(404).json(task.error);
    } else {
      res.send(task);
    }
});

router.route('/').post(jsonParser, async (req, res) => {
    if (!req.body) {
      res.sendStatus(400);
    }
    
    const task = await tasksService.post(req.body, req.params.boardsId);

    if (task.error) {
        res.status(400).send(task.error);
    } else {
        res.status(201).send(task);
    }
});

router.route('/:id').put(jsonParser, async (req, res) => {
    if (!req.body) {
      res.sendStatus(400);
    }
  
    const task = await tasksService.put(req.params.id, req.body, req.params.boardsId);
  
    if (task === false) {
      res.sendStatus(404);
    } else if (task.error) {
      res.status(400).send(task.error);
    } else {
      res.send(task);
    }
  });

  router.route('/:id').delete(async (req, res) => {
    const answer = await tasksService.deleteTask(req.params.id, req.params.boardsId);

    if (answer.error) {
      res.status(400).send(answer.error);
    } else if (!answer){
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });

module.exports = router;