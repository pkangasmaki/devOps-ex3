//Subscribes for all messages within the network, therefore receiving from both my.o and my.i
//Stores the messages into a file

const amqp = require("amqplib")
fs = require('fs');

const filename = '../obse/data.txt'
const data = []

const delay = (ms,msg) => new Promise(res => {
  console.log(msg)
  setTimeout(res, ms)
})

setTimeout(connect, 30000);
async function connect() {

  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq3:5672')
    const channel = await connection.createChannel()

    console.log("Waiting for messages...")

    await channel.consume("my.o", message => {
      const date = new Date().toISOString()
      const messageInfo = `${date} Topic ${message.fields.routingKey}: ${message.content.toString()}`
      data.push(messageInfo)
      console.log(messageInfo)
      channel.ack(message)
    })

    await channel.consume("my.i", message => {
      const date = new Date().toISOString()
      const messageInfo = `${date} Topic ${message.fields.routingKey}: ${message.content.toString()}`
      data.push(messageInfo)
      console.log(messageInfo)
      channel.ack(message)
    })

    await delay(1000, 'writing to file').then(() => {
      fs.writeFile(filename, JSON.stringify(data), function (err) {
        if (err) return console.log(err);
      })
    })
    
    await delay(3000, 'closing connection').then(res => {
      connection.close()
      console.log('connection closed')
      process.exit(0)
    })
  }

  catch (err) {
    console.log(err)
  }


}