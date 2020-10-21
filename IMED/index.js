//Subscribes for messages from my.o

const amqp = require("amqplib")

const delay = (ms, msg) => new Promise(res => {
  if(msg) console.log(msg)
  setTimeout(res, ms)
})

setTimeout(connect, 25000);
async function connect() {

  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq3:5672')
    const channel = await connection.createChannel()
    await channel.assertQueue("my.i")

    console.log("Waiting for messages...")

    //Subscripe messages from my.o
    await channel.consume("my.o", (message) => {
      console.log(`Got "${message.content.toString()}” to topic ${message.fields.routingKey}`)
      //channel.ack(message)
    })

    //Publish message to my.i
    const msg = "MSG_4"
    await delay(3000, 'sending message')
      .then(() => {
        channel.sendToQueue("my.i", Buffer.from(msg))
        console.log(msg)
      })
    
    await delay(3000, 'closing connection').then(() => {
      connection.close()
      console.log('connection closed')
      process.exit(0)
    })
  }

  catch (err) {
    console.log(err)
  }


}