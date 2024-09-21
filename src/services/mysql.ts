import mysql from "mysql"
import { env } from "../env"

const MYSQL = mysql.createConnection({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE
})

MYSQL.connect((error) => {
  if(error) {
    console.log("erro ao conectar no MYSQL", error)
    process.exit(1)
  } else {
    console.log("MYSQL connectado")
  }
})

export default MYSQL