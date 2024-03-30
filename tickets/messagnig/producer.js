const {kafka} = require('./client')
const produce = kafka.producer()
async function producer(topic,message)
{
         await produce.connect(topic,message)
         console.log('Producer connected successfully!')
         await produce.send({
          topic,messages:[{value:message}]
         })
         console.log('Message send finished successfully!')


}
module.exports = {producer}