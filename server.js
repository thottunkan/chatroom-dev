const express = require('express');
const socketio = require('socket.io')
var bodyParser = require('body-parser')
const app = express();
const http = require('http').createServer(app);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
	res.send("hello");
	// res.sendFile(__dirname+'public/index,html');
});

app.post('/chat',(req,res)=>{
	// res.sendFile(__dirname+'/public/chat.html');
	

});
const io = socketio(http);

io.on('connection',(socket)=>{
	console.log("new client connected")

	//emits to current user
	socket.emit('message',"A user has joined") // emits to single user
	//broadcast to all users
	socket.broadcast.emit('message','A user has joined everybody...:)') // broadcast or emit to all users
	

	socket.on('chatMessage',(msg)=>{
		if (msg != '') {
			socket.broadcast.emit('messageToAll',msg);
			console.log(msg);
		}
		
	});




	//calls when cliet disconnects
	socket.on('disconnect',()=>{
		console.log("A user has left from the chat")
		io.emit('message',"A user has left from the chat") // broadcast or emit to all users
	});
});




http.listen(3000,()=>{
	console.log("server run on port 3000")
});
