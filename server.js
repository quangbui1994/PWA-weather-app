var webPush = require('web-push');

console.log('publickey:', webPush.generateVAPIDKeys().publicKey);
console.log('privatekey:', webPush.generateVAPIDKeys().privateKey);
const express = require('express');

const app = express();


var pushSubscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/eBGPyAuD320:APA91bGpznpZikAnlt4PSvNlBwtALsjQ30ln79zAaKopPslDKRktYJOHjIUjwODu5aqYmJZZNNOwPp7MATa_Cv-ZkhMcxRwkbxa6Gf4A2WUPpS91HGR9K-lcNsZjb8vU0XdwocC9cpES","keys":{"p256dh":"BBpE60qWLJEoSK0x0fP4JCISST5m/oBuv+s0TCW1puM6WSHko1H1PgfUssVRspTFOwI0w930crfg3juTzJ9nzhE=","auth":"dfj5NAXnvjgarEUM3cjnhg=="}};

var vapidPublicKey = 'BGhbILy7wRNrJzDdpCLTUtP0rSnMw88yhwNdTnrqgaOfKWuaTz9b80AIsAHOvK16DsOP4JbhA7xmcne-cSi5L90';
var vapidPrivateKey = 'UCtqgr3bPMSPD9O_UfndYWUH5oYKYICn4vjjk57TocU';
console.log(vapidPublicKey, vapidPrivateKey);

var payload = 'Here is a payload!';

var options = {
  vapidDetails: {
    subject: 'mailto:buiphuquang2412@gmail.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey
  },
  TTL: 60
};

app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/notification', async (req, res) => {
    try {
        const result = await webPush.sendNotification(
            pushSubscription,
            payload,
            options);
        console.log(result);
    } catch (error) {
        console.log(error);
    }

    
    res.send({});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));

    
    
    

