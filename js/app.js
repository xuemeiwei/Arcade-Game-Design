var go = false;// parameter for whether to show the main page
var characters = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

// The definition for start screen
var Startscreen = function(sprites, x, y) {
    this.sprites = characters;
    this.x = x;
    this.y = y;
};
Startscreen.prototype.menu = function(keys) {
    //Draw a whole bule rectangle screen
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 505, 606);
    ctx.closePath();

    //Draw a smaller gray rectangle screen
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.fillRect(50, 50, 405, 500);
    ctx.closePath();

    //Draw some text
    ctx.beginPath();
    ctx.font = "30px Ariel";
    ctx.fillStyle = "yellow";
    ctx.fillText("Use 'shift' to Toggle Character", 90, 120);
    ctx.closePath();

    //Draw some text
    ctx.beginPath();
    ctx.font = "30px Ariel";
    ctx.fillStyle = "yellow";
    ctx.fillText("Use 'Space' to Select", 90, 160);
    ctx.closePath();

    //Draw initial character
    ctx.beginPath();
    ctx.drawImage(Resources.get(this.sprites[0]),200,150,140,250);

    //The character will change if 'shift' is pressed;
    //It will go to the game screen if 'space' is pressed;
    switch(keys) {
        case 'shift':
            this.sprites.push(this.sprites.shift());
            break;
        case 'spacebar':
            go = true;
            break;
    }
    ctx.closePath();
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.enemySpeed = 300;// parameters used for generation of enemyspeed
    this.speed = Math.floor(200 + (Math.random() * this.enemySpeed));
    this.sprite = 'images/enemy-bug.png';
    this.diff = 25;// parameters used to define the condition for collision
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed) * dt;
    if(this.x > 550) {
        this.x = -100;
        this.speed = Math.floor(200 + (Math.random() * this.enemySpeed));
        if(this.y > 226) {
            this.y = 60;
        }
    }
    // check for collision
    if(player.y >= this.y - this.diff && player.y <= this.y + this.diff) {
        if(player.x >= this.x - this.diff && player.x <= this.x + this.diff) {
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
    this.sprite = characters;
};

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
    //console.log(characters);
    ctx.drawImage(Resources.get(this.sprite[0]), this.x, this.y);
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
// Create the start screen
var startScreen = new Startscreen(0,0);
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
        40: 'down',
        16: 'shift',
        32: 'spacebar'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    startScreen.menu(allowedKeys[e.keyCode]);
});

