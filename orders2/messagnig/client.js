const {Kafka} = require('kafkajs')
const kafka = new Kafka({clientId:'ecom-app',brokers:['192.168.1.10:9092']})
console.log('This is client')
module.exports = {kafka}

