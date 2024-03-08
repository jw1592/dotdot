const dotWrapper = document.querySelector('.dotWrapper');
const localDots = new Map();
const remoteDots = new Map();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomAnimal() {
    const index = getRandomInt(0, animals.length - 1);
    return animals[index] + getRandomInt(10000, 99999);
}

function createDot(id, nicknameText, color) {
    const dot = document.createElement("div");
    dot.id = id;
    dot.className = "dot";

    if (id === localId) {
        dot.classList.add("local");
    }

    const nickname = document.createElement("span");
    nickname.className = "nickname";
    nickname.innerText = nicknameText || generateRandomAnimal();
    dot.appendChild(nickname);

    const size = 10;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.backgroundColor = color || `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;

    return dot;
}

function moveDotTo(dot, x, y) {
    dot.style.left = `${x - dot.clientWidth / 2}px`;
    dot.style.top = `${y - dot.clientHeight / 2}px`;
}

const speed = 20;
const updateRate = 1000 / 60;

function setupMyDot() {
    const myDot = createDot(localId);
    dotWrapper.appendChild(myDot);
    localDots.set(localId, myDot);
}

document.addEventListener('DOMContentLoaded', () => {
    setupMyDot();
    
    // Add WebRTC code for peer-to-peer connection
});
