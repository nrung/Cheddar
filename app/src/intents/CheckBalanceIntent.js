var http = require('http');
var appData = require('../intents/accountinfo.json');
var _ = require('lodash');

module.exports = {
    execute: function (intent, session, response) {

        var process = function (data) {

            var accType = intent.slots.accountType.value;
            var str = '';

            data.on('data', function (chunk) {
                str += chunk;
            });

            data.on('end', function () {

                if (typeof accType == "undefined") {
                    accType = "checking";
                }

                var obj = _.find(JSON.parse(str), function (o) {
                    return o.type.toLowerCase() == accType.toLowerCase()
                });

                var text = "Your " + accType + " account balance is " + obj.balance;
                var cardText = "Your " + accType + " account balance: " + obj.balance;
                var heading = accType.substr(0, 1).toUpperCase() + accType.substr(1, 10) + " Balance";

                response.tellWithCard(text, heading, cardText);
            });

        };

        var options = {
            host: 'api.reimaginebanking.com',
            path: '/customers/' + appData.user_id + '/accounts?key=' + appData.apikey
        };

        http.request(options, process).end();
    }
};