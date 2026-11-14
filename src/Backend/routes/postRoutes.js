const express = require("express");

const router = express.Router();

const Post = require("../models/post");

// CREATE - Add new blog
router.post("/", async (req, res) => {

    try {

        const newPost = await Post.create(req.body);

        res.status(201).json(newPost);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});

// READ - Get all blogs
router.get("/", async (req, res) => {

    try {

        const posts = await Post.find();

        res.json(posts);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});

// UPDATE - Edit blog
router.put("/:id", async (req, res) => {

    try {

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json(updatedPost);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});

// DELETE - Remove blog
router.delete("/:id", async (req, res) => {

    try {

        const deletedPost = await Post.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json({ message: "Post deleted successfully" });

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

});

module.exports = router;