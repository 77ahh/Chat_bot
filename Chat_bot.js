var restify = require('restify');
var builder = require('botbuilder');
var http = require('http');
var json = require('./config.json'); 

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('listening to %s', server.url);
});

var LUIS_url= json.LUIS_url;
var recognizer = new builder.LuisRecognizer(LUIS_url);

var connector = new builder.ChatConnector({
    appId: json.APP_ID,
    appPassword: json.APP_Password,
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, [
    //...Default dialog waterfall steps...
    function (session) {
        if (!session.userData.greeting) {
            session.send(json.message.greeting);
            session.userData.greeting = true;
        }        
        builder.Prompts.choice(session, json.message.promptChoice , json.services,{ listStyle: 3 }); 
        session.send(json.message.promptInput);
    },
    function (session, results) {
        var serv = json.services[results.response.entity];
        session.send(json.message.choiceResponse , serv); 
        session.endDialog();
    }    
    ]);

bot.recognizer(recognizer);

bot.dialog("wf1", [
    function (session) {
        session.send(json.waterfalls.wf1.response1);
    },
    function (session, results) {

    },
    function (session, results) {

    },
    function (session, results) {

    },        
    function (session, results) {
        session.endDialog();
    }  
    
])
.triggerAction({
    matches: json.waterfalls.wf1.name
});

bot.dialog("wf2", [
    function (session) {
        session.send(json.waterfalls.wf2.response1);
    },
    function (session, results) {

    },
    function (session, results) {

    },
    function (session, results) {

    },        
    function (session, results) {
        session.endDialog();
    }  
    
])
.triggerAction({
    matches: json.waterfalls.wf2.name
});

bot.dialog("wf3", [
    function (session) {
        session.send(json.waterfalls.wf3.response1);
    },
    function (session, results) {

    },
    function (session, results) {

    },
    function (session, results) {

    },        
    function (session, results) {
        session.endDialog();
    }  
    
])
.triggerAction({
    matches: json.waterfalls.wf3.name
});

bot.dialog("wf4", [
    function (session) {
        session.send(json.waterfalls.wf4.response1);
    },
    function (session, results) {

    },
    function (session, results) {

    },
    function (session, results) {

    },        
    function (session, results) {
        session.endDialog();
    }  
    
])
.triggerAction({
    matches: json.waterfalls.wf4.name
});

bot.dialog("wf5", [
    function (session) {
        session.send(json.waterfalls.wf5.response1);
    },
    function (session, results) {

    },
    function (session, results) {

    },
    function (session, results) {

    },        
    function (session, results) {
        session.endDialog();
    }  
    
])
.triggerAction({
    matches: json.waterfalls.wf5.name
});


/* 1.Normalize framework;
    Deployment(Interface)
    General function
    Format of config
    Integrate LUIS API
    Retrain& re-config
    
   2.Demo case
    Question list
    Configuration(Q&A)
    Customization guide
    
*/



