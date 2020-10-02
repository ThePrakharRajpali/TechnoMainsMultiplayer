const Piece = require('./player.js');
class Marshal extends Piece {
    constructor(){
        super();
        this.id = '10';
        this.name = 'marshal';
        this.rank = 10;
    }
}
module.exports = Marshal;
