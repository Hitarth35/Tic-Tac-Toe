let log = (x) => {console.log(x)}
log("sript running")


function showMove(turn) {
	if(turn == "cross"){
		document.getElementById("turn").style.backgroundImage = "url('cross.png')";
		return;
	}
	document.getElementById("turn").style.backgroundImage = "url('circle.png')";
}

function turnChange() {
	if(turn == "cross"){
		turn = "circle";
		showMove(turn);
		return;
	}
	
	turn = "cross";
	showMove(turn);
	return;
}

function win(turn) {
	gameEnd = true;
	console.log(turn + " wins!");
    setTimeout(() => {
		alert(turn + " wins!");
		restartGame();
    }, 100); 
}

function draw() {
log("Draw!");
gameEnd = true;
setTimeout(() => {
	alert("Draw!");
	restartGame();
}, 100); 
return;
}

function winCheck(state) {
	if(state[0][0] == turn && state[1][1] == turn && state[2][2] == turn){
		win(turn);
		return;
	}
	if(state[0][2] == turn && state[1][1] == turn && state[2][0] == turn){
		win(turn);
		return;
	}	
	for(let i = 0; i < 3; i++){
		if(state[i][0] == turn && state[i][1] == turn && state[i][2] == turn){
			win(turn);
			return;
		}

		if(state[0][i] == turn && state[1][i] == turn && state[2][i] == turn){
			win(turn);
			return;
		}
	}
	drawCheck(state);

}

function drawCheck(state){
	let isDraw = true;

	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			if(state[i][j] == ""){
				isDraw = false;
				break;
			}
		}
	}
	if(isDraw == true){
		draw();
		return;
	}
}

function restartGame() {
    let reStart = confirm("Do you want to play again?");
    if (reStart) {
        gameEnd = false;
        turn = "cross";
        showMove(turn);
        state = [
            ["", "", ""],
            ["", "", ""],
		["", "", ""]
        ];
        document.querySelectorAll('.square').forEach(element => {
            element.style.backgroundImage = "";
        });
    } else {
        alert("Thanks for playing!");
    }
}


let turn = "cross";
let gameEnd = false;
showMove(turn);

let state = [
	["", "", ""],
	["", "", ""],
	["", "", ""]
]

document.querySelectorAll('.square').forEach(element => {
    element.addEventListener('click', function() {
		if(gameEnd == false){
        console.log('Clicked:', this);
		if(this.style.backgroundImage == ""){
			this.style.backgroundImage = "url('" + turn + ".png')";
			let id = this.getAttribute("id");
			let column = (id+2)% 3;
			let row = 	Math.floor((id - 1) / 3);
			state[row][column] = turn;
			console.log(state[row][column]);
			winCheck(state);
			setTimeout(() => {
				turnChange();
			}, 100);
		}
	}
	});
});




