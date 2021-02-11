const { MongoClient } = require('mongodb');

export class PostDAO {
    DB_NAME = 'local';
    MONGO_URI = 'localhost:2271';
    
    async savePost(topicName: string, post: any) {
        const conn = await MongoClient.connect(this.MONGO_URI).db(this.DB_NAME).collection(topicName);
        await conn.save(post);
    };
};
