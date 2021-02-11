const { PubSub } = require('@google-cloud/pubsub');

export class Publisher {
    PROJECT_ID = process.env.PROJECT_ID;
    
    async publish(topicName: string, post: string) {
        const client = new PubSub({ projectId: this.PROJECT_ID });
        await client.topic(topicName).publish(Buffer.from(JSON.stringify(post)));
    }    
}