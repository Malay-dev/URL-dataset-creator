import amqp from "amqplib";

const RABBIT_MQ_USER = process.env.RABBIT_MQ_USER;
const RABBIT_MQ_PASSWORD = process.env.RABBIT_MQ_PASSWORD;
const RABBTI_MQ_IP = process.env.RABBTI_MQ_IP || "rabbitmq";
const RABBTI_MQ_VHOST = process.env.RABBTI_MQ_VHOST || "wifihost";

const RABBIT_MQ_URL = `amqp://${RABBIT_MQ_USER}:${RABBIT_MQ_PASSWORD}@${RABBTI_MQ_IP}:5672/${RABBTI_MQ_VHOST}`;
const QUEUE_NAME = "log_queue";

let rabbit_mq_channel;
let start_time;
const retry_time_limit = 30000;

const connect_to_rabbit_mq = async () => {
  try {
    const rabbit_mq_conn = await amqp.connect(RABBIT_MQ_URL);
    rabbit_mq_channel = await rabbit_mq_conn.createChannel();
    await rabbit_mq_channel.assertQueue(QUEUE_NAME, { durable: false });
    console.log("[server]: Connected to rabbitMQ...");
    console.log("[server]: Waiting for log entries...");
    consume_from_queue();
    return rabbit_mq_channel;
  } catch (error) {
    if (!start_time) {
      start_time = Date.now();
    }
    let elapsedTime = Date.now() - start_time;
    if (elapsedTime > retry_time_limit) {
      console.error(`Failed to connect to RabbitMQ: ${error.message}`);
    }
    setTimeout(connect_to_rabbit_mq, 1000);
  }
};

const publish_to_queue = (log_entry) => {
  try {
    rabbit_mq_channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(JSON.stringify(log_entry))
    );
    console.log("Log entry added to Queue");
  } catch (error) {
    console.error(`Error publishing to the queue: ${error.message}`);
  }
};

const consume_from_queue = () => {
  try {
    rabbit_mq_channel.consume(
      QUEUE_NAME,
      async (message) => {
        const log_entry = JSON.parse(message.content.toString());
        console.log(log_entry);
        console.log("Processing log entry");
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(`Error consuming from queue: ${error.message}`);
  }
};

export { connect_to_rabbit_mq, publish_to_queue, consume_from_queue };
