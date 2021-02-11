import { Request, Response } from "express";
import { PostDAO } from './PostDAO';
import { Publisher } from "./Publisher";

export class PostController {
    postDAO: PostDAO;
    publisher: Publisher;

    TOPICS = ['unit-test', 'integ-test', 'e2e-test'];

    constructor() {
        this.postDAO = new PostDAO();
        this.publisher = new Publisher();
    }

    handlePostRequest(req: Request, res: Response) {
        const {
            body,
            params
        } = req;
        const topicName = params.topicName;
        if (this.topicExists(topicName)) {
            try {
                this.postDAO.savePost(topicName, body);
                this.publisher.publish(topicName, body);
                res.sendStatus(200);
            } catch (err) {
                res.sendStatus(500);
            }
        } else {
            res.status(400).send(`${topicName} does not exists`);
        }
    }

    topicExists(topicName: string) {
        return this.TOPICS.includes(topicName);
    }
}
