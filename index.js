class Board {
    constructor() {
        this.board = [];
        this.lakeArea = [];
        this.gameOn = true;
    }

    //INITIALIZING THE GAME
    setupGame(){
        for(var i=0; i<12; i++){
            let width = [];
            for(var j=0; j<10; j++){
                var square = new Square(j,i);
                width.push(square);
            }
            this.board.push(width);
        }
        console.log("Game set up done");
    }

    addPiece(pos, piece){
        this.board[pos.x][pos.y].addPiece(piece);
        console.log("Piece added to square");
    }

    getFreePosition(pos){
        var right = false, left=false, up=false, down=false;
        if(pos.x < 9){
            right = this.board[pos.x + 1][pos.y].isFree();
            console.log("right is free");
        }
        if(pos.x > 0){
            left = this.board[pos.x - 1][pos.y].isFree();
            console.log("left is free");
        }
        if(pos.y < 11){
            up = this.board[pos.x][pos.y + 1].isFree();
            console.log("up is free");
        }
        if(pos.y > 0){
            down = this.board[pos.x][pos.y - 1].isFree();
            console.log("down is free");
        }

        return {right: right, left: left, up: up, down: down};
    }

    move(pos, next){
        //var piece = this.board[pos.x][pos.y].curr;
        if(this.board[pos.x][pos.y].curr.movable){
            if (   ( pos.x > next.x && this.getFreePosition(pos).left )
                || ( pos.x < next.x && this.getFreePosition(pos).right)
                || ( pos.y > next.y && this.getFreePosition(pos).down )
                || ( pos.y < next.y && this.getFreePosition(pos).up   ) ) {
                    console.log("Piece moved from board");
                    this.board[pos.x][pos.y].move(this.board[next.x][next.y]);
            }
        } else {
            console.log("Can't Move the piece");
            return;
        }
    }


    isOpponent(curr, next){
        // For debugging
        if(this.board[next.x][next.y].curr.color !== this.board[curr.x][curr.y].curr.color){
            console.log("Enemy Spotted");
        } else {
            console.log("Not an Enemy");
        }

        return (this.board[next.x][next.y].curr.color !== this.board[curr.x][curr.y].curr.color);
    }


    // TODO: change attack logic
    attack(curr, next){

        if(this.board[next.x][next.y].isFree()){\

            console.log("Can't attack empty space");

            return;

        } else if (this.isOpponent(curr, next)){

            // we win
            if(this.board[curr.x][curr.y].curr.id === 'S'){
                this.board[next.x][next.y].curr.isAlive = false;
                this.board[next.x][next.y].curr = null;
                this.move(curr, next);
                console.log("We win");
                return;
            } else if (this.board[next.x][next.y].curr.id === 'F'){
                this.board[curr.x][curr.y].curr.isAlive = false;
                this.board[curr.x][curr.y].curr = null;
                console.log("We lose");
                this.gameOn = false;
                return;
            } else if(this.board[next.x][next.y].curr.id === 'B'){
                this.board[next.x][next.y].curr.isAlive = false;
                this.board[next.x][next.y].curr = null;
                this.board[curr.x][curr.y].curr.isAlive = false;
                this.board[curr.x][curr.y].curr = null;
                console.log("Boom");
            }
            if( this.board[curr.x][curr.y].curr.rank /*our piece*/ > /*opponent piece*/ this.board[next.x][next.y].curr.rank ){

                this.board[next.x][next.y].curr.isAlive = false;
                this.board[next.x][next.y].curr = null;
                this.move(curr, next);
                console.log("We win");

            } // we lose
            else if (this.board[curr.x][curr.y].curr.rank < this.board[next.x][next.y].curr.rank){
                this.board[curr.x][curr.y].curr.isAlive = false;
                this.board[curr.x][curr.y].curr = null;
                console.log("We lose");
            } else {
                // tie
                this.board[next.x][next.y].curr.isAlive = false;
                this.board[next.x][next.y].curr = null;
                this.board[curr.x][curr.y].curr.isAlive = false;
                this.board[curr.x][curr.y].curr = null;
                console.log("Tie, both pieces die");
            }
        } else {
            console.log("Can't attack your army");
        }
    }

}

class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pos = {
            x: x,
            y: y
        }
        this.curr = null;
        // this.display = " ";
    }

    addPiece(piece){
        if(this.isFree()){
            this.curr = piece;
            piece.pos = this.pos;
            console.log("Piece added to square");
        } else {
            console.log("Square is not free");
        }
    }

    isFree(){
        return (this.curr === null);
    }

    move(next){
        if(this.curr.movable){
            next.curr = this.curr;
            this.curr.move(next);
            this.curr = null;
            console.log("piece moved from square");
        } else {
            return;
        }

    }

}

///////////////////////////////////////////////////////////////////
// PIECES
//////////////////////////////////////////////////////////////////

class Piece {
    constructor(rank, pos, color) {
        this.id = null;
        this.rank = rank;
        this.name = null;
        this.pos = pos;
        this.color = color;
        this.isAlive = true;
        this.movable = false;
    }

    setPos(pos){
        this.pos = pos;
    }

    move(next_pos){
        if(this.movable){
            this.pos = next_pos;
            console.log("piece moved from piece");
        } else {
            return;
        }
    }
}

class Marshal extends Piece {
    constructor(){
        super();
        this.id = '10';
        this.name = 'marshal';
        this.rank = 10;
    }
}

class General extends Piece {
    constructor(){
        super();
        this.id = '9';
        this.name = 'general';
        this.rank = 10;
    }
}

class Colonel extends Piece {
    constructor(){
        super();
        this.id = '8';
        this.name = 'colonel';
        this.rank = 8;
    }
}

class Major extends Piece {
    constructor(){
        super();
        this.id = '7';
        this.name = 'major';
        this.rank = 7;
    }
}

class Captain extends Piece {
    constructor(){
        super();
        this.id = '6';
        this.name = 'captain';
        this.rank = 8;
    }
}

class Lieutenant extends Piece {
    constructor(){
        super();
        this.id = '5';
        this.name = 'lieutenant';
        this.rank = 5;
    }
}

class Sergeant extends Piece {
    constructor() {
        super();
        this.id = '4';
        this.name = 'sergeant';
        this.rank = 4;
    }
}

class Miner extends Piece {
    constructor(){
        super();
        this.id = '3';
        this.name = 'miner';
        this.rank = 3;
    }
}

class Scout extends Piece {
    constructor(){
        super();
        this.id = '2';
        this.name = 'scout';
        this.rank = 2;
    }
}

class Spy extends Piece {
    constructor(){
        super();
        this.id = 'S';
        this.name = 'spy';
        this.rank = 1;
    }
}

class Bomb extends Piece {
    constructor(){
        super();
        this.id = 'B';
        this.name = 'bomb';
        this.rank = 0;
        this.movable = false;
    }
}

class Flag extends Piece {
    constructor(){
        super();
        this.id = 'F';
        this.name = 'flag';
        this.rank = 0;
        this.movable = false;
    }
}


class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.livePieces = [];
        this.deadPieces = [];
        this.point = 0;
    }

    startGame(startPieces){
        this.livePieces = startPieces;

    }
}


var board = new Board;
board.setupGame();
var pos = {
    x:1,
    y:2
};
var next = {
    x:1,
    y:3
};
var piece = new Piece(2, pos, "red");
var piece2 = new Piece(1, next, "blue")
board.addPiece(pos, piece);
board.addPiece(next, piece2);
// console.log(board.board[0][2]);
board.move(pos, next);
// console.log(board.board[0][2].isFree());
// console.log(board.board[1][3].isFree());
// console.log(board.board[1][3].curr);

board.attack(pos, next);
