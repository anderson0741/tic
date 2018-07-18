(function (window, $, undefined) {
    let tictac;
    let $boxes = $('.box')
    const player = "X";
    const comp = "O";
    const winMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    $("#reset").click(startGame);
    $boxes.click(clicker);
    function clicker(event) {

        let data = JSON.stringify({ playerMove: event.target.id });
        $.ajax({
            type: 'post',
            url: '/turn',
            contentType: 'application/json',
            data: data,
            success: drawboard,
            error: function (err) {
                console.log(err)
                console.log("Server Error")
                console.log(event.target.id)
            }
        });
        $("form").submit(function (e) {
            e.preventDefault();
            $.ajax({
                url: "/reset",
                type: "GET",
                success: function (responseData) { },
                error: console.error
            });
        });
    };

    function drawboard(response) {
        console.log(response)
        for (i = 0; i < response.tictac.length; i++) {
            if (response.tictac[i] == player) {
                $boxes[i].innerText = player;
            } else if (response.tictac[i] == comp) {
                $boxes[i].innerText = comp;
            }
        }
        if (response.winner !== null) {
            if (response.winner === 'tie') {
                return tie()
            }
            gameOver(response.winner, response.winningMove)
        }
    }


    function startGame() {
        $boxes.off()
        $boxes.click(clicker);
        document.querySelector('.finish').style.display = "none"
        tictac = Array.from(Array(9).keys());
        for (let i = 0; i < $boxes.length; i++) {
            $boxes[i].innerText = '';
            $boxes[i].style.removeProperty('background-color');
        }
    }

    function gameOver(won, winningMove) {
        for (let index of winningMove) {
            document.getElementById(index).style.backgroundColor =
                won == player ? "limegreen" : "red";
        }
        $boxes.off()
        Winner(won == player ? "YOU WIN!" : "Loser...")
    }

    function Winner(whoWon) {
        document.querySelector('.finish').style.display = "block";
        document.querySelector('.finish .text').innerText = whoWon;
    }

    function tie() {
        $boxes.off();
        Winner("Tie Game");
    }

})(window, jQuery, undefined);