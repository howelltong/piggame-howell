'use strict';


const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


let scores, currentScore, activePlayer, playing;

const init = function () {
    diceEl.classList.add('hidden');
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;

    playing = true;

    for (let i = 0; i < 2; i++) {
        document.getElementById(`score--${i}`).textContent = scores[i];
        // reset current score
        document.getElementById(`current--${i}`).textContent = scores[i];
        // // remove winner if active
        document.querySelector(`.player--${i}`).classList.remove('player--winner') //JS will attempt to remove even if not present
        // // set player active to player 1
        document.querySelector(`.player--${i}`).classList.remove('player--active')
    }
    // // set player active to player 1
    document.querySelector(`.player--0`).classList.add('player--active')

}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0; //set current player's score to 0
    currentScore = 0;
    // switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        //generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //Check for rolled 1
        if (dice !== 1) {
            currentScore += dice;
            // select player scores dynamically according to which player is active
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. add current score to active player's score
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. check if player's score is >= 100;
        if (scores[activePlayer] >= 100) {
            // finish game (assign player winner class)
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        } else {
            // switch to next player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init)