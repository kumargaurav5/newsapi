import redis from "express-redis-cache"

const redisCache = redis({
    port: 6379,
    host: "localhost",
    prefix: "backend",
    expire: 60 *2
})

export default redisCache