'use strict'

// selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnhold = document.querySelector('.btn--hold')
const btnnew = document.querySelector('.btn--new')
const current0El = document.querySelector('#current--0')
const current1El = document.querySelector('#current--1')

const defaultSetting = function() {

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEL.classList.add('hidden');
}
defaultSetting();


const score = [0, 0]
let currentScore = 0;
let activePlayer = 0;
let playing = true

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

//Rolling the dice 
btnRoll.addEventListener('click', () =>{
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(`${dice}`);
    
        // Display The Dice After rolling
        diceEL.classList.remove('hidden')
        diceEL.src = `./img/dice-${dice}.png`;
    
        // checking for none 1 digit
    
        if (dice !== 1) {
            currentScore += dice;
            // current0El.textContent = currentScore;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            // switchPlayer
           switchPlayer()
        }
    
    }
})

btnhold.addEventListener('click', function () {
    if (playing) {
         // Add current score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    if (score[activePlayer] >= 20){
        playing = false;
        diceEL.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }else{
        switchPlayer();
       }
    }


})

btnnew.addEventListener('click', () => {
    playing = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
   defaultSetting();
    
})