const speed = 20; // px per second
const updateRate = 1000 / 60; // 60fps

function moveDotTo(dot, x, y) {
  dot.style.left = `${x - dot.clientWidth / 2}px`;
  dot.style.top = `${y - dot.clientHeight / 2}px`;
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
}

// ... (이전 코드와 동일한 WebRTC 관련 코드) ...

document.addEventListener('DOMContentLoaded', () => {
  setupMyDot();
  hackySignaling();
});
