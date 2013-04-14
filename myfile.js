//Script file which contains all the JavaScript functions that run on the client side.

//Function to display the scores.
function startplay(){
	document.getElementById("score1").style["display"]="block";
	document.getElementById("score2").style["display"]="block";
	//Conditional display of scores of the players 2 and 3.
	if(p>2)
		document.getElementById("score3").style["display"]="block";
	if(p>3)
		document.getElementById("score4").style["display"]="block";
}

//Function to restart the game.
function restart() {
	var i,j,x;
	score[0]=0;
	score[1]=0;
	for (i=0;i<=m;i++) {
		x=2*i*nn+1
		for (j=0;j<n;j++) {
			document.images[x+2*j].src=n3.src;
			horiedge[i][j]=0;
		}
	}
	for (i=0;i<m;i++) {
		x=(2*i+1)*nn
		for (j=0;j<=n;j++) {
			document.images[x+2*j].src=n3.src;
			vertiedge[i][j]=0;
		}
	}
	for (i=0;i<m;i++) {
		x=(2*i+1)*nn+1
		for (j=0;j<n;j++) {
			document.images[x+2*j].src=n3.src;
			box[i][j]=0;
		}
	}
	//score=0;
	//turn=0;
}

//horizontal move by user
function horimove(i,j) {     
	
	if (horiedge[i][j]<1) {
		sethoriedge(i,j);
		if (score[0]+score[1]+score[2]+score[3]==m*n) {
			if(p==2) 
				alert("Game over.\r Score: Red = "+score[0]+",  Blue = "+score[1])
			else if(p==3)
				alert("Game over.\r Score: Red = "+score[0]+",  Blue = "+score[1]+", Green = "+score[2])
			else if(p==4)
				alert("Game over.\r Score: Red = "+score[0]+",  Blue = "+score[1]+", Green = "+score[2]+", Yellow = "+score[3])
		}
	}
}

//vertical move by user
function vertimove(i,j) {
	     
	if (vertiedge[i][j]<1) {
		setvertiedge(i,j);
		if (score[0]+score[1]+score[2]+score[3]==m*n) {
			if(p==2) 
				alert("Game over.\r Score: Red = "+score[0]+",  Blue = "+score[1])
			else if(p==3)
				alert("Game over.\r Score: Red = "+score[0]+",  Blue = "+score[1]+", Green = "+score[2])
			else if(p==4)
				alert("Game over.\r Score: Red = "+score[0]+",  Blue = "+score[1]+", Green = "+score[2]+", Yellow = "+score[3])
		} 
	}
}

//Function that sets horizontal edge
function sethoriedge(x,y) {
	var player_inh = 0;
	horiedge[x][y]=1;
	if (x>0) box[x-1][y]++;
	if (x<m) box[x][y]++;
	document.images[2*x*nn+2*y+1].src=n2.src;
	player_inh = turn;
	checkh(x,y)
	if(player_inh != turn)
		turn = player_inh;
	else
		turn = (turn + 1) % p;
	document.getElementById("player").innerHTML="player "+ turn +"'s turn";
}

//Function that sets vertical edge
function setvertiedge(x,y){
 	var player_inv = 0;
	vertiedge[x][y]=1;
	if (y>0) box[x][y-1]++;
	if (y<n) box[x][y]++;
	document.images[(2*x+1)*nn+2*y].src=n2.src;
	player_inv = turn;
	checkv(x,y)
	if(player_inv != turn)
		turn = player_inv;
	else
		turn = (turn + 1) % p;
	document.getElementById("player").innerHTML="player "+ turn + "'s turn";

}

//check if horizontal edge move completes any box
function checkh(x,y){
	var hit=0;
	if (x>0) {
		if (box[x-1][y]==4) {
			var uu=x-1;
			document.images[(2*uu+1)*nn+2*y+1].src=flag[turn];
			score[turn]++;
			hit=1;
		}
	}
	if (x<m) {
		if (box[x][y]==4) {
			document.images[(2*x+1)*nn+2*y+1].src=flag[turn];
			score[turn]++;
			hit=1;
		}
	}
	if (hit>0) turn = turn + 1;
	document.getElementById("score1").innerHTML="player1 = "+score[0];
	document.getElementById("score2").innerHTML="player2 = "+score[1];
	document.getElementById("score3").innerHTML="player3 = "+score[2];
	document.getElementById("score4").innerHTML="player4 = "+score[3];
}

//check if vertical edge move completes any box
function checkv(x,y) {
	var hit=0;
	if (y>0) {
		if (box[x][y-1]==4) {
			var vv=y-1;
			document.images[(2*x+1)*nn+2*vv+1].src=flag[turn];
			score[turn]++;
			hit=1;
		}
	}
	if (y<n) {
		if (box[x][y]==4) {
			document.images[(2*x+1)*nn+2*y+1].src=flag[turn];
			score[turn]++;
			hit=1;
		}
	}
	if (hit>0)
		turn = turn + 1;

	document.getElementById("score1").innerHTML="player1 = "+score[0];
	document.getElementById("score2").innerHTML="player2 = "+score[1];
	document.getElementById("score3").innerHTML="player3 = "+score[2];
	document.getElementById("score4").innerHTML="player4 = "+score[3];
}
