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
  dot.style.left = `${x - dot.clientWidth / 2}px`;
  dot.style.top = `${y - dot.clientHeight / 2}px`;
}

const speed = 20; // px per second
const updateRate = 1000 / 60; // 60fps

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

  setInterval(() => {
    if (typeof clickX !== "undefined" && typeof clickY !== "undefined") {
      const rect = myDot.getBoundingClientRect();
      const currentX = rect.x + myDot.clientWidth / 2;
      const currentY = rect.y + myDot.clientHeight / 2;

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

  window.addEventListener('resize', () => {
    const currentX = (window.innerWidth - myDot.clientWidth) / 2;
    const currentY = (window.innerHeight - myDot.clientHeight) / 2;
    moveDotTo(myDot, currentX, currentY);

    clickX = currentX + myDot.clientWidth / 2;
    clickY = currentY + myDot.clientHeight / 2;
  });
}

// WebRTC data channel functions
const peerConnections = new Map();
const dataChannels = new Map();

async function broacastHello() {
  console.log("Broadcasting hello");
}

async function createPeerConnection(targetId) {
  const peerConnection = new RTCPeerConnection();

  const dataChannel = peerConnection.createDataChannel('dotMovement');
  dataChannels.set(targetId, dataChannel);

  dataChannel.onopen = (e) => {
    console.log("Data channel opened:", targetId);
  }

  dataChannel.onclose = (e) => {
    console.log("Data channel closed:", targetId);
  }

  dataChannel.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "add-dot") {
      const dot = createDot(data.id, data.nickname, data.color);
      dotWrapper.appendChild(dot);
      remoteDots.set(data.id, dot);
    } else if (data.type === "move-dot") {
      const dot = remoteDots.get(data.id);
      if (dot) {
        moveDotTo(dot, data.x, data.y);
      }
    }
  }
  
  peerConnection.onicecandidate = ({candidate}) => {
    console.log("New ICE candidate:", candidate);
  }

  peerConnections.set(targetId, peerConnection);
  return peerConnection;
}

function broadcastDotMovement(myDot) {
  const rect = myDot.getBoundingClientRect();
  dataChannels.forEach((dataChannel, targetId) => {
    const data = {
      type: "move-dot",
      id: localId,
      x: rect.x,
      y: rect.y
    };
    dataChannel.send(JSON.stringify(data));
  });
}

// The following function is for demonstration purposes and is not a production ready signaling server solution
async function hackySignaling() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  const dummyId = data.id.toString();
  const peerConnection = await createPeerConnection(dummyId);
  
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  await new Promise(resolve => setTimeout(resolve, 2000)); // simulate signaling delay

  peerConnection.setRemoteDescription(peerConnection.localDescription);
  peerConnection.addIceCandidate(null);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  await new Promise(resolve => setTimeout(resolve, 2000)); // simulate signaling delay

  peerConnection.setRemoteDescription(peerConnection.localDescription);

  broacastHello();
}

document.addEventListener('DOMContentLoaded', () => {
  setupMyDot();
  hackySignaling();
});
