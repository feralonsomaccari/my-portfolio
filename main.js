const handleThemeToggle = () => {
  const body = document.querySelector(".wrapper");
  const texts = document.querySelectorAll(".text")
  const links = document.querySelectorAll(".link")
  const sections = document.querySelectorAll(".section")
  const LampAnimation = document.querySelector(".lamp");
  const bodyClasses = [...body.classList];

  const lightBgColor = "#fff"
  const darkBgColor = "#191919"

  if (bodyClasses.some(className => className === "body--dark")) {
    body.classList.remove("body--dark");
    document.documentElement.style.background = lightBgColor;
    body.classList.remove("body--dark");
  } else {
    document.documentElement.style.background = darkBgColor;
    body.classList.add("body--dark");;
  }

  texts.forEach(texts => {
    const textClasses = [...texts.classList];
    textClasses.some(className => className === "text--dark")
      ? texts.classList.remove("text--dark")
      : texts.classList.add("text--dark")
  })
  links.forEach(links => {
    const textClasses = [...links.classList];
    textClasses.some(className => className === "link--dark")
      ? links.classList.remove("link--dark")
      : links.classList.add("link--dark")
  });
  sections.forEach(links => {
    const textClasses = [...links.classList];
    textClasses.some(className => className === "section--dark")
      ? links.classList.remove("section--dark")
      : links.classList.add("section--dark")
  });

  [...LampAnimation.classList].some(className => className === "lamp--dark")
    ? LampAnimation.classList.remove("lamp--dark")
    : LampAnimation.classList.add("lamp--dark")

};

function triggerFireworks(event) {
  const fireworks = document.querySelector('.fireworks');
  const numParticles = 20;
  const colors = ['#ff0', '#ff6347', '#ff1493', '#00f', '#32cd32'];

  const { top, left, width, height } = event.target.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  for (let i = 0; i < numParticles; i++) {
    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 50;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    const particle = document.createElement('div');
    particle.classList.add('particle');

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = randomColor;

    particle.style.left = `${centerX + window.scrollX - 3}px`;
    particle.style.top = `${centerY + window.scrollY - 3}px`;
    particle.style.setProperty('--x', `${x}px`);
    particle.style.setProperty('--y', `${y}px`);

    fireworks.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
  }
}

document.querySelector(".toggle").addEventListener("click", handleThemeToggle);

