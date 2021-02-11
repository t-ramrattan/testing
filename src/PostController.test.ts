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

});
