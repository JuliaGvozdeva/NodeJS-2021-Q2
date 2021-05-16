const router = require('express').Router();
const jsonParser = require('express').json();
const User = require('./user.model');
const usersService = require('./user.service');


router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  
  if (user === false) {
    res.sendStatus(404);
  } else {
    res.send(user);
  }
});

router.route('/:id').put(jsonParser, async (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
  }

  const user = await usersService.put(req.params.id, req.body);

  if (user === false) {
    res.sendStatus(404);
  } else {
    res.send(user);
  }
});

router.route('/').post(jsonParser, async (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
  }
  
  const user = await usersService.post(req.body);

  res.status(201).send(user);
});

router.route('/:id').delete(async (req, res) => {
  const answer = await usersService.deleteUser(req.params.id);

  if (answer) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
