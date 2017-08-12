
const express = require('express');
const bodyParser = require('body-parser');
const serverlessExpress = require('aws-serverless-express');
const ApiAiApp = require('actions-on-google').ApiAiApp;

const lambdaBot = function() {
    var obj = Object.create(lambdaBot.prototype);

    obj.app = express();
    obj.app.use(bodyParser.urlencoded({extended: false}));
    obj.app.use(bodyParser.json());

    obj.actionsMap = new Map();

    obj.app.post('/', obj.runApp.bind(obj));

    obj.server = serverlessExpress.createServer(obj.app);

    return obj;
}

lambdaBot.prototype.setAction = (action, handler) => 
    this.actionsMap.set(action, handler);

lambdaBot.prototype.runApp = (request, response) => {
    var app = new ApiAiApp({request, response});
    app.handleRequest(this.actionsMap);
};

lambdaBot.prototype.handler = (event, context) => 
    serverlessExpress.proxy(this.server, event, context);

module.exports = lambdaBot;