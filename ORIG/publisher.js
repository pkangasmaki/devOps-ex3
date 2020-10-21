///Publishes messages to my.o

const amqp = require("amqplib")

const delay = ms => new Promise(res => { 
  setTimeout(res, ms)
})

setTimeout(connect, 15000);
async function connect() {

  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq3:5672')
    const channel = await connection.createChannel()
    await channel.assertQueue("my.o")

    const msg = "MSG_"

    let i= 1
    for (i; i < 4; i++) {
      await delay(3000)
      channel.sendToQueue("my.o", Buffer.from(`${msg}${i}`))
      console.log(`${msg}${i}`)
    }

    await delay(10).then(res => {
      connection.close()
      console.log('connection closed')
      process.exit(0)
    })
  }

  catch (err) {
    console.log(err)
  }
}