const words = [
    "array", "document", "event", "browser", "design", "challenge",
    "function", "variable", "object", "element", "input", "output",
    "style", "script", "layout", "interaction", "performance", "debug",
    "console", "network", "response", "request", "protocol", "server",
    "client", "database", "query", "loop", "condition", "expression",
    "parameter", "argument", "callback", "promise", "async", "await",
    "render", "component", "module", "package", "import", "export",
    "framework", "library", "plugin", "dependency", "version", "commit",
    "branch", "merge", "pull", "push", "clone", "fork", "repository",
    "syntax", "operator", "keyword", "boolean", "string", "number",
    "integer", "float", "decimal", "hexadecimal", "binary", "looping",
    "iteration", "recursion", "stack", "queue", "tree", "graph",
    "node", "edge", "vertex", "algorithm", "search", "sort", "filter",
    "map", "reduce", "index", "pointer", "reference", "scope", "closure",
    "context", "this", "prototype", "inheritance", "encapsulation",
    "polymorphism", "abstraction", "interface", "class", "objectify",
    "serialize", "deserialize", "token", "cookie", "session", "cache",
    "localstorage", "sessionstorage", "animation", "transition",
    "transform", "keyframe", "gradient", "shadow", "opacity", "z-index",
    "position", "margin", "padding", "border", "radius", "flex", "grid",
    "align", "justify", "overflow", "visibility", "display", "block",
    "inline", "relative", "absolute", "fixed", "sticky", "hover",
    "focus", "active", "disabled", "checked", "selected", "option",
    "label", "form", "submit", "reset", "validate", "pattern", "regex",
    "match", "replace", "split", "concat", "join", "slice", "splice",
    "push", "pop", "shift", "unshift", "includes", "indexof", "find",
    "findindex", "some", "every", "length", "charat", "charcodeat",
    "touppercase", "tolowercase", "trim", "padstart", "padend", "repeat",
    "template", "literal", "expression", "interpolation", "dynamic",
    "static", "responsive", "adaptive", "viewport", "media", "query",
    "breakpoint", "transitionend", "animationend", "mouseenter",
    "mouseleave", "keydown", "keyup", "keypress", "mousedown",
    "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove",
    "gesture", "swipe", "pinch", "zoom", "scroll", "wheel", "drag",
    "drop", "resize", "orientation", "alert", "prompt", "confirm",
    "debugger", "exception", "error", "warning", "info", "log", "trace",
    "profile", "performance", "timeline", "memory", "heap", "stacktrace",
    "eventloop", "callbackqueue", "microtask", "macrotask", "tick",
    "frame", "fps", "repaint", "reflow", "paint", "composition", "gpu",
    "cpu", "thread", "asynchronous", "synchronous", "blocking",
    "nonblocking", "concurrent", "parallel", "iteration", "enumeration",
    "generator", "yield", "symbol", "bigint", "json", "xml", "html",
    "css", "javascript", "typescript", "babel", "webpack", "parcel",
    "rollup", "vite", "node", "npm", "yarn", "pnpm", "cli", "terminal",
    "shell", "command", "scriptfile", "batch", "powershell", "gitignore",
    "license", "readme", "contributing", "issue", "pullrequest",
    "milestone", "release", "tag", "changelog", "ci", "cd", "pipeline",
    "workflow", "action", "trigger", "eventhandler", "listener", "observer",
    "mutation", "intersection", "resizeobserver", "proxy", "reflect",
    "defineproperty", "get", "set", "constructor", "super", "extends",
    "new", "instanceof", "typeof", "void", "delete", "return", "yield",
    "break", "continue", "switch", "case", "default", "try", "catch",
    "finally", "throw", "import", "export", "await", "async", "debug",
    "performance", "benchmark", "optimization", "refactor", "lint",
    "formatter", "prettier", "eslint", "stylelint", "coverage", "test",
    "unit", "integration", "e2e", "mock", "stub", "spy", "assert", "expect"
];

let currentWord = "";
let score = 0;
let totalTyped = 0;
let correctTyped = 0;
let timeLeft = 90;
let timer;
let gameRunning = false;
let streak = 0;
const highScore = localStorage.getItem("highScore") || 0;

const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const timerFill = document.getElementById("timer-fill");
const startBtn = document.getElementById("start-btn");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const streakDisplay = document.getElementById("streak");
const highScoreDisplay = document.getElementById("high-score");

highScoreDisplay.textContent = `High Score: ${highScore}`;

function getRandomWord() {
    let level = Math.floor(score / 5);
    let filteredWords = words.filter(w => w.length <= 5 + level * 2);
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function startGame() {
    clearInterval(timer);
    score = 0;
    totalTyped = 0;
    correctTyped = 0;
    streak = 0;
    timeLeft = 60;
    gameRunning = true;
    wordInput.disabled = false;
    wordInput.value = "";
    wordInput.focus();


    scoreDisplay.textContent = `Score: ${score}`;
    wpmDisplay.textContent = `WPM: 0`;
    accuracyDisplay.textContent = `Accuracy: 100%`;
    streakDisplay.textContent = `Streak: 0`;
    timerDisplay.textContent = `${timeLeft}s`;
    timerFill.style.width = "100%";

    currentWord = getRandomWord();
    displayWord();


    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft}s`;
        timerFill.style.width = `${(timeLeft / 60) * 100}%`;
        updateStats();
        if(timeLeft <= 0) endGame();
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    gameRunning = false;
    wordInput.disabled = true;
    wordDisplay.textContent = `Time's up! Your score: ${score}`;
    if(score > highScore) {
        localStorage.setItem("highScore", score);
        highScoreDisplay.textContent = `High Score: ${score}`;
    }
}

function displayWord() {
    const inputValue = wordInput.value;
    let displayHTML = "";
    for(let i = 0; i < currentWord.length; i++) {
        if(inputValue[i] === currentWord[i]) {
            displayHTML += `<span style="color:green">${currentWord[i]}</span>`;
        } else if(inputValue[i]) {
            displayHTML += `<span style="color:red">${currentWord[i]}</span>`;
        } else {
            displayHTML += currentWord[i];
        }
    }
    wordDisplay.innerHTML = displayHTML;
}

function updateStats() {
    const minutes = (60 - timeLeft) / 60 || 1/60;
    const wpm = Math.floor(score / minutes);
    const accuracy = totalTyped ? Math.floor((correctTyped / totalTyped) * 100) : 100;
    wpmDisplay.textContent = `WPM: ${wpm}`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
    streakDisplay.textContent = `Streak: ${streak}`;
}

wordInput.addEventListener("input", () => {
    if(!gameRunning) return;
    displayWord();
    totalTyped++;
    let correct = true;

    for(let i=0; i<wordInput.value.length;i++){
        if(wordInput.value[i] !== currentWord[i]){
            correct = false;
        }
    }

    if(wordInput.value.trim() === currentWord) {
        score++;
        streak++;
        scoreDisplay.textContent = `Score: ${score}`;
        wordInput.value = "";
        currentWord = getRandomWord();
        displayWord();
        if(streak % 5 === 0){
            wordDisplay.classList.add("streak");
            setTimeout(()=> wordDisplay.classList.remove("streak"), 1000);
        }
    } else if(!correct) {
        streak = 0;
    }
});

startBtn.addEventListener("click", startGame);
wordInput.addEventListener("touchstart", () => wordInput.focus());