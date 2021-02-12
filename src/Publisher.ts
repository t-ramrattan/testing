import { PubSub } from "@google-cloud/pubsub";

export class Publisher {
    pubSub: PubSub;

    constructor(pubSub: PubSub) {
        this.pubSub = pubSub;
    }
    
    async publish(topicName: string, post: object) {
        await this.pubSub.topic(topicName).publish(Buffer.from(JSON.stringify(post)));
    }    
}
