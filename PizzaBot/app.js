// Create bot and add dialogs
var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
var model = 'https://api.projectoxford.ai/luis/v1/application?id=05e77449-7d73-446b-99a2-d3bf101ef87d&subscription-key='+ process.env.LUIS_KEY
var dialog = new builder.LuisDialog(model);
var bot = new builder.BotConnectorBot();
bot.add('/', dialog);

dialog.on('Greeting', [
    function(session, args, next){
        // prompt user to order pizza  
        //console.log(session.message.text)     
        session.send("Hi, can I take your order?");
    },
])

dialog.on('OrderPizza', [
    function(session, args, next){
        // initialize empty array that will be passed on until end that holds conversations
        var conversations = [];
        conversations.push();
        conversations.push({text:"Hi, can I take your order?", time: new Date().toLocaleString()})
        conversations.push(session.message.text);
        conversations.push({text:session.message.text, time: new Date().toLocaleString()});
        conversations.push({text:"Where would you like it delivered?", time: new Date().toLocaleString()});
        // get the size
        var size = builder.EntityRecognizer.findEntity(args.entities, 'Size');
        // get the toppings
        var toppings = builder.EntityRecognizer.findAllEntities(args.entities, 'Topping');
        // store conversations
        session.dialogData.conversations = conversations;
        // store size
        session.dialogData.size = size.entity;
        // store toppings
        session.dialogData.toppings = toppings.map(function(topping){return topping.entity});
        // store the pizza order
        var pizzas = [];
        session.dialogData.pizzas = pizzas; 
        var orders = [];
        session.dialogData.orders = orders;
        // prompt user for address
        builder.Prompts.text(session, "Where would you like it delivered?");
        
    },
    function(session, results, next){
        // store the address
        session.dialogData.address = results.response;
        session.dialogData.conversations.push({text: session.dialogData.address, time: new Date().toLocaleString()});
        next();
    },
    function(session, results, next){
       var time = new Date().toLocaleString();
       session.dialogData.pizzas.push({size:session.dialogData.size, toppings:session.dialogData.toppings});
       session.dialogData.orders.push({time: time, pizzas:JSON.stringify(session.dialogData.pizzas), price:15, address:session.dialogData.address, status:'confirmed'});
       next();
    },
    
    function(session, results){
        console.log(session.dialogData.conversations);
        session.endDialog("Thank you! Your order has been placed");
        // TODO: 7 HTTP post request to rest server that can be queried by react side 
    }
]);




server.use(bot.verifyBotFramework({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET }));
server.post('/api/messages', bot.listen());

server.listen(8080, function () {
    console.log('%s listening to %s', server.name, server.url); 
});