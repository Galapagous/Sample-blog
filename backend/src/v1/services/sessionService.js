import redis from 'redis'


const redisClient = redis.createClient({host: '127.0.0.1'})
class Session{
    
}


export default new redisClient