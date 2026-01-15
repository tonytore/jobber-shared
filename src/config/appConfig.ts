import env from "dotenv";
env.config();


const appConfig = {
    BABEL_ENV: process.env.BABEL_ENV,
    LOKI_URL: process.env.LOKI_URL,
    APP_NAME: process.env.APP_NAME,
    LOG_LEVEL: process.env.LOG_LEVEL,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    
}

export default appConfig;
