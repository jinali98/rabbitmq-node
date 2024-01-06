const express = require("express");
const amqp = require("amqplib");

const app = express();
const amqpURL = "amqp://localhost:5672";

async function connect() {
  try {
    const connection = await amqp.connect(amqpURL);
    const channel = await connection.createChannel();
    await channel.assertQueue("order.shipped");

    channel.consume("order.shipped", (message) => {
      const orderData = message.content.toString();
      console.log(orderData);
      channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
}

connect();
app.get("/", (req, res) => {
  res.send("NOTIFCATIONS API");
});

app.listen(8001, () => {
  console.log("Listening on PORT 8001");
});
