jest.mock('./PostDAO');
jest.mock('./Publisher');

import { PostDAO } from './PostDAO';
import { Publisher } from './Publisher';
import { PostController } from './PostController';

let dao: PostDAO;
let publisher: Publisher;
let postController: PostController;

describe('PostController', () => {

    beforeEach(() => {
        dao = new PostDAO();
        publisher = new Publisher();
        postController = new PostController(dao, publisher);
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
        it('should save post to database', async () => {
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
