import mysql from "mysql2"
import { env } from "../../env"

const MYSQL = mysql.createPool({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})


MYSQL.on('connection', () => {
  console.log("MySQL conectado");
});

MYSQL.on('error', (error) => {
  console.error("Erro na conexão MySQL:", error);
});

async function checkConnection() {
  try {
     MYSQL.query('SELECT 1', (err, rows) => {
       console.log("Conexão com MySQL verificada:", rows);
     });
  } catch (error) {
    console.error("Erro ao verificar conexão MySQL:", error);
  }
}

checkConnection();
export default MYSQL