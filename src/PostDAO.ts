const { MongoClient } = require('mongodb');

export class PostDAO {
    mongoClient: typeof MongoClient;
    collection: any;

    constructor(mongoClient: typeof MongoClient) {
        this.mongoClient = mongoClient;
    }

    async savePost(topicName: string, post: any) {
        await this.mongoClient.collection(topicName).save(post);
    };

};
