(function (window, $, undefined) {
    let server = "localhost:8080"
    let tictac;
    let $boxes = $('.box')

    const player = "X";
    const comp = "O";

    $(function () {

        $.ajax({
            type: 'GET',
            tictac: 'tictac',
            // player: 'player',
            // comp: 'comp',
            winMoves: 'winMoves',
            startGame: 'startGame',
            funClick: 'funClick',
            turn: 'turn',
            check: 'check',
            gameOver: 'gameOver',
            Winner: "Winner",
            availableSquare: 'availableSquare',
            compTurn: 'compTurn',
            tie: 'tie'
        })
    })


    winMoves();
    startGame();
    funClick();
    turn();
    check();
    gameOver();
    Winner();
    availableSquare();
    compTurn();
    tie();

    module.exports = [];
})(window, jQuery, undefined);