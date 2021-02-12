jest.mock('./PostDAO');
jest.mock('./Publisher');
jest.mock('mongodb')

import { PostDAO } from './PostDAO';
import { Publisher } from './Publisher';
import { PostController } from './PostController';

let dao: PostDAO;
let publisher: Publisher;
let postController: PostController;

describe('PostController', () => {

    beforeEach(() => {
        dao = new PostDAO({});
        publisher = new Publisher({} as any);
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
        it('should save post to database and publish to topic when topic exists', async () => {
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
            const sendStatus = jest.fn();
            const response = { sendStatus };
            await postController.handlePostRequest(request as any, response as any);
            expect(publisher.publish).toHaveBeenLastCalledWith(topicName, post);
            expect(dao.savePost).toHaveBeenLastCalledWith(topicName, post);
            expect(sendStatus).toHaveBeenCalledWith(200);
        });

        it('should return status 400 if topic does not exist', async () => {
            const topicName = 'not-in-list';
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
            const send = jest.fn();
            const status = jest.fn().mockImplementation(() => {
                return { send }
            });
            const response = { status };
            await postController.handlePostRequest(request as any, response as any);
            expect(status).toHaveBeenCalledWith(400);
            expect(publisher.publish).toHaveBeenCalledTimes(0);
            expect(dao.savePost).toHaveBeenCalledTimes(0);
        });

        it('should return status 500 save to dao fails', async () => {
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
            };
            (dao.savePost as jest.Mock).mockImplementation(() => {
                throw new Error();
            });
            const sendStatus = jest.fn();
            const response = { sendStatus };
            await postController.handlePostRequest(request as any, response as any);
            expect(sendStatus).toHaveBeenCalledWith(500);
        });
    });

});
