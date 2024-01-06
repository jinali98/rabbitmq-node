const express = require("express");
const amqp = require("amqplib");
const app = express();

const amqpURL = "amqp://localhost:5672";

const orderData = {
  orderId: 2,
  customerId: 2,
  mobileNumber: "0761595357",
};

app.get("/", async (req, res) => {
  try {
    const connection = await amqp.connect(amqpURL);
    const channel = await connection.createChannel();
    await channel.assertQueue("order.shipped");
    await channel.sendToQueue(
      "order.shipped",
      Buffer.from(JSON.stringify(orderData))
    );
    res.send("ORDERS API");
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log("ORDERS API listening on port 8000");
});
