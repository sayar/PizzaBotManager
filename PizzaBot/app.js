// Create bot and add dialogs
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

var server = restify.createServer();
var model = 'https://api.projectoxford.ai/luis/v1/application?id=05e77449-7d73-446b-99a2-d3bf101ef87d&subscription-key='+ process.env.LUIS_KEY
var dialog = new builder.LuisDialog(model);
var bot = new builder.BotConnectorBot();
bot.add('/', dialog);

dialog.on('Greeting', [
    function(session, args, next){
        // prompt user to order pizza    
        session.send("Hi, can I take your order?");
    },
])

dialog.on('OrderPizza', [
    function(session, args, next){
        // initialize empty array that will be passed on until end that holds conversations
        var conversations = [];
        conversations.push({who:"bot", text:"Hi, can I take your order?", time: new Date().toLocaleString()})
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
        var orders = {};
        session.dialogData.orders = orders;
        next();
    },
    function(session, results, next){
        // save order request user made
        session.dialogData.conversations.push({who:"human", text:session.message.text, time: new Date().toLocaleString()});
        next();
    },
    function(session, results, next){
        // prompt user for address
        session.dialogData.conversations.push({who:"bot", text:"Where would like it delivered", time: new Date().toLocaleString()});
        builder.Prompts.text(session, "Where would you like it delivered?");
        next();
    },
    function(session, results, next){
        // store the address
        session.dialogData.address = results.response;
        session.dialogData.conversations.push({who:"human", text: session.dialogData.address, time: new Date().toLocaleString()});
        next();
    },
    function(session, results, next){
       var time = new Date().toLocaleString();
       session.dialogData.pizzas.push({size:session.dialogData.size, toppings:session.dialogData.toppings});
       session.dialogData.orders.conversations = session.dialogData.conversations;
       session.dialogData.orders.pizzas = session.dialogData.pizzas;
       session.dialogData.orders.time = time;
       session.dialogData.orders.price = 15;
       session.dialogData.orders.address = session.dialogData.address;
       session.dialogData.orders.status = 'confirmed';
       next();
    },
    function(session, results, next){
      // store data in parse server
      var options = {
        method: 'post',
        body: {'order': session.dialogData.orders}, 
        json: true, 
        url: 'https://pizzaordersdb.azurewebsites.net/parse/classes/PizzaOrders',
        headers: {
            'X-Parse-Application-Id': process.env.PARSE_ID,
        }
      }
      request (options, function (err, res, body) {
        if (err) {
        console.log('Error :', err)
        return
        }
        console.log(' Body :', body);
        session.endDialog('Thank you for your order!');
        });
    },
]);


server.use(bot.verifyBotFramework({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET }));
server.post('/api/messages', bot.listen());

server.listen(8080||process.env.PORT, function () {
    console.log('%s listening to %s', server.name, server.url); 
});