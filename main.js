// Config
const FRAME_PER_SECOND = 30;
const BACKGROUND_STYLE = 'black';

// States
const STATE_CELL = 'stateCell';
const STATE_MIRROR = 'stateMirror';
const STATE_SHEETS_0 = 'stateSheets0';
const STATE_LOCK_0 = 'stateLock0';
const STATE_CELL_MIRROR = 'stateCellMirror';
const STATE_SHEETS_1 = 'stateSheets1';
const STATE_LOCK_1 = 'stateLock1';
const STATE_FREEDOM = 'stateFreedom';

// Variables
let canvas, canvasContext;
let gameWidth, gameHeight;
let currentState, oldState, pressedKey;
let text = [];

/**
 * Game start
 */
window.onload = function () {
    // Load game elements
    load();
    // Detect input
    document.addEventListener('keydown', this.checkKey, false);
    // Loop
    setInterval(() => {
        update();
    }, 1000 / FRAME_PER_SECOND);
}

/**
 * Detect pressed key and translate it in a correct language
 */
function checkKey(e) {
    switch (e.keyCode) {
        case 83: pressedKey = 'S'; break;
        case 77: pressedKey = 'M'; break;
        case 76: pressedKey = 'L'; break;
        case 82: pressedKey = 'R'; break;
        case 84: pressedKey = 'T'; break;
        case 79: pressedKey = 'O'; break;
        case 80: pressedKey = 'P'; break;
    }
}

/**
 * Loading game elements 
 * */
function load() {
    canvas = document.getElementById('gameCanvas');
    gameWidth = canvas.width;
    gameHeight = canvas.height;
    canvasContext = canvas.getContext('2d');
    canvasContextAlign = 'center';
    currentState = STATE_CELL;
    oldState = STATE_CELL;
}

/**
 * Update loop
 */
function update() {
    // Update text content and draw it on screen
    updateTextAndDraw()
    // Handle state change
    switch (currentState) {
        case STATE_CELL: stateCell(); break;
        case STATE_MIRROR: stateMirror(); break;
        case STATE_SHEETS_0: stateSheets0(); break;
        case STATE_LOCK_0: stateLock0(); break;
        case STATE_CELL_MIRROR: stateCellMirror(); break;
        case STATE_SHEETS_1: stateSheets1(); break;
        case STATE_LOCK_1: stateLock1(); break;
        case STATE_FREEDOM: stateFreedom(); break;
    }
    // Reset when state has change
    if (oldState != currentState) {
        reset();
        oldState = currentState;
    }
}

/**
 * Get text and draw it
 */
function updateTextAndDraw() {
    if (text.length == 0) {
        getText();
        draw();
    }
}

/**
 * Set text in function of current state
 */
function getText() {
    switch (currentState) {
        case STATE_CELL:
            text.push("You are in a prison cell, and you want to escape. There are ");
            text.push("some dirty sheets on the bed, a mirror on the wall, and the door ");
            text.push("is locked from the outside.");
            text.push("Press S to view Sheets");
            text.push("Press M to look at the Mirror");
            text.push("Press L to look at the Lock");
            break;
        case STATE_MIRROR:
            text.push("The dirty old mirror on the wall seems loose.");
            text.push("Press T to Take the mirror");
            text.push("Press R to Return");
            break;
        case STATE_SHEETS_0:
            text.push("You can't believe you sleep in these things. Surely it's ");
            text.push("time somebody change them. The pleasures of prison life ");
            text.push("you guess !");
            text.push("Press R to Return");
            break;
        case STATE_LOCK_0:
            text.push("This is one of those button locks. You have no idea what the ");
            text.push("combinaison is. You wish you could somehow see where the dirty ");
            text.push("firgerprints were. Maybe that would help.");
            text.push("Press R to Return roaming your cell.");
            break;
        case STATE_CELL_MIRROR:
            text.push("You are still in your cell and STILL want to escape. There are ");
            text.push("some dirty sheets on the bed, a mark where the mirror was,");
            text.push("and that pesky door is still there, and firmly locked.");
            text.push("Press S to view Sheets");
            text.push("Press L to look at the Lock");
            break;
        case STATE_SHEETS_1:
            text.push("Holding a mirror in your hand doesn't make the sheets look ");
            text.push("any better.");
            text.push("Press R to Return");
            break;
        case STATE_LOCK_1:
            text.push("You carefully but your mirror through the bars, and turn it around ");
            text.push("so you can see the lock. You canjust make out fingerprints around ");
            text.push("the buttons. You press dirty buttons, and hear the click.");
            text.push("Press O to Open");
            text.push("Press R to Return");
            break;
        case STATE_FREEDOM:
            text.push("You are FREE !");
            text.push("Press P to Play again");
            break;
    }
}


// States

function stateCell() {

    if (pressedKey == 'S') {
        currentState = STATE_SHEETS_0;
    }
    else if (pressedKey == 'M') {
        currentState = STATE_MIRROR;
    }
    else if (pressedKey == 'L') {
        currentState = STATE_LOCK_0;
    }
}

function stateSheets0() {
    if (pressedKey == 'R') {
        currentState = STATE_CELL;
    }
}

function stateMirror() {
    if (pressedKey == 'R') {
        currentState = STATE_CELL;
    }
    if (pressedKey == 'T') {
        currentState = STATE_CELL_MIRROR;
    }
}

function stateLock0() {
    if (pressedKey == 'R') {
        currentState = STATE_CELL;
    }
}

function stateCellMirror() {
    if (pressedKey == 'S') {
        currentState = STATE_SHEETS_1;
    }
    else if (pressedKey == 'L') {
        currentState = STATE_LOCK_1;
    }
}

function stateSheets1() {
    if (pressedKey == 'R') {
        currentState = STATE_CELL_MIRROR;
    }
}

function stateLock1() {
    if (pressedKey == 'O') {
        currentState = STATE_FREEDOM;
    }
    else if (pressedKey == 'R') {
        currentState = STATE_CELL_MIRROR;
    }
}

function stateFreedom() {
    if (pressedKey == 'P') {
        currentState = STATE_CELL;
    }
}

/**
 * Reset text related data for a new draw
 */
function reset() {
    resetKey();
    resetText()
}

function resetKey() {
    pressedKey = '';
}

function resetText() {
    text.splice(0, text.length);
}

/**
 * Draw loop
 */
function draw() {
    drawBackground();
    drawText();
}

function drawBackground() {
    canvasContext.fillStyle = BACKGROUND_STYLE;
    canvasContext.fillRect(0, 0, gameWidth, gameHeight);
}

function drawText() {
    canvasContext.fillStyle = "white";
    canvasContext.font = "24px Arial";
    for (let i = 0; i < text.length; i++) {
        canvasContext.fillText(text[i], 50, 50 + i * 40);
    }
}
