import { Request, Response } from "express";
import { PostController } from './PostController';

let postController: PostController;

describe('PostController', () => {

    beforeEach(() => {
        postController = new PostController();
    });

    describe('topicExists', () => {
        it('should return true if topics exists', () => {
            const topicName = 'unit-test';
            expect(postController.topicExists(topicName)).toBe(true);
        });

        it('should return false if topics does not exists', () => {
            const topicName = 'not-unit-test';
            expect(postController.topicExists(topicName)).toBe(false);
        });
    });

    describe('handlePostRequest', () => {
        it.only('should save post to database', async () => {
            const topicName = 'unit-test';
            const post = {
                msg: 'hello, world!!!',
                userId: 'abc123'
            };
            const request = {
                params: {
                    topicName
                },
                body: post
            }
            const response = {
                sendStatus: () => {}
            }
            await postController.handlePostRequest(request as any, response as any);
        });
    });

});
