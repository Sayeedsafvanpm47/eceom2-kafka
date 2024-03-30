const {Kafka} = require('kafkajs')
const kafka = new Kafka({clientId:'ecom-app',brokers:['192.168.1.10:9092']})
console.log('Client in auth modified')
module.exports = {kafka}

