import { pool } from '../database/connection.js'

const findAll = async () => {
    return (await pool.query("SELECT * FROM posts ORDER BY id")).rows

}

const findById = async (id) => {
    return (await pool.query("SELECT * FROM posts WHERE id = $1", [id])).rows[0];
}

const createPost = async (post) => {
    return (await pool.query("INSERT INTO posts (titulo, img, descripcion) VALUES ($1,$2,$3) RETURNING *", [post.titulo, post.img, post.descripcion])).rows[0]
}

const updatePost = async (id) => {
    return (await pool.query('UPDATE posts SET likes = COALESCE(likes,0) + 1 WHERE id = $1 RETURNING id, titulo, likes', [id])).rows[0]
}

const deletePost = async (id) => {
    return await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id])

}

export const postsModel = {
    findAll,
    findById,
    createPost,
    updatePost,
    deletePost
}