const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const { PubSub } = require('@google-cloud/pubsub');

const app = require('express')();
const PORT = 8080;
const DB_NAME = 'local';
const MONGO_URI = 'localhost:2271';
const PROJECT_ID = 'testing';
const TOPICS = ['unit-test', 'integ-test','e2e-test'];

const topicExists = (topicName) => {
    return TOPICS.includes(topicName);
}

const savePost = async (topicName, post) => {
    const conn = await MongoClient.connect(MONGO_URI).db(DB_NAME).collection(topicName);
    await conn.save(post);
};

const publish = async (topicName, post) => {
    const client = new PubSub({ projectId: PROJECT_ID});
    await client.topic(topicName).publish(Buffer.from(JSON.stringify(post)));
}

app.use(bodyParser.json());

app.post('/topic/:topicName', async (req, res) => {
    const {
        body,
        params = {}
    } = req;
    // get the topic
    const topicName = params.topicName;
    /**
     * Check topic name and body before saving and publishing
     */
    if (topicExists(topicName) && body) {
        await savePost(topicName, body);
        await publish(topicName, body);
    } else {
        res.status(400).send('invalid topic or post');
    }
});

app.listen(PORT, () => {
    console.log(`sever started on port ${PORT}`);
});
