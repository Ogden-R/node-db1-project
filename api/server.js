const express = require("express");

const AccountsRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

server.get('/', (req, res) => {
    res.json({ message: 'Api is working add a route to see more' });
    console.log('api is working');
});

server.use("*", (req,res)=>{
    res.status(404).json({
        message: 'Bad route try another'
    })
});

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
});

module.exports = server;
