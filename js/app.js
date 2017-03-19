var diff = 15;
var enemySpeed = 300;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = Math.floor(200 + (Math.random() * enemySpeed));
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed) * dt;
    if(this.x > 550) {
        this.x = -100;
        this.speed = Math.floor(200 + (Math.random() * enemySpeed));
        if(this.y > 226) {
            this.y = 60;
        }
    }
    // check for collision
    if(player.y >= this.y - diff && player.y <= this.y + diff) {
        if(player.x >= this.x - diff && player.x <= this.x + diff) {
            alert('YOU LOSE! TRY AGAIN!');
            player.resetGame();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 404;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    if(this.keypress === 'left') {
        this.x -= 101;
        if(this.x <= 0) {
            this.x = 0;
        }
    }
    if(this.keypress === 'up') {
        this.y -= 83;
    }
    if(this.keypress === 'right') {
        this.x += 101;
        if(this.x >= 404) {
            this.x = 404;
        }
    }
    if(this.keypress === 'down') {
        this.y += 83;
        if(this.y >= 404) {
            this.y = 404;
        }
    }
    this.keypress = null;
    if(this.y < 60) {
        alert('YOU WIN! CONGRATES!');
        this.resetGame();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.keypress = key;
};

Player.prototype.resetGame = function() {
    this.x = 202;
    this.y = 404;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyOne = new Enemy(0, 60);
var enemyTwo = new Enemy(0, 143);
var enemyThree = new Enemy(0, 226);
var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

