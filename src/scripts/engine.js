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
      currentTime: 60,
      playerLives: 3,
   },
   actions: {
      timeId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
   }
};

function countDown() {
   state.values.currentTime--;
   state.view.timeLeft.textContent = state.values.currentTime;

   if(state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timeId);
      alert('Game Over! O seu resultado foi ' + state.values.result);
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

            state.view.lives = state.values.playerLives;
            playSound('hit');
         } else {
            state.values.result--;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;

            if(state.values.playerLives <= 0) {
               alert('Game Over! Você zerou todas as vidas!');
               state.view.lives.textContent = state.values.playerLives;
            } else {
               state.values.playerLives--;
               state.view.lives.textContent = state.values.playerLives;
            }

            playSound('windows-error');
         }
      })
   });
}

function initialize() {
   state.view.lives.textContent = state.values.playerLives;
   addListenerHitBox();
}

initialize();