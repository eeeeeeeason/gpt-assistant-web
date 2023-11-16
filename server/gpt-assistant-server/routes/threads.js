var express = require('express');
var router = express.Router();
var openaiInstance = require('../middware');

/* 创建线程 */
router.post('/create', async function(req, res, next) {
    const emptyThread = await openaiInstance.beta.threads.create();
    res.send(emptyThread);
})

/* 从线程创建信息 */
router.post('/createFromMessage', async function(req, res, next) {
    const message = await openai.beta.threads.messages.create(
        req.body.threadid,
        {
            role: "user",
            content: req.body.content // "I need to solve the equation `3x + 11 = 14`. Can you help me?"
        }
    );
    res.send(message)
})

/* 从线程创建run */
router.post('/createFromRun', async function(req, res, next) {
    const run = await openai.beta.threads.runs.create(
        req.body.threadid,
        { 
            assistant_id: req.body.assistantid,
            instructions: req.body.instructions //"Please address the user as Jane Doe. The user has a premium account."
        }
    );
    res.send(run)
})

/* 获取线程run状态 */
router.get('/getRunStatus', async function(req, res, next) {
    const runres = await openai.beta.threads.runs.retrieve(
        req.query.threadid,
        req.query.runid
    );
    res.send(runres);
})

/* 获取线程消息列表 */
router.get('/getMessageList', async function(req, res, next) {
    const threadMessages = await openai.beta.threads.messages.list(
        req.query.threadid
    );
    res.send(threadMessages.data);
})


module.exports = router;
