// Helper function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Random animal names
const animalNames = ['Dog', 'Cat', 'Elephant', 'Giraffe', 'Tiger', 'Lion', 'Panda', 'Zebra', 'Monkey', 'Squirrel', 'Kangaroo', 'Raccoon', 'Hippopotamus', 'Fox', 'Koala', 'Alligator', 'Penguin', 'Bear', 'Wolf', 'Deer'];

// Returns a random animal name
function getRandomAnimalName() {
    return animalNames[Math.floor(Math.random() * animalNames.length)];
}

// Assign a random color to the user's dot and create a name
const myDot = document.getElementById('myDot');
const myColor = getRandomColor();
const myName = getRandomAnimalName();
myDot.style.backgroundColor = myColor;

// Create dot with a random name
function createDot(id, color, name) {
    const dotContainer = document.createElement("div");
    dotContainer.id = id;
    const newDot = document.createElement("div");
    newDot.className = "dot";
    newDot.style.backgroundColor = color;
    dotContainer.appendChild(newDot);
    const dotName = document.createElement("div");
    dotName.className = "dotName";
    dotName.innerText = name;
    dotContainer.appendChild(dotName);
    return dotContainer;
}

// Populate the otherDots container with the new dot
const otherDots = document.getElementById("otherDots");
function addUserDot(id, color, name) {
    const newDot = createDot(id, color, name);
    otherDots.appendChild(newDot);
    return newDot;
}

// Update dot's position
function updateDotPosition(dot, x, y) {
    dot.style.left = x + "px";
    dot.style.top = y + "px";
}

// Initialize context menu
const speedSlider = document.getElementById("speed-slider");
const speedDisplay = document.getElementById("speed");
const sizeSlider = document.getElementById("size-slider");
const sizeDisplay = document.getElementById("size");
const colorPicker = document.getElementById("color-picker");
const colorText = document.getElementById("color-text");

speedSlider.addEventListener("input", (event) => {
    speed = parseInt(event.target.value, 10);
    speedDisplay.innerText = speed;
});

sizeSlider.addEventListener("input", (event) => {
    const newSize = parseInt(event.target.value, 10);
    myDot.style.width = newSize + "px";
    myDot.style.height = newSize + "px";
    sizeDisplay.innerText = newSize;
});

colorPicker.addEventListener("input", (event) => {
    myDot.style.backgroundColor = event.target.value;
    myColor = event.target.value;
    colorText.innerText = event.target.value;
});

// Your previous code here...

// ...
const peerInfo = {
    id: Date.now(),
    color: myColor,
    name: myName,
};

// Send dot's position and color to connected peers
function sendDotData(x, y, color, name) {
    if (dataChannel && dataChannel.readyState === 'open') {
        const data = JSON.stringify({x, y, color, name, id: peerInfo.id});
        dataChannel.send(data);
    }
}

// Receive and handle the message
function receiveMessage(event) {
    const payload = JSON.parse(event.data);
    let otherDot = document.getElementById(payload.id);
    if (!otherDot) {
        otherDot = addUserDot(payload.id, payload.color, payload.name);
    }
    updateDotPosition(otherDot, payload.x, payload.y);
}

// Your previous code here...

// 마우스 이벤트 리스너를 변경하여 위치와 색상을 전송하게 만듭니다.
document.addEventListener("mousemove", (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
    sendDotData(mouseX, mouseY, myColor, myName);
});

// Your previous code here...
