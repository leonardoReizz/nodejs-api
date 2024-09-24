import mysql from "mysql2"

function up(connection: mysql.Connection)  {
	return new Promise((resolve, reject) => {
		const sql = `
			CREATE TABLE IF NOT EXISTS users (
				id INT AUTO_INCREMENT PRIMARY KEY,
				email VARCHAR(255) NOT NULL UNIQUE,
				first_name VARCHAR(255) NOT NULL,
				last_name VARCHAR(255) NOT NULL,
				hashed_password VARCHAR(255) NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
			)
		`;
		connection.query(sql, (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
}

function down(connection: mysql.Connection) {
	return new Promise((resolve, reject) => {
		const sql = 'DROP TABLE IF EXISTS users';
		connection.query(sql, (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
}


export {down, up}