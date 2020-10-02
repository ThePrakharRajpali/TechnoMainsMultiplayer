const express    = require("express");
const app        = express();

const Board      = require('./Models/Board.js');
const Bomb       = require('./Models/bomb.js');
const Captain    = require('./Models/captain.js');
const Colonel    = require('./Models/colonel.js');
const Flag       = require('./Models/flag.js');
const General    = require('./Models/general.js');
const Lieutenant = require('./Models/lieutenant.js');
const Major      = require('./Models/major.js');
const Marshal    = require('./Models/marshal.js');
const Miner      = require('./Models/miner.js');
const Piece      = require('./Models/Piece.js');
const Player     = require('./Models/player.js');
const Scout      = require('./Models/scout.js');
const Sergeant   = require('./Models/sergeant.js');
const Spy        = require('./Models/spy.js');
const Square     = require('./Models/Square.js');

//alert("Connected");
var newBoard = new Board;
newBoard.setupGame();

var tableAppend = "<table>";
for(var i = 0; i<12; i++){
    tableAppend += "<tr>";
    for(var j = 0; j<10; j++){
        tableAppend += "<td> </td>";
    }
    tableAppend += "</tr>";
}
tableAppend += "</table>";


app.get("/", (req, res) => {
    res.send(tableAppend);
});

app.listen(3000, () => {
    console.log("Server running");
});
