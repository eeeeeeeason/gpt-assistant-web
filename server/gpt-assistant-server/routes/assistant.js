var express = require('express');
var router = express.Router();
var openaiInstance = require('../middware');

/* 创建我的assistant */
router.post('/create', async function(req, res, next) {
  const assistant = await openaiInstance.beta.assistants.create({
    name: req.body.name,
    instructions: req.body.instructions,
    tools: [{ type: "retrieval" }],
    model: req.body.model
  });
  res.send(assistant);
})

/* 获取我创建好的assistant列表 */
router.get('/getList', async function(req, res, next) {
  const myAssistants = await openaiInstance.beta.assistants.list({
    order: "desc",
    limit: "20",
  });
  res.send(myAssistants);
})

/* 获取assistant详情 */
router.get('/getDetail', async function(req, res, next) {
  console.log(req.query.id,"req.query.id");
  const assistant = await openaiInstance.beta.assistants.retrieve(
    req.query.id
  );
  res.send(assistant);
})


module.exports = router;
