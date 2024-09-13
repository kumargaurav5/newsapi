import { Queue, Worker } from "bullmq";
import { defaultQueueConfig, redisConnection } from "../config/queue.js";
import { sendEmail } from "../config/mailer.js";


export const emailQueueName = "email-queue"
export const emailQueue = new Queue(emailQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueConfig
})

export const handler = new Worker(emailQueueName, async (job) => {
    sendEmail(job.data.toEmail, job.data.subject, job.data.body)
    console.log("the email worker ", job.data)
}, { connection: redisConnection })

handler.on("completed", (job) => {
    console.log(`the job ${job.id} is completed`)
})

handler.on("failed", (job) => {
    console.log(`the job ${job.id} is completed`)
})