import { postsModel } from "../models/post.model.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await postsModel.findAll()
        return res.json(posts)
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las películas" })
    }
}

export const createPost = async (req, res) => {
    const { titulo, imgSrc, descripcion } = req.body;

    if (!titulo || !imgSrc || !descripcion) {
        return res.status(400).json({ message: "Datos requeridos" })
    }

    try {
        const newPost = {
            titulo, img: imgSrc, descripcion
        }
        await postsModel.createPost(newPost)
        res.status(201).json({ message: "Post creado correctamente" })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await postsModel.updatePost(id)
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" })
        }
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el post" })
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    try {
        const result = await postsModel.deletePost(id)
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Post no encontrado" })
        }
        res.status(204).json({ message: "Post eliminado correctamente", post: result.rows[0] })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el post" })
    }
};

