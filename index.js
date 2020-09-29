class Board {
    constructor() {
        this.board = [];
        this.lakeArea = [];
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
        if (   ( pos.x > next.x && this.getFreePosition(pos).left )
            || ( pos.x < next.x && this.getFreePosition(pos).right)
            || ( pos.y > next.y && this.getFreePosition(pos).down )
            || ( pos.y < next.y && this.getFreePosition(pos).up   ) ) {
                console.log("Piece moved from board");
                this.board[pos.x][pos.y].move(this.board[next.x][next.y]);

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

    attack(curr, next){
        if(this.board[next.x][next.y].isFree()){
            console.log("Can't attack empty space");
            return;
        } else if (this.isOpponent(curr, next)){
            // we win
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
        next.curr = this.curr;
        this.curr.move(next);
        this.curr = null;
        console.log("piece moved from square");
    }

}


class Piece {
    constructor(rank, pos, color) {
        this.id = null;
        this.rank = rank;
        this.name = null;
        this.pos = pos;
        this.color = color;
        this.isAlive = true;
    }

    move(next_pos){
        this.pos = next_pos;
        console.log("piece moved from piece");
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
