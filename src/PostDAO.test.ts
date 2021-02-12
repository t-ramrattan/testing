import { PostDAO } from './PostDAO';

let dao: PostDAO;
let mongoClient: any;
let collection: any;
let save: any;

describe('PostDAO', () => {

    beforeEach(() => {
        save = jest.fn();
        collection = jest.fn().mockImplementation(() => {
            return { save }
        })
        mongoClient = {
            collection
        };
        dao = new PostDAO(mongoClient);
    });

    describe('savePost', () => {
        it('should save post to collection for topic', async () => {
            const topicName = 'test';
            const post = {msg: 'hello'};
            await dao.savePost(topicName, post);
            expect(collection).toHaveBeenCalledWith(topicName);
            expect(save).toHaveBeenCalledWith(post);
        });
    })
});
