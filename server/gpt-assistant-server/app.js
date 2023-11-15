var proxyer = require('https-proxy-agent');
console.log(proxyer);

var httpsAgent = new proxyer.HttpsProxyAgent('http://localhost:7890');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var  OpenAI = require('openai');
var app = express();

const http = require('http');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

dotenv.config({ path: './.env' , override: true});
console.log( process.env.OPENAI_API_KEY," process.env.OPENAI_API_KEY");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  httpAgent:httpsAgent
});

async function main() {
  // 这个请求被墙了，怎么使用我电脑的7890端口的代理
  
  const assistant = await openai.beta.assistants.create({
    name: "Math Tutor",
    instructions: "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [{ type: "retrieval" }],
    model: "gpt-4-1106-preview"
  });
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
    }
  );

  const run = await openai.beta.threads.runs.create(
    thread.id,
    { 
      assistant_id: assistant.id,
      instructions: "Please address the user as Jane Doe. The user has a premium account."
    }
  );

  const runres = await openai.beta.threads.runs.retrieve(
    thread.id,
    run.id
  );
  console.log(runres);

  const threadMessages = await openai.beta.threads.messages.list(
    thread.id
  );
  console.log(threadMessages.data);
}

main();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
