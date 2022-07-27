const tokenHandler = require('../../handlers/tokenHandler');
const validation = require('../../handlers/validation');
const router = require('express').Router();
const User = require('../../models/user');
const { body } = require('express-validator');
const userController = require('../../controllers/user');

router.post(
	'/signup',
	body('username').custom((value) => {
		return User.findOne({ username: value }).then((user) => {
			if (user) {
				return Promise.reject('Username already used.');
			}
		});
	}),
	body('username')
		.isLength({ min: 8 })
		.withMessage('username must be at least 8 character '),
	body('password')
		.isLength({ min: 8 })
		.withMessage('password must be at least 8 character '),
	body('confirmPassword')
		.isLength({ min: 8 })
		.withMessage('confirmPassword must be at least 8 character '),
	validation.validate,
	userController.register
);

router.post(
	'/login',
	body('username')
		.isLength({ min: 8 })
		.withMessage('username must be at least 8 character '),
	body('password')
		.isLength({ min: 8 })
		.withMessage('password must be at least 8 character '),
	validation.validate,
	userController.login
);

router.post('verify-token', tokenHandler.verifyToken, (req, res) => {
	return res.status(200).json({ user: req.user });
});
