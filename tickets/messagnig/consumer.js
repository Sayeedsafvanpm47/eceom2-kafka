const {kafka} = require('./client')


async function consumer(group, topic, messageHandler) {
    const consumer = kafka.consumer({ groupId: group });

    try {
        await consumer.connect();
        console.log('Consumer connected successfully!');
        console.log('added a new thing')

        await consumer.subscribe({ topic: topic, fromBeginning: true });
        console.log('Subscribed to topic:', topic);

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const msg = JSON.parse(message.value.toString('utf-8'));
                    console.log('Received message:', msg);
                    await messageHandler(msg);
                } catch (error) {
                    console.error('Error processing messages:', error);
                }
            }
        });
    } catch (error) {
        console.error('Error connecting or subscribing:', error);
    }
}

module.exports = { consumer };
