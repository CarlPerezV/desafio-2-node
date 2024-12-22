import cors from 'cors'
import express from 'express'

import postRoute from "./routes/post.route.js";

const app = express()

// middleware
app.use(cors());
app.use(express.json())
app.use("/posts", postRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto:${PORT}`)
})

