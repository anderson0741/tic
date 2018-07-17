(function (window, $, undefined) {
    // let server = "localhost:8080"
    let tictac;
    let $boxes = $('.box')

    // const player = "X";
    // const comp = "O";


    $('.box').click(function (event) {

        let $boxes = $('.box')

        // $.post("127.0.0.1:8080", {
        //     data: {
        //         'playermove': event.target.id
        //      },
        //      success: drawboard(),
        //      error: function (err) {
        //          console.log("lol")
        //      }
        //     },
        //     function(data){
        //         console.log(data)
        //     },

        // )
        let data = JSON.stringify({playerMove: event.target.id});
        $.ajax({
            type: 'post',
            url: '/turn',
            contentType: 'application/json',
            data,
            // success: function(boxes) {
            //     $.each(boxes, function(i, drawboard) {
            //         $boxes.append(gameBoard)
            //     })
            // }
            success: drawboard,
            // success: function (result) {
            //     console.log(result)
            // },
            error: function (err) {
                console.log(err)
                console.log("Server Error")
                console.log(event.target.id)
            }
        });
    });

    function drawboard(response) {
        console.log(response)
        for (i = 0; i < response.tictac.length; i++) {
            if (response.tictac[i] == "X") {

                console.log("hello")
            } if (response.tictac[i] == "O") {
                return { gameBoard: tictac }
            }
        }
    }

    function startGame() {
        document.querySelector('.finish').style.display = "none"
        tictac = Array.from(Array(9).keys());
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerText = '';
            boxes[i].style.removeProperty('background-color');
            boxes[i].addEventListener('click', funClick, false);
        }
    }
    function funClick(square) {
        if (typeof tictac[square.target.id] == 'number') {
            if (!turn(square.target.id, player)) {
                if (!tie()) turn(compTurn(), comp);
            }
        }
    }
    function turn(squareId, playerz) {
        tictac[squareId] = playerz;
        document.getElementById(squareId).innerText = playerz;
        // let won = check(tictac, playerz);
        // if (won) gameOver(won);
        // return won;
    }
    function gameOver(won) {
        for (let index of winMoves[won.index]) {
            document.getElementById(index).style.backgroundColor =
                won.playerz == player ? "limegreen" : "red";
        }
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].removeEventListener('click', funClick, false)
        }
        Winner(won.playerz == player ? "YOU WIN!" : "Loser...")
    }

    function Winner(whoWon) {
        document.querySelector('.finish').style.display = "block";
        document.querySelector('.finish .text').innerText = whoWon;
    }
    function compTurn(callBack) {
        // let turnTaken = false;
        // while (!turnTaken) {
        //     let num = Math.floor[Math.random() * 8];
        //     if (tictac[num] === 0) {
        //         tictac[num] = comp;
        //         turnTaken = true;
        //     }
        // }
        var as = availableSquare();
        tictac[as[Math.floor(Math.random() * as.length)]] = comp;
        check(callBack);
    }
    function tie() {
        if (availableSquare().length == 0) {
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].style.display.backgroundColor = 'purple';
                boxes[i].removeEventListener('click', funClick, false);
            }
            Winner("Tie Game")
            return true;
        }
        return false;
    }

})(window, jQuery, undefined);