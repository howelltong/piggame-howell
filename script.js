'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0'); //change player active status
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0') //method that selects all elements
const score1El = document.getElementById('score--1') //method selection via id
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0') //current score element (small scores)
const current1El = document.getElementById('current--1')
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// // starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing; //scoping prevention by defining variables first and adding value within initialisation function


const init = function () { //init = initialisation
    // starting conditions
    diceEl.classList.add('hidden');

    scores = [0, 0] //hold respective players' scores as an array to discern between values (large scores)
    // create global variable to hold current score so that value may persist
    currentScore = 0;
    activePlayer = 0; // discern between player 1 and 2 by '0' and '1' respectively to match array positioning

    // create variable that holds the state of the game which describes the condition of the game
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
    currentScore = 0; //set current score to 0 again for both roll 1 and hold
    // switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // if active player is 0, change to one, else if not 0, change to 1
    player0El.classList.toggle('player--active') // class === active ? remove : add
    player1El.classList.toggle('player--active')
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1; //dice variable must be local as it will change only depending on event trigger
        console.log(dice); //check if random dice number corresponds to the correct image

        // 2. Display dice
        diceEl.classList.remove('hidden');
        // manipulate image source attribute
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;

            // select player scores dynamically according to which player is active
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
            // current0El.textContent = currentScore; //CHANGE LATER SO THAT EACH PLAYER HAS OWN SCORE
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