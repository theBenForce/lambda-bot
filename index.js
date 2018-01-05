
const express = require('express');
const bodyParser = require('body-parser');
const serverlessExpress = require('aws-serverless-express');
const DialogflowApp = require('actions-on-google').DialogflowApp;

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
        var app = new DialogflowApp({request, response});
        app.handleRequest(this.actionsMap);
    }

    handler() {
        var server = this.server;
        return function(event, context) {
            serverlessExpress.proxy(server, event, context);
        }
    }
}

module.exports = LambdaBot;
