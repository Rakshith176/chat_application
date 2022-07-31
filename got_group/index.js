const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fetch = require('node-fetch');
app.get('/', function(req, res) {
    res.render('index.ejs');
});

// fetch("https://api.gameofthronesquotes.xyz/v1/house/lannister")
//   .then((response) => {
//     // Do something with response
//     console.log("heko");
//   })
//   .catch(function (err) {
//     console.log("Unable to fetch -", err);
//   });

users = [];
io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        debugger;
        socket.username = username;
        users.push(username);
        io.emit('is_online', '' + socket.username + ' joined the chat');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '' + socket.username + ' left the chat');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});