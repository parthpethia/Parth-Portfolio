// ===== Active nav link on click =====
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links a.active")?.classList.remove("active");
    link.classList.add("active");
  });
});

// ===== Parallax-style subtle mouse movement on hero visual =====
const heroVisual = document.querySelector(".hero-visual");

document.addEventListener("mousemove", (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx; // -1 to 1
  const dy = (e.clientY - cy) / cy;

  // Slight parallax on person + blob
  if (heroVisual) {
    heroVisual.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
  }

  // Stronger parallax on each icon (depth effect)
  document.querySelectorAll(".float-icon").forEach((icon, i) => {
    const factor = 10 + i * 4;
    icon.style.marginLeft = `${dx * factor}px`;
    icon.style.marginTop = `${dy * factor}px`;
  });
});

// ===== Experience toggle switch =====
const expToggle = document.getElementById('expToggle');
const expLabels = document.querySelectorAll('.exp-toggle-label');
const panelCreative = document.getElementById('panel-creative');
const panelTechnical = document.getElementById('panel-technical');

function switchExperience(toTechnical) {
  if (toTechnical) {
    expToggle.classList.add('active');
    panelCreative.classList.remove('active');
    panelTechnical.classList.remove('active');
    void panelTechnical.offsetWidth;
    panelTechnical.classList.add('active');
    expLabels[0].classList.remove('active');
    expLabels[1].classList.add('active');
  } else {
    expToggle.classList.remove('active');
    panelTechnical.classList.remove('active');
    panelCreative.classList.remove('active');
    void panelCreative.offsetWidth;
    panelCreative.classList.add('active');
    expLabels[1].classList.remove('active');
    expLabels[0].classList.add('active');
  }
}

if (expToggle) {
  expToggle.addEventListener('click', () => {
    const isNowTechnical = !expToggle.classList.contains('active');
    switchExperience(isNowTechnical);
  });
}

expLabels.forEach((label) => {
  label.addEventListener('click', () => {
    switchExperience(label.dataset.tab === 'technical');
  });
});
