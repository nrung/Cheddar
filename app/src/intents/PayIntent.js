var http = require('http');
var appData = require('../intents/accountinfo.json');
var _ = require('lodash');

module.exports = {
    execute: function (intent, session, response) {

        var payee = intent.slots.payee.value;
        var payee_id = _.find(appData.friends, function (o) {
            console.log(payee);
            return o.name.toLowerCase() == payee
        })._id;

        var process = function (data) {

            var str = '';

            data.on('data', function (chunk) {
                str += chunk;
            });

            data.on('end', function () {
                var payee = intent.slots.payee.value.toLowerCase();
                var amt = intent.slots.amount.value;
                var obj = _.find(JSON.parse(str), function (o) {
                    return o.type.toLowerCase() == "checking"
                });


                var req = http.request({
                    host: 'api.reimaginebanking.com',
                    path: '/accounts/' + appData.user_id + '/transfers?key=' + appData.apikey,
                    port: 80,
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'}
                }, function (data) {

                });

                req.write(JSON.stringify({
                    "medium": "balance",
                    "payer_id": appData.user_checking,
                    "payee_id": obj._id,
                    "status": "completed",
                    "type": "p2p",
                    "amount": amt,
                    "transaction_date": "2016-09-18",
                    "description": "P2P Payment from Cheddar App"
                }));

                req.end();

                var text = "You sent " + amt + "dollars to " + payee;
                var cardText = "$" + amt + " sent to " + payee;
                var heading = "Money Sent!";

                response.tellWithCard(text, heading, cardText);
            });
        };

        var options = {
            host: 'api.reimaginebanking.com',
            path: '/customers/' + payee_id + '/accounts?key=' + appData.apikey,
            method: 'get'
        };

        http.get(options, process).end();
    }
};