const {Kafka} = require('kafkajs')
const kafka = new Kafka({clientId:'ecom-app',brokers:['192.168.1.10:9092']})
module.exports = {kafka}

