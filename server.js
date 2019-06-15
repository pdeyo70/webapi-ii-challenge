const express = require('express');

const db = require('./data/db.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Blog API</h>
    <p>Welcome to the Lambda Blog API</p>
 `);
});

server.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the posts',
        });
    }
});


module.exports = server;