(function (window, $, undefined) {
    // let server = "localhost:8080"
    let tictac;
    let $boxes = $('.box')

    const tacsUrl = '/tacs/';
    // const player = "X";
    // const comp = "O";


    $(function () {

        $.ajax({
            type: 'GET',
            // url: '/tacs/',
            url: 'tacsUrl',
            success: function(boxes){
                $.each(boxes, function(i, boxes){
                    $boxes.append(funClick)
                })
                // console.log('success', winMoves)
            },
            error: function(){
                alert(winMoves);
            },
            tictac: 'tictac',
            player: 'player',
            comp: 'comp',
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

})(window, jQuery, undefined);