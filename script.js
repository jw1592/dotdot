const animals = ["tiger", "elephant", "lion", "zebra", "giraffe", "monkey", "panda"]; // 더 추가 가능
const dotWrapper = document.querySelector('.dotWrapper');
const localDots = new Map();
const remoteDots = new Map();
const localId = Date.now().toString();

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

  const nickname = document.createElement("span");
  nickname.className = "nickname";
  nickname.innerText = nicknameText || generateRandomAnimal();
  dot.appendChild(nickname);

  const size = 10; // 기본 크기 변경 가능
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.backgroundColor = color || `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;

  return dot;
}

function moveDotTo(dot, x, y) {
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
}

function setupMyDot() {
  const myDot = createDot(localId);
  dotWrapper.appendChild(myDot);
  localDots.set(localId, myDot);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  moveDotTo(myDot, centerX, centerY);

  let clickX, clickY;
  document.addEventListener("click", (e) => {
    clickX = e.clientX;
    clickY = e.clientY;
  });

  const speed = 20; // px per second
  const updateRate = 1000 / 60; // 60fps
  setInterval(() => {
    if (typeof clickX !== "undefined" && typeof clickY !== "undefined") {
      const rect = myDot.getBoundingClientRect();
      const currentX = rect.x;
      const currentY = rect.y;

      const distanceX = clickX - currentX;
      const distanceY = clickY - currentY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance > 1) {
        const moveX = currentX + distanceX * speed * updateRate / 1000 / distance;
        const moveY = currentY + distanceY * speed * updateRate / 1000 / distance;
        moveDotTo(myDot, moveX, moveY);
        broadcastDotMovement(myDot);
      }
    }
  }, updateRate);
}

// ... (WebRTC-related code) ...

document.addEventListener('DOMContentLoaded', () => {
  setupMyDot();
  hackySignaling();
});
