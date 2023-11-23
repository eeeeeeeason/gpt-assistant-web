var proxyer = require('https-proxy-agent');
var httpsAgent = new proxyer.HttpsProxyAgent('http://localhost:7890');
var OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    httpAgent:httpsAgent
});

module.exports = openai;