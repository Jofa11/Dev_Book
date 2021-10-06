var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

var connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

// connection.connect((err) => {
// 	if (!err) {
// 		console.log('Connected to database');
// 	}
// 	return err;
// });
// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
// 	if (err) throw err;

// 	console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

module.exports = connection;