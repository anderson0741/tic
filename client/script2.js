(function (window, $, undefined) {
    // let server = "localhost:8080"
    let tictac;
    let $boxes = $('.box')

    const tacsUrl = '/tacs/';
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
        });

    });
    let winMoves = tacsUrl.winMoves;
    let startGame = tacsUrl.startGame;
    let funClick = tacsUrl.funClick;
    let turn = tacsUrl.turn;
    let check = tacsUrl.check;
    let gameOver = tacsUrl.gameOver;
    let Winner = tacsUrl.Winner;
    let availableSquare = tacsUrl.availableSquare;
    let compTurn = tacsUrl.compTurn;
    let tie = tacsUrl.tie;

    
    console.log(winMoves);
    console.log(startGame);
    funClick();
    turn();
    check();
    gameOver();
    Winner();
    availableSquare();
    compTurn();
    tie();

    // module.exports = [];
})(window, jQuery, undefined);