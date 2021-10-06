const express = require('express');
const connection = require('./database');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json({ extended: true }));

app.get('/', function (req, res) {
	let sql = 'SELECT * FROM users';
	connection.query(sql, function (err, results) {
		if (err) throw err;
		res.send(results);
	});
});

app.get('/user/:id', function (req, res) {
	let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
	connection.query(sql, function (err, results) {
		if (err) throw err;
		res.send(results);
	});
});

app.get('/bio/:user_id', function (req, res) {
	let sql = `SELECT * FROM bios WHERE user_id = ${req.params.user_id}`;
	connection.query(sql, function (err, results) {
		if (err) throw err;
		res.send(results);
	});
});

app.post('/register', function (req, res) {
	let person = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
	};

	connection.query('INSERT INTO users SET ?', person, function (err, result) {
		if (err) throw err;
	});
});

app.post('/bio', function (req, res) {
	let bio = {
		title: req.body.title,
		company: req.body.company,
		website: req.body.website,
		bio: req.body.bio,
		skills: req.body.skills,
		youtube: req.body.youtube,
		twitter: req.body.twitter,
		linkedin: req.body.linkedin,
		github: req.body.github,
		user_id: req.body.user_id,
	};

	connection.query('INSERT INTO bios SET ?', bio, function (err, result) {
		if (err) throw err;
	});
});

app.post('/comment/:user_id', function (req, res) {
	let comment = {
		comment_text: req.body.comment_text,
		user_id: req.body.user_id,
	};

	connection.query(
		'INSERT INTO comments SET ?',
		comment,
		function (err, result) {
			if (err) throw err;
		}
	);
});

app.listen(3000, function () {
	console.log('App listening on port 3000');
	connection.connect(function (err) {
		if (err) throw err;
		console.log('Database connected!');
	});
});
