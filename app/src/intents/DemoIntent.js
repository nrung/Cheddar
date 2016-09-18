module.exports = {
    execute: function (intent, session, response) {

        var text = "Hello everyone. My name is Alexa and this is Nick. Over the past 36 hours we have together created a " +
            "revolutionary new payment app called Cheddar. Don't ask. I didn't choose the name. It uses a combination of " +
            "both my own API and the Nessie API by Capital One... Using this application users can check the balance of several of their " +
            "accounts. Checking, Savings, or Credit Card. They can also make payments to friends. Almost like venmo, but " +
            "better and more secure because it goes directly from bank to bank. Thus cutting additional costs " +
            "and the middle man. Allow us to demonstrate. Nick, are you ready?";
        var cardText = "Alexa has demoed";
        var heading = "Cheddar Demo";

        response.tellWithCard(text, heading, cardText);

    }
};