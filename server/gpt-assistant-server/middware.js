var httpsAgent = new proxyer.HttpsProxyAgent('http://localhost:7890');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    httpAgent:httpsAgent
});

module.exports = openai;