const express = require('express');

const Posts = require('../data/db.js');
const Comments = require('../data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        // log error to database
        res.status(500).json({
            error: "The posts information could not be retrieved.",
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    }
    catch {
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        const comments = await Posts.findPostComments(req.params.id);
        console.log(req.params.id);
        if (post) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    }
    catch {
        res.status(500).json({ error: "The comments information could not be retrieved." });
    }
})

router.post('/', async (req, res) => {
    try {
        const post = await Posts.insert(req.body);
        const postInfo = req.body;
        console.log(postInfo);
        if ((postInfo.title == '' || postInfo.title == null) || (postInfo.contents == '' || postInfo.contents == null)) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(201).json(postInfo.title + '--' + postInfo.contents)
        } 
    }
    catch {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})

router.post('/:id/comments', async (req, res) => {
    console.log(req.body)
    try {
        const comment = await Comments('comments').insertComment(req.body);
        console.log(comment);
        if (!req.params.id) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else if (comment == '' || comment == null) {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        } else {
            res.status(201).json(comment.text)
        }
    }
    catch {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    }
})

module.exports = router;
