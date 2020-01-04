export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
};
