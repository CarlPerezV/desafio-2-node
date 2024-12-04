import express from 'express'
import { postsModel } from './models/posts.js'
import cors from 'cors'

const app = express()

app.use(cors());

const PORT = process.env.PORT || 3000

// middleware
app.use(express.json())

app.get("/posts", async (req, res) => {
    try {
        const posts = await postsModel.findAll()
        return res.json(posts)
    } catch (error) {

        return res.status(500).json({ message: "Error del servidor" })
    }
})

app.get("/posts/:id", async (req, res) => {
    const id = req.params.id

    try {
        const post = await postsModel.findById(id)
        if (!post) {
            res.status(404).json({ message: "No encontrado" })
        }
        res.json(post)
    } catch (error) {

        return res.status(500).json({ message: "Error del servidor" })
    }
})


app.post("/posts", async (req, res) => {
    const { titulo, imgSrc, descripcion } = req.body;

    if (!titulo || !imgSrc || !descripcion) {
        return res.status(400).json({ message: "Datos requeridos" })
    }


    const newPost = {
        titulo,
        img: imgSrc,
        descripcion
    }
    try {
        const post = await postsModel.create(newPost)
        return res.json(post)
    } catch (error) {

        return res.status(500).json({ message: "Error del servidor" })
    }
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto:${PORT}`)
})

