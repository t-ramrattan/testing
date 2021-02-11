A Simple API that recieves a messages and publishes it to PUB/SUB topics.

Software Life Cycle:
1. Gather requirements
- We want a notification system where users can post messages to a topic. And users subscribed to that topic will receive notifications when messages are published to the topic.
- If a user tries to post to a topic that doesn't exist we need to let the user know.
- Append message to log
2. 