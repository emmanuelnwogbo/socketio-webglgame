const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('./public_html/chat/index.html'));
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/./public_html/chat/index.html');
});

const Port = 3000;

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg)
  });
});

http.listen(Port, function(){
  console.log(`listening on ${Port}`);
});