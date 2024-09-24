import mysql from "mysql2"
import path from "path";
import { env } from "../../../env";
import fs from "fs"


const connection = mysql.createConnection({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE
})

connection.connect((err) => {
    if (err) {
        console.error('Errom ao conectar: ' + err.stack);
        return;
    }
    console.log('Conectado como ID ' + connection.threadId);
    const migrationsDir = path.join(__dirname, 'migrations');
    fs.readdir(migrationsDir, (err, files) => {
        if (err) {
            console.error('Erro ao ler as migrações: ' + err);
            connection.end();
            return;
        }

        const migrationFiles = files.filter(file => file.endsWith('.ts'));
        Promise.all(migrationFiles.map(file => {
            const migration = require(path.join(migrationsDir, file));
            return migration.up(connection);
        }))
        .then(() => {
            console.log('Todas as migrações executadas com sucesso.');
            connection.end();
        })
        .catch(err => {
            console.error('Erro na migração: ' + err);
            connection.end();
        });
    });
});