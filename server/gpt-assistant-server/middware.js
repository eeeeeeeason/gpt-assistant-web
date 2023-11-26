var proxyer = require('https-proxy-agent');
var httpsAgent = new proxyer.HttpsProxyAgent('http://localhost:7890');
var OpenAI = require('openai');
// 读取.env文件
var dotenv = require('dotenv');
dotenv.config({ path: './.env' , override: true});
console.log( process.env.OPENAI_API_KEY," process.env.OPENAI_API_KEY");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    httpAgent:httpsAgent
});
console.log(openai);
module.exports = openai;