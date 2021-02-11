const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const { PubSub } = require('@google-cloud/pubsub');
const { PostController } = require('./lib/PostController');

const app = require('express')();
const PORT = 8080;

const controller = new PostController();

app.use(bodyParser.json());

app.post('/topic/:topicName', controller.haldePostRequest);

app.listen(PORT, () => {
    console.log(`sever started on port ${PORT}`);
});
