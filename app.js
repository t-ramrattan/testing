const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const { PubSub } = require('@google-cloud/pubsub');
const { PostController } = require('./lib/PostController');
const { Publisher } = require('./src/Publisher');
const { PostDAO } = require('./src/PostDAO');

const app = require('express')();
const PORT = 8080;
const DB_NAME = 'local';
const MONGO_URI = 'localhost:2271';
const PROJECT_ID = 'testing';
const app = require('express')();
const PORT = 8080;

const dao = new PostDAO(await MongoClient.connect(MONGO_URI).db(DB_NAME));
const publisher = new Publisher(new PubSub(PROJECT_ID));
const controller = new PostController(dao, publisher);

app.use(bodyParser.json());

app.post('/topic/:topicName', controller.haldePostRequest);

app.listen(PORT, () => {
    console.log(`sever started on port ${PORT}`);
});
