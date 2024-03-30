const Router = require('express').Router;
const router = new Router()
const { producer } = require('../messagnig/producer')
const Tickets = require('../models/tickets')

const jwt = require('jsonwebtoken')
// const {Kafka} = require('kafkajs')

// const kafka = new Kafka({brokers:['192.168.1.10:9092']})

// const producer = kafka.producer()



//authentication middleware 
const authenticate = async (req,res,next)=>{
const token = req.session.jwt 
if(!token) return res.status(401).send({message:'Not authorized'})
 jwt.verify(token,'sayeedsafvan',(err,user)=>{
  if(err)
  {
    return res.status(401).json({message:err})
  }else
  {
    req.user = user 
    next()
  }
})
}





//create a new product 

router.post('/',authenticate,async (req,res)=>{
          const {name,price,description} = await req.body 
          if(!name || !price || !description) 
          {
                    return res.status(400).json({
                              message: 'Provide name price and desc'
                    })
          }else{
          const ticket = await new Tickets({...req.body})
          await ticket.save()
          return res.status(201).json({
                    message:'Ticket created successfully',
                    ticket
          })
        }
})

router.get('/list', async (req, res) => {
  try {
    const tickets = await Tickets.find({});
    console.log(tickets)
    
    const ticketInfo = tickets.map(item => ({ id: item._id, name: item.name, artist: item.description }));
    console.log(ticketInfo);
    // Send the extracted information back to the client
    res.status(200).json(ticketInfo);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//buy a product 
router.post('/buy', authenticate, async (req, res) => {
  try {
      const { ticketIds } = req.body;
     
      console.log(ticketIds)
      const tickets = await Tickets.find({ _id: { $in: ticketIds } });
      console.log(tickets)
      const userId = req.user 
      console.log('user in buy',userId)

      // await producer.connect()
      // await producer.send({
      //   topic:'order-new',
      //   messages: [{ value: JSON.stringify(products) }] 
      // })

      // await producer.disconnect()
      const ticket = tickets.map(ticket => ({
        ...ticket.toObject(),
        userId: userId
      }));

      console.log('final',ticket)
      console.log('adding a text here')
     
      await producer('orders',JSON.stringify(ticket))
      res.send(`Ticket info sent to order`)
     
  } catch (error) {
      console.error('Error in /buy route:', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;