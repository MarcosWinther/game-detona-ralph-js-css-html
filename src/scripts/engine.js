const state = {
   view:{
      squares: document.querySelectorAll('.square'),
      enemy: document.querySelector('.enemy'),
      timeLeft: document.querySelector('#time-left'),
      score: document.querySelector('#score'),
      lives: document.querySelector('#lives'),
   },
   values:{
      hitPosition: 0,
      result: 0,
      currentTime: 20,
      playerLives: 3,
   },
   actions: {
      timeId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
   }
};

function resetGame() {
   clearInterval(state.actions.countDownTimerId);
   clearInterval(state.actions.timeId);

   state.view.squares.forEach((square) => {
      square.classList.remove('enemy');
   });

   state.actions.timeId = setInterval(randomSquare, 1000);
   state.actions.countDownTimerId = setInterval(countDown, 1000);

   state.values.result = 0;
   state.values.playerLives = 3;
   state.values.currentTime = 20;

   state.view.score.textContent = state.values.result;
   state.view.lives.textContent = state.values.playerLives;
   state.view.timeLeft.textContent = state.values.currentTime;
}

function countDown() {
   state.values.currentTime--;
   state.view.timeLeft.textContent = state.values.currentTime;

   if(state.values.currentTime <= 0) {
      alert(`Game Over! Você fez ${state.values.result} pontos!`);
      resetGame();
   }
}

function playSound(nameAudio) {
   let audio = new Audio(`./src/audios/${nameAudio}.m4a`);
   audio.volume = 0.2;
   audio.play();
}

function randomSquare() {
   state.view.squares.forEach((square) => {
      square.classList.remove('enemy');
   });

   let randomNumber = Math.floor(Math.random() * 9);
   let randomSquare = state.view.squares[randomNumber];
   randomSquare.classList.add('enemy');
   state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
   state.view.squares.forEach((square) => {
      square.addEventListener('mousedown', () => {
         if(square.id === state.values.hitPosition) {
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound('hit');
            square.classList.remove('enemy');
         } else {
            state.values.playerLives--;
            state.view.lives.textContent = state.values.playerLives;
            state.values.hitPosition = null;
            playSound('windows-error');

            if(state.values.playerLives <= 0) {
               alert(`Game Over! Que pena você zerou todas as vidas!! Você fez ${state.values.result} pontos!`);
               setTimeout(resetGame, 1000);
            } 
         }
      })
   });
}

function initialize() {
   state.view.lives.textContent = state.values.playerLives;
   addListenerHitBox();
}

initialize();