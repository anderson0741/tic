(function (window, $, undefined) {
    let tictac;

    /**
     * This will pull the divs inside of the HTML file with the class name box, and make it easier to write below by making it "$boxes" instead.
     */
    let $boxes = $('.box');
    
    /**
    * This will defines what the players characters will be in the tictac board.
    */
    const player = "X";
    const comp = "O";

    /** 
    * winMoves is what patterns can be hit in order to end the game, and have a winner declared.
    */
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

    /**
    * The reset will give the click function back after the game is reset, because at the end of the game it is taken away.
    * Below that it will also define the click function, and make it so when the squares are clicked the client will see that.
    */
    $("#reset").click(startGame);
    $boxes.click(clicker);
    function clicker(event) {

        /**
        * This will set data equal to the players move on the board.
        * The ajax POST will send out the click to the server where it will recieve it through its app.get('/turn') url.
        * The data will be sent out.
        * If successful it will activate the drawboard function.
        */
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

        /**
        * I set up a form in order to send the GET command to reset the tictac board on the server side.
        * e.preventDefault prevents the button from reloading the page.
        * set the url to /reset so it can be recieved server side with its own GET request. 
        */
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

    /** 
    * Drawboard will add the responses to the tictac board.
    * I console logged it to see the response from the server, which shows what the tictac board has changed for the computer and the players move.
    * @param response, will be the response from the server, it should show the servers version of the tictac board with numbers 0 - 8, and in the spot of whose chose a spot will be an  'X' or an 'O'.
    * The for loop will itterate through the response, it will set the players move on the client board, and display it with the text "X" or "O".
    * The next if statement is to check for a tie, if it gets a response that is the string 'tie' it will call the tie function, and then call gameOver to end the game.
    */
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

    /**
    * $boxes.off() then $boxes.click(clicker) turns off the click function, and then turns it back on to make sure it gets reactivated when the game gets reset
    * document.querySelector('.finish').style.display pulls from the html the .finish class, and sets all its background back to none, in the event that there was a winner, and the boxes are lit up with their colors.
    * tictac from the top is set to an array of the 9 boxes, and then the 9 array keys. 
    * this for loop just removes the innerText, and background colors.
    */
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


    /** 
    * This will end the game and remove the click functionality.
    * @param won and @param winningMove will be which player won, and which moves gave them the win respectively.
    * The for loop will set the background color of the winning move to limegreen if the player wins, or red if the computer wins.
    * Then it will shut off the click function, and change the .finish div to display who won.
    */
    function gameOver(won, winningMove) {
        for (let index of winningMove) {
            document.getElementById(index).style.backgroundColor =
                won == player ? "limegreen" : "red";
        }
        $boxes.off()
        Winner(won == player ? "YOU WIN!" : "Loser...")
    }

    /** 
     * Winner will pull from the documents finish class, and set the display to block. Block, adds some visual features.
     * Then it will change the innerText of the box to say who the winner was, whether it was the computer or the player.
     * @param whoWon will show the winner(computer or player)
    */
    function Winner(whoWon) {
        document.querySelector('.finish').style.display = "block";
        document.querySelector('.finish .text').innerText = whoWon;
    }

    /** 
    * Determines if there is no more moves and no winners.
    * it will turn off the click functionality, and set the Winner function to display tie game.
    */
    function tie() {
        $boxes.off();
        Winner("Tie Game");
    }

})(window, jQuery, undefined);