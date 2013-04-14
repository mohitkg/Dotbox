//File where all functions dealing with socket programming are defined for the client side.
var socket = io.connect('http://localhost:8080');//Connects the client to the server which is at localhost:8080.
var i = 0;
var m = 0, n = 0, p = 0;
var player_number = -1;
var turn = 0;
var players_connected = 0;

//on connection to server, this function gets triggered
//and asks for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	socket.emit('vacancy');

});

//Function which takes in input of the size of the grid from the master user.
socket.on('inputmn', function(){
	do{
		m = prompt("Enter number of rows (between 3 and 9 rows)",4);
	}while(m>9||m<3);	

	do{
		n = prompt("Enter number of columns (between 3 and 9 columns)",4);
	}while(n>9||n<3);

	do{
	p = prompt("Enter number of players (2 to 4 players)",2);
	}while(p<2||p>4);

	socket.emit("valuemnp", m, n, p);	
	
});

//Function to handle the event wherein an extra player tries to join in.
socket.on('overload', function(i){
	if(i == 1 ){
		if(player_number == -1)
			window.alert('Sorry, The house is full');
	}
	else 	if  (i == 0){
			if(player_number == -1)
				socket.emit('adduser', prompt("Enter your name:"));
	}
});

//Function to create the GUI table in the webpage using an HTML table tag.
socket.on('maketable', function(m_server, n_server, p_server, current_player_number){
	players_connected = current_player_number;
	if(player_number == -1){
		player_number = current_player_number;
		draw(m_server, n_server, p_server);//Call to draw() to do the actual HTML insertions.
	}
});

//Function to execute the horizontal move on the client side game when given the signal from server.	
socket.on('orderhorimove', function(x, y, player_number){
	horimove(x,y)
});

//Function to execute the vertical move on the client side game when given the signal from server.
socket.on('ordervertimove', function(x, y, player_number){
	//window.alert('ordervertimove was recieverfe');
	vertimove(x,y)
});

//listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
    	$('#users').append('<div>' + key + '</div>');
    });
});

//Function to send a request to the server for making everyone play the move that the client just clicked.
function reqhorimove(x,y,player_number){
	if((p-1) == players_connected ){
		if(turn == player_number)//If it is the player's turn then it emits a request to the server.
			socket.emit('askforhorimove',x,y,player_number);
		else//Otherwise it tells the client that it is not their turn.
			window.alert('It is not your turn!!');
	}
	else
		window.alert('Only '+ (players_connected + 1) + ' out of ' + p + ' players have connected. Wait for all players to connect.');
}

//Function to send a request to the server for making everyone play the move that the client just clicked.
function reqvertimove(x,y,player_number){
//	window.alert('reqvertimove was called');
	if((p-1) == players_connected ){
		if(turn == player_number){//If it is the player's turn then it emits a request to the server.
			socket.emit('askforvertimove',x,y,player_number);
		}
		else//Otherwise it tells the client that it is not their turn.
			window.alert('It is not your turn!!');
	}
	else
		window.alert('Only '+ (players_connected + 1) + ' out of ' + p + ' players have connected. Wait for all players to connect.');	
}
