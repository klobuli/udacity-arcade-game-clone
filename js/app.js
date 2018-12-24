const playerSelection = {
  availablePlayers: ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-princess-girl.png'],
  choose: function () {
    // Whole screen selection container
    const selectionContainer = document.createElement('div');
    selectionContainer.classList.add('selection-container');
    document.body.appendChild(selectionContainer);
    // H1 heading
    const mainHeading = document.createElement('h1');
    mainHeading.classList.add('main-heading');
    mainHeading.textContent = 'Frogger Clone';
    selectionContainer.appendChild(mainHeading);
    // H2 heading
    const selectionHeading = document.createElement('h2');
    selectionHeading.classList.add('selection-heading');
    selectionHeading.textContent = 'Choose your character:'
    selectionContainer.appendChild(selectionHeading);
    // Flexbox where the player images are placed in
    const playersBox = document.createElement('div');
    playersBox.classList.add('players-box');
    selectionContainer.appendChild(playersBox);
    // Boy
    const playerBoy = document.createElement('img');
    playerBoy.setAttribute('src', this.availablePlayers[0]);
    playerBoy.classList.add('player-pic');
    playersBox.appendChild(playerBoy);
    playerBoy.addEventListener('click', function() {
      player.sprite = playerSelection.availablePlayers[0];
      selectionContainer.remove();
      playerSelection.go();
    });
    // Cat girl
    const playerCatGirl = document.createElement('img');
    playerCatGirl.setAttribute('src', this.availablePlayers[1]);
    playerCatGirl.classList.add('player-pic');
    playersBox.appendChild(playerCatGirl);
    playerCatGirl.addEventListener('click', function() {
      player.sprite = playerSelection.availablePlayers[1];
      selectionContainer.remove();
      playerSelection.go();
    });
    // Princess Girl
    const playerPrincessGirl = document.createElement('img');
    playerPrincessGirl.setAttribute('src', this.availablePlayers[2]);
    playerPrincessGirl.classList.add('player-pic');
    playersBox.appendChild(playerPrincessGirl);
    playerPrincessGirl.addEventListener('click', function() {
      player.sprite = playerSelection.availablePlayers[2];
      selectionContainer.remove();
      playerSelection.go();
    });
  },
  // Start animation, timer and star rating
  go: function() {
    playerSelection.animationChosen();
    timer();
    ratingSystem.starRating();
  },
  // Animation that occurs when player has chosen a character
  animationChosen: function() {
    const animation = document.createElement('div');
    animation.classList.add('player-chosen-animation');
    document.body.appendChild(animation);
    setTimeout(function() {
      animation.remove();
    }, 1000);
  }
};

playerSelection.choose();

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 400 + 250);
    this.sprite = 'images/enemy-bug.png';
  }

  update(dt) {
    this.x += this.speed * dt;
    // Reset enemy when it moves off screen
    if(this.x >= 600) {
      this.positionAndSpeed();
    }
    // Handle collisions
    if(this.y === player.y) {
      if(player.x === 0 && this.x >= -52 && this.x <= 28) {
        player.reset();
        statsUpdate('collision');
      }
      if(player.x === 101 && this.x >= 49 && this.x <= 129) {
        player.reset();
        statsUpdate('collision');
      }
      if(player.x === 202 && this.x >= 150 && this.x <= 230) {
        player.reset();
        statsUpdate('collision');
      }
      if(player.x === 303 && this.x >= 251 && this.x <= 331) {
        player.reset();
        statsUpdate('collision');
      }
      if(player.x === 404 && this.x >= 352 && this.x <= 432) {
        player.reset();
        statsUpdate('collision');
      }
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Calculate random speed and y position
  positionAndSpeed() {
    this.x = -110;
    const yPos = Math.floor(Math.random() * 3 + 1);
    switch (yPos) {
      case 1:
      this.y = 61;
      break;
      case 2:
      this.y = 144;
      break;
      case 3:
      this.y = 227;
      break;
    }
    this.speed = Math.floor(Math.random() * 400 + 250);
  }
};

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }

  update(dt) {

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(pressedKey) {
    // Winning condition
    if (pressedKey === 'up' && this.y === 61) {
      successNotification();
      this.y -= 83;
      setTimeout(function() {
        player.reset();
        statsUpdate('won');
      }, 1000);
      // Handle user input and make sure player doesn't move off screen
    }
    if(pressedKey === 'up' && this.y > -22) {
      this.y -= 83;
    }
    // Once the player has reached the water, he shouldn't be able to walk back again, waiting for the timeout function to execute
    if(pressedKey === 'down' && this.y < 393 && this.y > -22) {
      this.y += 83;
    }
    if(pressedKey === 'left' && this.x > 0) {
      this.x -= 101;
    }
    if(pressedKey === 'right' && this.x < 404) {
      this.x += 101;
    }
  }
  // Set player back to starting point
  reset() {
    this.x = 202;
    this.y = 393;
  }
};

// Create instances from Enemy and Player class
const enemyOne = new Enemy(-110, 61);
const enemyTwo = new Enemy(-110, 144);
const enemyThree = new Enemy(-110, 227);
const allEnemies = [enemyOne, enemyTwo, enemyThree];
const player = new Player(202, 393);

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// Winning notification
function successNotification() {
  const notification = document.createElement('div');
  notification.classList.add('player-wins');
  const chooseNotification = Math.floor(Math.random() * 5 + 1);
  switch (chooseNotification) {
    case 1:
    notification.textContent = 'Awesome!';
    break;
    case 2:
    notification.textContent = 'Great!';
    break;
    case 3:
    notification.textContent = 'Amazing!';
    break;
    case 4:
    notification.textContent = 'Excellent!';
    break;
    case 5:
    notification.textContent = 'Woohoo!';
    break;
  }
  document.body.appendChild(notification);
  setTimeout(function() {
    notification.remove();
  }, 1000);
}

// Notification when a collision happens
function failNotification() {
  const notification = document.createElement('div');
  notification.textContent = 'Ouch!';
  notification.classList.add('player-fails');
  document.body.appendChild(notification);
  setTimeout(function() {
    notification.remove();
  }, 1000);
}

// Player stats
let reachedWater = 0;

document.addEventListener('DOMContentLoaded', function() {
  // Container div
  const statsContainer = document.createElement('div');
  statsContainer.classList.add('stats-container');
  document.body.appendChild(statsContainer);
  // Stats heading
  const statsHeading = document.createElement('h3');
  statsHeading.textContent = 'Player stats';
  statsContainer.appendChild(statsHeading);
  // Show how often the player reached the water
  const statsReachedWater = document.createElement('p');
  statsReachedWater.classList.add('player-stats-reached-water');
  statsContainer.appendChild(statsReachedWater);
  statsReachedWater.innerHTML = `Reached water: ${reachedWater}`;
});

// Player stats update function
function statsUpdate(check) {
  if(check === 'won') {
    reachedWater++;
    ratingSystem.updateStarRating();
  }
  else if(check === 'collision') {
    reachedWater = 0;
    const removeTimer = document.querySelector('.player-stats-timer');
    removeTimer.remove();
    const removeStarRating = document.querySelector('.player-stats-rating');
    removeStarRating.remove();
    const statsContainer = document.querySelector('.stats-container');
    statsContainer.classList.add('collide');
    setTimeout(function() {
      statsContainer.classList.remove('collide');
    }, 1000);
    failNotification();
    timer();
    ratingSystem.starRating();
  }
  const statsReachedWater = document.querySelector('.player-stats-reached-water');
  statsReachedWater.innerHTML = `Reached water: ${reachedWater}`;
}

// Timer function
function timer() {
  let m1 = 0;
  let m2 = 0;
  let s1 = 0;
  let s2 = 0;
  const time = document.createElement('p');
  time.classList.add('player-stats-timer');
  time.innerHTML = `Time survived: ${m1}${m2}:${s1}${s2}`;
  const statsContainer = document.querySelector('.stats-container');
  statsContainer.appendChild(time);
  let count = setInterval(function() {
    s2++;
    if(s2 === 10) {
      s2 = 0;
      s1++;
    }
    if(s1 === 6) {
      s1 = 0;
      m2++;
    }
    if(m2 === 10) {
      m2 = 0;
      m1++;
    }
    time.innerHTML = `Time survived: ${m1}${m2}:${s1}${s2}`;
    if(m1 >= 6) {
      clearInterval(count);
      time.textContent = "Better stop playing, otherwise you'll go completely crazy.";
    }
  }, 1000);
}

// Star rating
const ratingSystem = {
  stars: ['<i class="far fa-star"></i>', '<i class="fas fa-star"></i>'],
  starRating: function() {
    const statsContainer = document.querySelector('.stats-container');
    const rating = document.createElement('p');
    rating.classList.add('player-stats-rating');
    rating.innerHTML = `Your rating: ${this.stars[0]}${this.stars[0]}${this.stars[0]}${this.stars[0]}${this.stars[0]}`;
    statsContainer.appendChild(rating);
  },
  updateStarRating: function() {
    const rating = document.querySelector('.player-stats-rating');
    if(reachedWater === 0) {
      rating.innerHTML = `Your rating: ${this.stars[0]}${this.stars[0]}${this.stars[0]}${this.stars[0]}${this.stars[0]}`;
    }
    if(reachedWater >= 1 && reachedWater <= 3) {
      rating.innerHTML = `Your rating: ${this.stars[1]}${this.stars[0]}${this.stars[0]}${this.stars[0]}${this.stars[0]}`;
    }
    if(reachedWater >= 4 && reachedWater <= 7) {
      rating.innerHTML = `Your rating: ${this.stars[1]}${this.stars[1]}${this.stars[0]}${this.stars[0]}${this.stars[0]}`;
    }
    if(reachedWater >= 8 && reachedWater <= 11) {
      rating.innerHTML = `Your rating: ${this.stars[1]}${this.stars[1]}${this.stars[1]}${this.stars[0]}${this.stars[0]}`;
    }
    if(reachedWater >= 12 && reachedWater <= 15) {
      rating.innerHTML = `Your rating: ${this.stars[1]}${this.stars[1]}${this.stars[1]}${this.stars[1]}${this.stars[0]}`;
    }
    if(reachedWater >= 16 ) {
      rating.innerHTML = `Your rating: ${this.stars[1]}${this.stars[1]}${this.stars[1]}${this.stars[1]}${this.stars[1]}`;
    }
  }
};

// Reload page
(function reloadPage() {
  const reloadButton = document.querySelector('.reload');
  reloadButton.addEventListener('click', function() {
    location.reload();
  });
})();
