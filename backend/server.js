import http from "http";
import app from "./app.js";
import redis from 'redis'
import connect from './utils/db.js';
import dotenv from 'dotenv'



// configurations
dotenv.config()
const server = http.createServer(app);
const port = process.env.PORT || 3080; // Changed default port to 3080


// connection to reddis
const redisClient = redis.createClient({
    url: 'redis://172.23.217.76:6379'
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
};


// connecting to database
const connectionString = process.env.MONGO_URL || "mongodb://localhost:27017/darkBlog";


// Attempt to start the server
const startServer = () => {
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        connect(connectionString)
        connectRedis();
    });
};

server.on('error', (error) => {
    if (error.code === 'EACCES') {
        console.error(`Port ${port} requires elevated privileges`);
    } else if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
    } else {
        console.error('An error occurred:', error);
    }
});

startServer();

export { redisClient };