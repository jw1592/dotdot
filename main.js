// Main function to init the canvas and set event listeners
function init() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Add event listeners for mouse clicks and touch events
  canvas.addEventListener('click', moveDot);
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveDot(e.touches[0]);
  });
    
  // Code to initialize and handle peer connections using WebRTC goes here

}

// Function to generate a random color
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to generate a random nickname
function generateNickname() {
  const animals = ['tiger', 'lion', 'elephant', 'zebra', 'giraffe', 'hippo', 'wolf', 'bear', 'rabbit', 'deer', 'fox', 'racoon', 'frog', 'kangaroo', 'koala', 'monkey', 'panda', 'cheetah', 'jaguar', 'panther'];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomNum = Math.floor(Math.random() * 100000);
  return `${randomAnimal}${randomNum}`;
}

// Function to update dot position
function moveDot(e) {
  const x = e.clientX || e.pageX;
  const y = e.clientY || e.pageY;
  
  // Update dot position and send it to other peers through WebRTC

  // Code to update dot on peers canvas goes here
}

init();
