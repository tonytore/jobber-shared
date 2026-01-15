import env from "dotenv";
env.config();


const appConfig = {
    BABEL_ENV: process.env.BABEL_ENV,
    
}

export default appConfig;
