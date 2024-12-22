import { Router } from "express";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.put("/like/:id", updatePost);
router.delete("/:id", deletePost);

export default router;