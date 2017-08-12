
const express = require('express');
const bodyParser = require('body-parser');
const serverlessExpress = require('aws-serverless-express');
const ApiAiApp = require('actions-on-google').ApiAiApp;

class LambdaBot {
    constructor() {
        this.actionsMap = new Map();

        this.app = express();
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());

        this.app.post('/', (req, res) => this._runApp(req, res));

        this.server = serverlessExpress.createServer(this.app);
    }

    setAction(action, handler) {
        this.actionsMap.set(action, handler);
    }

    _runApp(request, response) {
        var app = new ApiAiApp({request, response});
        app.handleRequest(this.actionsMap);
    }

    handler(event, context) {
        serverlessExpress.proxy(this.server, event, context);
    }
}

module.exports = LambdaBot;
