const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        // log error to database
        console.log(error, " Query: ", req.query );
        res.status(500).json({
            message: 'Error retrieving the posts',
        });
    }
});

module.exports = router;