//Server File-this creates the server and configures it for our need.
//Statements to include modules like express and the ones needed to create an http server.
var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var i = 0;
var turn = 0;
server.listen(8080);

//Routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/');
});

// This statement is to be able to access images in the directory.
app.use('/', express.static(__dirname + "/"));

//usernames which are currently connected to the chat
var usernames = {};
var master = 0;
var m_server, n_server, p_server;
var current_player_number = 0;

//Function that handles the event of a client connectign to the server.
io.sockets.on('connection', function (socket){

	//Function to handle the event when a new user is to be added to the game if there is a vacancy.
	socket.on('vacancy', function(){
		if(master == 0)
			io.sockets.emit('overload', 0); 
		else if (current_player_number < p_server )
			io.sockets.emit('overload', 0);
		else
			io.sockets.emit('overload', 1);
	});

	//Function which handles the event when a new player has to be added.
	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		usernames[username] = username;
		if(master == 0){
			io.sockets.emit('inputmn');
			master = 1;
		}
		else{
			io.sockets.emit('maketable', m_server, n_server, p_server, current_player_number);
			current_player_number = current_player_number + 1;
		}
	});

	//Function to set the value of m, n and p from the master user.
	socket.on('valuemnp', function(m,n,p){
		m_server = m;
		n_server = n;
		p_server = p;
		io.sockets.emit('maketable', m_server, n_server, p_server, current_player_number);
		//increments the value of current player so that the correct value is sent to the next user that connects.
		current_player_number = current_player_number + 1;

	});

	//Functions to request server to make all clients play the move specified in the arguments.
	socket.on('askforhorimove', function(x,y,player_number){
		io.sockets.emit('orderhorimove', x, y, player_number)
			//
	});
	socket.on('askforvertimove', function(x,y,player_number){
	//	io.sockets.emit('orderhorimove', 0, 0, 0)
		io.sockets.emit('ordervertimove', x, y, player_number)
			//
	});

	//Function to handle the event in e=which a user leaves the game website.
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);									//*updateusers,*updatechat
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	  });
});