// Celebration Effects
function createCelebration() {
  const container = document.getElementById("celebration");

  // Energy Pulses
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const pulse = document.createElement("div");
      pulse.style.cssText = `
position: absolute;
top: 50%;
left: 50%;
width: 100px;
height: 100px;
border: 3px solid rgba(102, 126, 234, 0.6);
border-radius: 50%;
transform: translate(-50%, -50%);
animation: expandPulse 2s ease-out forwards;
`;
      container.appendChild(pulse);
      setTimeout(() => pulse.remove(), 2000);
    }, i * 250);
  }

  // Geometric Shards
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      const shard = document.createElement("div");
      const angle = (Math.PI * 2 * i) / 24;
      const distance = 200 + Math.random() * 100;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      shard.style.cssText = `
position: absolute;
left: 50%;
top: 50%;
width: 4px;
height: 40px;
background: linear-gradient(to bottom, rgba(102, 126, 234, 0.8), transparent);
clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
transform: translate(-50%, -50%);
animation: shardFly 1.5s ease-out forwards;
--tx: ${tx}px;
--ty: ${ty}px;
--rotate: ${Math.random() * 720 - 360}deg;
`;
      container.appendChild(shard);
      setTimeout(() => shard.remove(), 1500);
    }, 200);
  }

  // Light Beams
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const beam = document.createElement("div");
      beam.style.cssText = `
position: absolute;
left: ${Math.random() * 100}%;
top: 50%;
width: 2px;
height: 0;
background: linear-gradient(to bottom, rgba(102, 126, 234, 0.6), transparent);
transform: rotate(${Math.random() * 360}deg);
transform-origin: top;
animation: beamGrow 1.2s ease-out forwards;
`;
      container.appendChild(beam);
      setTimeout(() => beam.remove(), 1200);
    }, i * 80);
  }
}

// Add celebration keyframes
const style = document.createElement("style");
style.textContent = `
@keyframes expandPulse {
to { width: 1000px; height: 1000px; opacity: 0; border-width: 0; }
}
@keyframes shardFly {
to { 
transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(var(--rotate)); 
opacity: 0; 
}
}
@keyframes beamGrow {
0% { height: 0; opacity: 0; }
30% { opacity: 1; }
100% { height: 150px; opacity: 0; }
}
`;
document.head.appendChild(style);

// Trigger celebration
setTimeout(() => {
  createCelebration();
}, 2800);

// Hide loading screen
setTimeout(() => {
  document.getElementById("loading").classList.add("fade-out");
  setTimeout(() => {
    document.getElementById("celebration").style.display = "none";
  }, 800);
}, 4000);

// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
const trail = document.querySelector(".cursor-trail");
let cursorX = 0,
  cursorY = 0;
let trailX = 0,
  trailY = 0;

document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function updateCursor() {
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  trailX += (cursorX - trailX) * 0.2;
  trailY += (cursorY - trailY) * 0.2;
  trail.style.left = trailX + "px";
  trail.style.top = trailY + "px";

  requestAnimationFrame(updateCursor);
}
updateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll(
  ".btn, .event-card, .feature-card",
);
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// Mouse parallax for title
const mainTitle = document.getElementById("mainTitle");
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  if (mainTitle) {
    mainTitle.style.transform = `translateX(${x}px) translateY(${y}px)`;
  }
});

// 3D tilt effect for cards
const cards = document.querySelectorAll(".event-card, .feature-card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `translateY(-20px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Animated background
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 1000,
    vz: Math.random() * 2 + 1,
  });
}

function animateBackground() {
  ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.z -= p.vz;
    if (p.z <= 0) {
      p.z = 1000;
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
    }

    const scale = 1000 / (1000 + p.z);
    const x = (p.x - canvas.width / 2) * scale + canvas.width / 2;
    const y = (p.y - canvas.height / 2) * scale + canvas.height / 2;
    const size = scale * 2;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
    gradient.addColorStop(0, `rgba(102, 126, 234, ${scale * 0.8})`);
    gradient.addColorStop(0.5, `rgba(118, 75, 162, ${scale * 0.4})`);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateBackground);
}

animateBackground();

// Resize handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
