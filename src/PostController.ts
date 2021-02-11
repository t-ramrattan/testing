import { Request, Response } from "express";
import { PostDAO } from './PostDAO';
const { PubSub } = require('@google-cloud/pubsub');


export class PostController {
    postDAO: PostDAO;
    PROJECT_ID = process.env.PROJECT_ID;
    TOPICS = ['unit-test', 'integ-test', 'e2e-test'];

    constructor() {
        this.postDAO = new PostDAO();
    }

    handlePostRequest(req: Request, res: Response) {
        const {
            body,
            params
        } = req;
        const topicName = params.topicName;
        try {
            this.postDAO.savePost(topicName, body);
            this.publish(topicName, body);
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(500);
        }
    }

    topicExists(topicName: string) {
        return this.TOPICS.includes(topicName);
    }

    async publish(topicName: string, post: string) {
        const client = new PubSub({ projectId: this.PROJECT_ID });
        await client.topic(topicName).publish(Buffer.from(JSON.stringify(post)));
    }

}
