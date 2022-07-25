const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
	const { password } = req.body;

	try {
		req.body.password = cryptoJS.AES.encrypt(
			password,
			process.env.PASSWORD_SECRET_KEY
		);
		const user = await User.create(req.body);
		const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
			expiresIn: '24h',
		});
		res.status(201).json({ user, token });
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).select('password username');
	if (!user) {
		return res.status(401).json({
			errors: [
				{
					param: 'username',
					msg: 'Invalid username or password',
				},
			],
		});
	}

	const decryptedPass = cryptoJS.AES.decrypt(
		user.password,
		process.env.PASSWORD_SECRET_KEY
	).toString(cryptoJS.enc.Utf8);

	if (decryptedPass !== password) {
		return res.status(401).json({
			errors: [
				{
					param: 'password',
					msg: 'Invalid username or password',
				},
			],
		});
	}

	user.password = undefined;

	const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
		expiresIn: '1h',
	});
	res.status(200).json({ user, token });
	try {
	} catch (err) {
		res.status(500).json(err);
	}
};
