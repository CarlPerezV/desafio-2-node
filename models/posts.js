import { pool } from '../database/connection.js'

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    return rows
}

const findById = async (id) => {
    const query = "SELECT * FROM posts WHERE id = $1"
    const { rows } = await pool.query(query, [id])
    return rows[0]
}

const create = async (post) => {
    const query = "INSERT INTO posts (titulo, img, descripcion) VALUES ($1,$2,$3) RETURNING *"
    const { rows } = await pool.query(query, [post.titulo, post.img, post.descripcion])
    return rows[0]
}

export const postsModel = {
    findAll,
    findById,
    create,
}