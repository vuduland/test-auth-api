const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const path = require("path");

const router = express.Router();

router.post('/user/register', async (req, res) => {
	// Create a new user
	console.log(req.body);
	try {
		const user = new User(req.body);
		await user.save();
		const token = await user.generateAuthToken();
		// res.status(201).send({ user, token });
		// res.sendFile(path.join(__dirname, "/intakeform.html"));
	} catch (error) {
		res.status(400).send(error);
	}
	res.sendFile(path.join(__dirname, "../../public/intakeform.html"));
});

router.post('/users/login', async (req, res) => {
	//Login a registered user
	try {
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);
		if (!user) {
			return res
				.status(401)
				.send({ error: 'Login failed! Check authentication credentials' });
		}
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

// TODO: This should redirect to a user profile. Perhaps using res.redirect to the profile.
router.get('/users/me', auth, async (req, res) => {
	// View logged in user profile
	res.send(req.user);
});

// TODO: Redirect to the login page?
router.post('/users/me/logout', auth, async (req, res) => {
	// Log user out of the application
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token != req.token;
		});
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send(error);
	}
});

// TODO: Is this for admin/testing purposes or should this be the default logout function?
router.post('/users/me/logoutall', auth, async (req, res) => {
	// Log user out of all devices
	try {
		req.user.tokens.splice(0, req.user.tokens.length);
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
