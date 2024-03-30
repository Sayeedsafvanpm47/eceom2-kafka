
const { Router } = require('express');
const Order = require('../models/orders');
const {consumer} = require('../messagnig/consumer')

const router = Router();

// const kafka = new Kafka({ brokers: ['192.168.1.10:9092'] });
// const consumer = kafka.consumer({ groupId: 'orders-group' });


let order;

let createOrder = async (info) => {
    console.log('info inside',info)
    if(info){
    let total = 0;
   info.forEach((ticket) => {
        total += ticket.price;
    });
    order = new Order({
        products:info,
        total,
        
    });
    order.save();
    return order;
}else
{
    return false 
}
};
 async function handleMessage(message) {
    // Example: Log the message content
    console.log('Received message in route:', message);
    return await createOrder(message)

    // Example: Process the message further (insert into database, trigger an action, etc.)
    // Insert logic here based on your application's requirements
}

consumer('orders-group','orders',handleMessage)
//  createOrder(products.length?products:[])
//  console.log('products in consumer',products)
// const run = async () => {
//     console.log('Connecting to Kafka...');
//     try {
//         await consumer.connect();
//         await consumer.subscribe({ topic: 'order-new', fromBeginning: true });
//         await consumer.run({
//             eachMessage: async ({ message }) => {
//                 const products = JSON.parse(message.value);
//                 console.log(products, 'log of product');
//                 createOrder(products);
//             }
//         });
//         console.log('Connected to Kafka.');
//     } catch (error) {
//         console.error('Error connecting to Kafka:', error);
//     }
// };
// run().catch((err)=>console.log(err))


router.get('/',async(req,res)=>{
    let orders = await Order.find({})
    const ticketInfo = tickets.map(item => ({ id: item._id, name: item.name, artist: item.description }));
})

module.exports = { router };
