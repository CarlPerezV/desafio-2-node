import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg; // pkg contiene todo el módulo pg

dotenv.config()

// Conexion a la base de datos
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    allowExitOnIdle: true
})

try {
    await pool.query("SELECT NOW()")
    console.log("Database connected")

} catch (error) {
    console.log(error)
}