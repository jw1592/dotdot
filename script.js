const dot = document.getElementById("dot");
let speed = 30; // Default speed
let mouseX = 0;
let mouseY = 0;
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let lastTimestamp = 0;

// Set dot to the center of the screen initially
dot.style.left = currentX - dot.offsetWidth / 2 + "px";
dot.style.top = currentY - dot.offsetHeight / 2 + "px";

document.addEventListener("mousemove", (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
});

function updateDotPosition(timestamp) {
    const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
    lastTimestamp = timestamp;

    const distanceX = mouseX - currentX;
    const distanceY = mouseY - currentY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance > 0) {
        const moveX = (distanceX / distance) * speed * deltaTime;
        const moveY = (distanceY / distance) * speed * deltaTime;
        currentX += moveX;
        currentY += moveY;

        dot.style.left = currentX - dot.offsetWidth / 2 + "px";
        dot.style.top = currentY - dot.offsetHeight / 2 + "px";
    }

    requestAnimationFrame(updateDotPosition);
}

requestAnimationFrame(updateDotPosition);

const speedSlider = document.getElementById("speed-slider");
const speedDisplay = document.getElementById("speed");
const colorPicker = document.getElementById("color-picker");
const colorText = document.getElementById("color-text");
const sizeSlider = document.getElementById("size-slider");
const sizeDisplay = document.getElementById("size");

speedSlider.addEventListener("input", (event) => {
    speed = parseInt(event.target.value, 10);
    speedDisplay.innerText = speed;
});

colorPicker.addEventListener("input", (event) => {
    dot.style.backgroundColor = event.target.value;
    colorText.innerText = event.target.value;
});

sizeSlider.addEventListener("input", (event) => {
    const newSize = parseInt(event.target.value, 10);
    dot.style.width = newSize + "px";
    dot.style.height = newSize + "px";
    sizeDisplay.innerText = newSize;
});
