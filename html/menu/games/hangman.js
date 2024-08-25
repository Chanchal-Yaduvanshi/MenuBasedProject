const wordList = ['abruptly', 'absurd', 'abyss', 'affix', 'askew', 'avenue', 'awkward', 'axiom', 'azure', 'bagpipes', 'bandwagon', 'banjo', 'bayou', 'beekeeper', 'bikini', 'blitz', 'blizzard', 'boggle', 'bookworm', 'boxcar', 'boxful', 'buckaroo', 'buffalo', 'buffoon', 'buxom', 'buzzard', 'buzzing', 'buzzwords', 'caliph', 'cobweb', 'cockiness', 'croquet', 'crypt', 'curacao', 'cycle', 'daiquiri', 'dirndl', 'disavow', 'dizzying', 'duplex', 'dwarves', 'embezzle', 'equip', 'espionage', 'euouae', 'exodus', 'faking', 'fishhook', 'fixable', 'fjord', 'flapjack', 'flopping', 'fluffiness', 'flyby', 'foxglove', 'frazzled', 'frizzled', 'fuchsia', 'funny', 'gabby', 'galaxy', 'galvanize', 'gazebo', 'giaour', 'gizmo', 'glowworm', 'glyph', 'gnarly', 'gnostic', 'gossip', 'grogginess', 'haiku', 'haphazard', 'hyphen', 'iatrogenic', 'icebox', 'injury', 'ivory', 'ivy', 'jackpot', 'jaundice', 'jawbreaker', 'jaywalk', 'jazziest', 'jazzy', 'jelly', 'jigsaw', 'jinx', 'jiujitsu', 'jockey', 'jogging', 'joking', 'jovial', 'joyful', 'juicy', 'jukebox', 'jumbo', 'kayak', 'kazoo', 'keyhole', 'khaki', 'kilobyte', 'kiosk', 'kitsch', 'kiwifruit', 'klutz', 'knapsack', 'larynx', 'lengths', 'lucky', 'luxury', 'lymph', 'marquis', 'matrix', 'megahertz', 'microwave', 'mnemonic', 'mystify', 'naphtha', 'nightclub', 'nowadays', 'numbskull', 'nymph', 'onyx', 'ovary', 'oxidize', 'oxygen', 'pajama', 'peekaboo', 'phlegm', 'pixel', 'pizazz', 'pneumonia', 'polka', 'pshaw', 'psyche', 'puppy', 'puzzling', 'quartz', 'queue', 'quips', 'quixotic', 'quiz', 'quizzes', 'quorum', 'razzmatazz', 'rhubarb', 'rhythm', 'rickshaw', 'schnapps', 'scratch', 'shiv', 'snazzy', 'sphinx', 'spritz', 'squawk', 'staff', 'strength', 'strengths', 'stretch', 'stronghold', 'stymied', 'subway', 'swivel', 'syndrome', 'thriftless', 'thumbscrew', 'topaz', 'transcript', 'transgress', 'transplant', 'triphthong', 'twelfth', 'twelfths', 'unknown', 'unworthy', 'unzip', 'uptown', 'vaporize', 'vixen', 'vodka', 'voodoo', 'vortex', 'voyeurism', 'walkway', 'waltz', 'wave', 'wavy', 'waxy', 'wellspring', 'wheezy', 'whiskey', 'whizzing', 'whomever', 'wimpy', 'witchcraft', 'wizard', 'woozy', 'wristwatch', 'wyvern', 'xylophone', 'yachtsman', 'yippee', 'yoked', 'youthful', 'yummy', 'zephyr', 'zigzag', 'zigzagging', 'zilch', 'zipper', 'zodiac', 'zombie'];

const stages = [
    `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
    =========
    `, 
    `
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
    =========
    `, 
    `
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
    =========
    `, 
    `
    +---+
    |   |
    O   |
   /|   |
        |
        |
    =========
    `, 
    `
    +---+
    |   |
    O   |
    |   |
        |
        |
    =========
    `, 
    `
    +---+
    |   |
    O   |
        |
        |
        |
    =========
    `, 
    `
    +---+
    |   |
        |
        |
        |
        |
    =========
    `
];

const logo = `
 _                                             
| |                                            
| |__   __ _ _ __   __ _ _ __ ___   __ _ _ __  
| '_ \\ / _\` | '_ \\ / _\` | '_ \` _ \\ / _\` | '_ \\ 
| | | | (_| | | | | (_| | | | | | | (_| | | | |
|_| |_|\\__,_|_| |_|\\__, |_| |_| |_|\\__,_|_| |_|
                    __/ |                      
                   |___/    
`;

let chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
let display = Array(chosenWord.length).fill('_');
let lives = 6;
let guessedLetters = [];
let endOfGame = false;

const displayWordElement = document.getElementById('display-word');
const livesElement = document.getElementById('lives');
const messageElement = document.getElementById('message');
const hangmanArtElement = document.getElementById('hangman-art');
const guessedLettersElement = document.getElementById('guessed-letters');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const restartButton = document.getElementById('restart-button');


// Function to update the display of guessed letters
function updateGuessedLetters(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        guessedLettersElement.textContent = `Guessed Letters: ${guessedLetters.join(', ')}`;
    }
}

// Function to handle a guess
function handleGuess() {
    if (endOfGame) return;

    const guess = guessInput.value.toLowerCase();
    guessInput.value = ''; // Clear the input field

    if (!guess || guessedLetters.includes(guess)) {
        messageElement.textContent = guess ? `You've already guessed '${guess}'` : 'Please enter a letter';
        return;
    }

    updateGuessedLetters(guess);

    let correctGuess = false;
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === guess) {
            display[i] = guess;
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        lives--;
        if (lives === 0) {
            endOfGame = true;
            messageElement.textContent = `You lose! The word was "${chosenWord}".`;
        } else {
            messageElement.textContent = `Incorrect guess. You lose a life.`;
        }
    } else if (!display.includes('_')) {
        endOfGame = true;
        messageElement.textContent = `Congratulations! You won the game!`;
    }

    displayWordElement.textContent = display.join(' ');
    livesElement.textContent = `Lives: ${lives}`;
    hangmanArtElement.textContent = stages[lives];
}

// Function to restart the game
function restartGame() {
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    display = Array(chosenWord.length).fill('_');
    lives = 6;
    guessedLetters = [];
    endOfGame = false;

    displayWordElement.textContent = display.join(' ');
    livesElement.textContent = `Lives: ${lives}`;
    guessedLettersElement.textContent = `Guessed Letters:`;
    messageElement.textContent = '';
    hangmanArtElement.textContent = stages[lives];
}

// Event listeners
guessButton.addEventListener('click', handleGuess);
restartButton.addEventListener('click', restartGame);

// Initialize the game on page load
restartGame();

document.getElementById('logo').textContent = logo;
updateDisplay();

