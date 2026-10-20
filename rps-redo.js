let result = '';
let score = JSON.parse(localStorage.getItem
  ('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

updateScoreElement();
updateResultElement();

let isAutoPlaying = false;
let intervalId = '';

// Either an arrow or regular function can be used in 
// situations like below, it's upto pp
/*
const autoPlay = () => {

};
*/

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';
    isAutoPlaying = true;
  } else {
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  };
};

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

  document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

  document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else  if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetScore();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
     } else if (computerMove === 'paper') {
      result = 'You lose';
     } else if (computerMove === 'scissors') {
      result = 'You win';
     }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
     result = 'You win';
    } else if (computerMove === 'paper') {
     result = 'Tie';
    } else if (computerMove === 'scissors') {
     result = 'You lose';
    }
    
  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
     } else if (computerMove === 'paper') {
      result = 'You win';
     } else if (computerMove === 'scissors') {
      result = 'Tie';
     }
  }
  
  if (result === 'You win') {
    score.wins += 1;

  } else if (result === 'You lose') {
    score.losses += 1;

  } else if (result === 'Tie') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  updateResultElement();

  document.querySelector('.js-moves-player').innerHTML
    = `
    <img src="/media/${playerMove}.svg" class="move-icon">
    `;

    document.querySelector('.js-moves-computer').innerHTML
    = `
    <img src="/media/${computerMove}.svg" class="move-icon">
    `;
}

function updateResultElement() {
  document.querySelector('.js-result')
    .innerHTML = result;
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
   computerMove = 'rock';
  } else if (randomNumber >= 1 / 3  && randomNumber < 2 / 3) {
   computerMove = 'paper';
  } else {
   computerMove = 'scissors';
  }

  return computerMove;
}

// Code to reset the score
document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    resetScore();
  });

function resetScore() {
  const resetHTML = `
  <p>
    Are you sure you want to reset the score?
  </p>
  <div class="js-reset-confirm-container">
    <button class="reset-button js-reset-yes-button"
      onclick="confirmReset('yes')">
      Yes
    </button>
    <button class="reset-button js-reset-no-button"
      onclick="confirmReset('no')">
      No
    </button>
  </div>
  `;
  const resetConfirm = document.querySelector(
    '.js-reset-display');
  const resetButton = document.querySelector(
    '.js-reset-button');
  if (resetConfirm.innerHTML !== resetHTML) {
    resetConfirm.innerHTML = resetHTML;
  } else {
    resetConfirm.innerHTML = '';
  };
};

function confirmReset(response) {
  if (response === 'yes') {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-reset-display')
    .innerHTML = '';
  } else {
    document.querySelector('.js-reset-display')
    .innerHTML = '';
  }
};