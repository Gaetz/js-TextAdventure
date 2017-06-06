const FRAME_PER_SECOND = 30;
const BACKGROUND_STYLE = 'black';

let canvas, canvasContext;
let gameWidth, gameHeight;


/**
 * Game start
 */
window.onload = function () {
    // Load game elements
    load();
    // Loop
    setInterval(() => {
        update();
        draw();
    }, 1000 / FRAME_PER_SECOND);
}

/**
 * Loading game elements 
 * */
function load() {
    canvas = document.getElementById('gameCanvas');
    gameWidth = canvas.width;
    gameHeight = canvas.height;
    canvasContext = canvas.getContext('2d');
    canvasContext.textAlign = 'center';
}

/**
 * Update loop
 */
function update() {

}

/**
 * Draw loop
 */
function draw() {
    drawBackground();
}

function drawBackground() {
    canvasContext.fillStyle = BACKGROUND_STYLE;
    canvasContext.fillRect(0, 0, gameWidth, gameHeight);
}
