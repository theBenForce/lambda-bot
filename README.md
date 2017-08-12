# lambda-bot
A wrapper to make API.AI webhooks on AWS Lambda.

Here's a simple example:

```javascript
const LambdaBot = require('lambda-bot');

const bot = LambdaBot();

bot.setAction('hello.world', (app) => {
    app.tell('Hello from AWS Lambda!');
});

exports.handler = bot.handler;
```