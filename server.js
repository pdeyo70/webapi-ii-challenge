const express = require('express');
let router = express.Router();

const postsRouter = require('./data/seeds/01-posts.js');
const commentsRouter = require('./data/seeds/02-comments.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);
server.use('/api/comments', commentsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Blog API</h>
    <p>Welcome to the Lambda Blog API</p>
 `);
});


module.exports = router;