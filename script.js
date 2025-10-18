// Loading Screen
setTimeout(() => {
  document.getElementById("resultText").classList.add("show");
  setTimeout(() => startCelebration(), 800);
}, 2500);

setTimeout(() => {
  document.getElementById("loadingScreen").classList.add("hidden");
  setTimeout(() => {
    document.getElementById("celebrationContainer").style.display = "none";
  }, 1000);
}, 4500);

// Celebration Effects
function startCelebration() {
  const container = document.getElementById("celebrationContainer");

  for (let i = 0; i < 5; i++) {
    setTimeout(() => createEnergyWave(container), i * 200);
  }

  setTimeout(() => createParticleBurst(container), 300);

  for (let i = 0; i < 20; i++) {
    setTimeout(() => createLightRay(container), i * 80);
  }

  for (let i = 0; i < 15; i++) {
    setTimeout(() => createGlowOrb(container), i * 150);
  }
}

function createEnergyWave(container) {
  const wave = document.createElement("div");
  wave.className = "energy-wave";
  const colors = [
    "rgba(102, 126, 234, 0.6)",
    "rgba(118, 75, 162, 0.6)",
    "rgba(240, 147, 251, 0.6)",
  ];
  wave.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
  container.appendChild(wave);
  setTimeout(() => wave.remove(), 1500);
}

function createParticleBurst(container) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const colors = ["#667eea", "#764ba2", "#f093fb", "#4facfe"];

  for (let i = 0; i < 60; i++) {
    const particle = document.createElement("div");
    particle.className = "particle-burst";
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";

    const angle = (Math.PI * 2 * i) / 60;
    const velocity = Math.random() * 200 + 150;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.setProperty("--tx", tx + "px");
    particle.style.setProperty("--ty", ty + "px");
    particle.style.animation = "particleExpand 1.5s ease-out forwards";

    container.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
  }
}

function createLightRay(container) {
  const ray = document.createElement("div");
  ray.className = "light-ray";
  ray.style.left = Math.random() * 100 + "%";
  ray.style.top = "50%";
  ray.style.transform = "rotate(" + Math.random() * 360 + "deg)";
  const colors = [
    "linear-gradient(to bottom, rgba(102, 126, 234, 0.8), transparent)",
    "linear-gradient(to bottom, rgba(240, 147, 251, 0.8), transparent)",
    "linear-gradient(to bottom, rgba(79, 172, 254, 0.8), transparent)",
  ];
  ray.style.background = colors[Math.floor(Math.random() * colors.length)];
  container.appendChild(ray);
  setTimeout(() => ray.remove(), 2000);
}

function createGlowOrb(container) {
  const orb = document.createElement("div");
  orb.className = "glow-orb";
  const startX = window.innerWidth / 2;
  const startY = window.innerHeight / 2;
  orb.style.left = startX + "px";
  orb.style.top = startY + "px";

  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 300 + 200;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;

  orb.style.setProperty("--tx", tx + "px");
  orb.style.setProperty("--ty", ty + "px");

  container.appendChild(orb);
  setTimeout(() => orb.remove(), 3000);
}

// Lorenz Attractor (Chaos Theory)
const chaosCanvas = document.getElementById("chaosCanvas");
const chaosCtx = chaosCanvas.getContext("2d");
chaosCanvas.width = window.innerWidth;
chaosCanvas.height = window.innerHeight;

class LorenzAttractor {
  constructor() {
    this.x = 0.1;
    this.y = 0;
    this.z = 0;
    this.a = 10;
    this.b = 28;
    this.c = 8.0 / 3.0;
    this.dt = 0.005;
    this.points = [];
    this.maxPoints = 2000;
    this.hue = Math.random() * 60 + 220;
  }

  update() {
    const dx = this.a * (this.y - this.x) * this.dt;
    const dy = (this.x * (this.b - this.z) - this.y) * this.dt;
    const dz = (this.x * this.y - this.c * this.z) * this.dt;

    this.x += dx;
    this.y += dy;
    this.z += dz;

    this.points.push({ x: this.x, y: this.y, z: this.z });
    if (this.points.length > this.maxPoints) {
      this.points.shift();
    }
  }

  draw() {
    const scale = 8;
    const centerX = chaosCanvas.width / 2;
    const centerY = chaosCanvas.height / 2;

    chaosCtx.beginPath();
    this.points.forEach((point, i) => {
      const screenX = centerX + point.x * scale;
      const screenY = centerY + point.y * scale;

      if (i === 0) {
        chaosCtx.moveTo(screenX, screenY);
      } else {
        chaosCtx.lineTo(screenX, screenY);
      }
    });

    const alpha = 0.5;
    chaosCtx.strokeStyle = "hsla(" + this.hue + ", 70%, 60%, " + alpha + ")";
    chaosCtx.lineWidth = 1;
    chaosCtx.stroke();
  }
}

const attractor1 = new LorenzAttractor();
const attractor2 = new LorenzAttractor();
attractor2.x = -0.1;
attractor2.hue = 260;
const attractors = [attractor1, attractor2];

function animateChaos() {
  chaosCtx.fillStyle = "rgba(0, 0, 0, 0.02)";
  chaosCtx.fillRect(0, 0, chaosCanvas.width, chaosCanvas.height);

  attractors.forEach((attractor) => {
    attractor.update();
    attractor.draw();
  });

  requestAnimationFrame(animateChaos);
}

animateChaos();

// Minimal Particle Background
const canvas = document.getElementById("canvas3d");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class MinimalParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(102, 126, 234, 0.3)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const minimalParticles = Array.from(
  { length: 50 },
  () => new MinimalParticle(),
);

function animateMinimal() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  minimalParticles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateMinimal);
}

animateMinimal();

// Animated Graph at Footer
const graphCanvas = document.getElementById("graphCanvas");
const graphCtx = graphCanvas.getContext("2d");
graphCanvas.width = graphCanvas.offsetWidth;
graphCanvas.height = graphCanvas.offsetHeight;

let graphTime = 0;
const graphPoints = [];
const maxGraphPoints = 200;

function drawGraph() {
  graphCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
  graphCtx.fillRect(0, 0, graphCanvas.width, graphCanvas.height);

  // Add new point
  const newY =
    graphCanvas.height / 2 +
    Math.sin(graphTime * 0.05) * 60 +
    Math.cos(graphTime * 0.03) * 40 +
    Math.sin(graphTime * 0.02) * 30;

  graphPoints.push(newY);
  if (graphPoints.length > maxGraphPoints) {
    graphPoints.shift();
  }

  // Draw grid lines
  graphCtx.strokeStyle = "rgba(102, 126, 234, 0.1)";
  graphCtx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = (graphCanvas.height / 4) * i;
    graphCtx.beginPath();
    graphCtx.moveTo(0, y);
    graphCtx.lineTo(graphCanvas.width, y);
    graphCtx.stroke();
  }

  // Draw the graph line
  graphCtx.beginPath();
  graphCtx.strokeStyle = "rgba(102, 126, 234, 0.8)";
  graphCtx.lineWidth = 2;

  const pointSpacing = graphCanvas.width / maxGraphPoints;
  graphPoints.forEach((y, i) => {
    const x = i * pointSpacing;
    if (i === 0) {
      graphCtx.moveTo(x, y);
    } else {
      graphCtx.lineTo(x, y);
    }
  });
  graphCtx.stroke();

  // Draw gradient fill under line
  if (graphPoints.length > 1) {
    graphCtx.lineTo(graphCanvas.width, graphCanvas.height);
    graphCtx.lineTo(0, graphCanvas.height);
    graphCtx.closePath();

    const gradient = graphCtx.createLinearGradient(0, 0, 0, graphCanvas.height);
    gradient.addColorStop(0, "rgba(102, 126, 234, 0.3)");
    gradient.addColorStop(1, "rgba(102, 126, 234, 0)");
    graphCtx.fillStyle = gradient;
    graphCtx.fill();
  }

  // Draw moving dots on the line
  if (graphPoints.length > 0) {
    for (let i = 0; i < 3; i++) {
      const idx = Math.floor(graphPoints.length * (i / 3));
      if (idx < graphPoints.length) {
        const x = idx * pointSpacing;
        const y = graphPoints[idx];

        graphCtx.beginPath();
        graphCtx.arc(x, y, 4, 0, Math.PI * 2);
        graphCtx.fillStyle = "rgba(240, 147, 251, 0.8)";
        graphCtx.fill();

        graphCtx.beginPath();
        graphCtx.arc(x, y, 8, 0, Math.PI * 2);
        graphCtx.strokeStyle = "rgba(240, 147, 251, 0.4)";
        graphCtx.lineWidth = 2;
        graphCtx.stroke();
      }
    }
  }

  graphTime++;
  requestAnimationFrame(drawGraph);
}

drawGraph();

// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link, .dropdown-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Resize handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  chaosCanvas.width = window.innerWidth;
  chaosCanvas.height = window.innerHeight;
  graphCanvas.width = graphCanvas.offsetWidth;
  graphCanvas.height = graphCanvas.offsetHeight;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
// Tab switching functionality for footer buttons
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-tab");

    // Remove active states
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active to selected
    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});
