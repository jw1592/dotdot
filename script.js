const animals = ["tiger", "elephant", "lion", "zebra", "giraffe", "monkey", "panda"]; //add back
const dotWrapper = document.querySelector('.dotWrapper');
const localDots = new Map();
const remoteDots = new Map();
const localId = Date.now().toString();
const myPeer = new Peer(localId);

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
    
    myPeer.on('open', id => {
        console.log('Peers connection opened with id:', id);
    });

    myPeer.on('connection', conn => {
        console.log('New peer connected:', conn.peer);

        const dot = createDot(conn.peer);
        dotWrapper.appendChild(dot);
        remoteDots.set(conn.peer, dot);

        conn.on('data', data => {
            if (data.type === "move-dot") {
                moveDotTo(dot, data.x, data.y);
            }
        });

        conn.on('close', () => {
            console.log('Peer connection closed:', conn.peer);
            dot.remove();
            remoteDots.delete(conn.peer);
        });
    });

    document.getElementById('send').addEventListener('click', () => {
        const targetId = document.getElementById('targetId').value;
        const conn = myPeer.connect(targetId);
        console.log('Peer connection opened:', targetId);
        
        conn.on('open', () => {
            const dot = createDot(targetId);
            dotWrapper.appendChild(dot);
            remoteDots.set(targetId, dot);

            conn.on('data', data => {
                if (data.type === "move-dot") {
                    moveDotTo(dot, data.x, data.y);
                }
            });

            conn.on('close', () => {
                console.log('Peer connection closed:', targetId);
                dot.remove();
                remoteDots.delete(targetId);
            });

            broadcastDotMovement(localDots.get(localId), conn);
        });
    });
});
