const router = require('express').Router();
const userController = require('../controller/user.controller');

router.post('/registration',userController.register);
router.post('/login',userController.register);

module.exports = router;
