const state = {
   view:{
      squares: document.querySelectorAll('.square'),
      enemy: document.querySelector('.enemy'),
      timeLeft: document.querySelector('#time-left'),
      score: document.querySelector('#score'),
   },
   values:{
      timeId: null,
      gameVelocity: 1000,
   },
};

function randomSquare() {
   state.view.squares.forEach((square) => {
      square.classList.remove('enemy');
   });

   let randomNumber = Math.floor(Math.random() * 9);
   let randomSquare = state.view.squares[randomNumber];
   randomSquare.classList.add('enemy');
}

function moveEnemy() {
   state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
   state.view.squares.forEach((square) => {});
}

function initialize() {
   moveEnemy();
}

initialize();