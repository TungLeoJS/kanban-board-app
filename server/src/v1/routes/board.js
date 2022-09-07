const router = require('express').Router();
const boardController = require('../../controllers/board');
const tokenHandler = require('../../handlers/tokenHandler');

router.get('/', tokenHandler.verifyToken, boardController.getAll);

router.post('/', tokenHandler.verifyToken, boardController.create);

module.exports = router;
