// PACKAGE LIBS
import express from 'express';

// CUSTOM LIBS
import { config } from './config/env';
import { AuthService } from './services/AuthService';
import { TweetService } from './services/TweetService';
import { UserAccountService } from './services/UserAccountService';

// Initialising express instance
const app = express();

// Creating root end point
app.use('/', (req, res) => {
    res.send("Hello World");    
})

// Setting up express server
app.listen(config['server']['port'], () => {
    new AuthService().generateGuestToken('https://twitter.com/')
        .then(token => {
            new TweetService().getUserRecentTweets(
                "44196397",
                5,
                config['twitter']['authToken'],
                token
            )
            .then(data => console.log(data));
        })
    console.log(`Listening on port ${config['server']['port']}`);
});