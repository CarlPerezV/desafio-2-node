import pkg from 'pg';

const { Pool } = pkg;


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'likeme',
    allowExitOnIdle: true
})

const getDate = async () => {
    const result = await pool.query("SELECT NOW()")
    console.log(result)
}

const getImagenes = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}

getImagenes()