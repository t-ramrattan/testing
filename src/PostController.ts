import { Request, Response } from "express";
const { MongoClient } = require('mongodb');
const { PubSub } = require('@google-cloud/pubsub');

export class PostController {
    PROJECT_ID = process.env.PROJECT_ID;
    TOPICS = ['unit-test', 'integ-test','e2e-test'];
    DB_NAME = 'local';
    MONGO_URI = 'localhost:2271';

    handlePostRequest(req: Request, res: Response) {
        const {
            body,
            params
        } = req;
        const topicName = params.topicName;
        try {
            this.savePost(topicName, body);
            this.publish(topicName, body);
            res.sendStatus(200);
        } catch(err) {
            res.sendStatus(500);
        }
    }

    topicExists(topicName: string){
        return this.TOPICS.includes(topicName);
    }
    
    async savePost(topicName: string, post: any){
        const conn = await MongoClient.connect(this.MONGO_URI).db(this.DB_NAME).collection(topicName);
        await conn.save(post);
    };
    
    async publish(topicName: string, post: string){
        const client = new PubSub({ projectId: this.PROJECT_ID});
        await client.topic(topicName).publish(Buffer.from(JSON.stringify(post)));
    }

}
