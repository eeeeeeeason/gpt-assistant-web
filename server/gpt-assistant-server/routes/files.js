var express = require('express');
var router = express.Router();
var openaiInstance = require('../middware');

/* 上传file */
router.post('/upload', async function(req, res, next) {
  const file = await openaiInstance.files.create({
    purpose: "fine-tune",
    file: req.body.file,
  });
  res.send(file);
})

/* 绑定file到assistant */
router.post('/fileBindAssistant', async function(req, res, next) {
  const assistant = await openaiInstance.beta.assistants.files.create(
    req.body.assistantid,
    {
        fileid: req.body.fileid,
    }
  );
  res.send(assistant);
})


module.exports = router;
