import { Publisher } from './Publisher';

let pubSub: any;
let publisher: Publisher;
let topic: jest.Mock;
let publish: jest.Mock;

describe('Publisher', () => {

    beforeEach(() => {
        publish = jest.fn();
        topic = jest.fn().mockImplementation(() => {
            return { publish }
        });
        pubSub = {
            topic
        }
        publisher = new Publisher(pubSub);
    });

    describe('publish', () => {
        it('should publish message to topic', async () => {
            const topicName = 'test';
            const post = { msg: 'hello'};
            await publisher.publish(topicName, post);
            expect(topic).toHaveBeenCalledWith(topicName);
            expect(publish).toHaveBeenCalledWith(Buffer.from(JSON.stringify(post)));
        });
    });

});
