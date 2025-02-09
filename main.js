const handleThemeToggle = () => {
  const body = document.querySelector(".wrapper");
  const texts = document.querySelectorAll(".text")
  const links = document.querySelectorAll(".link")
  const emoji = document.querySelector("#emoji-theme");
  const LampAnimation = document.querySelector(".lamp");
  const bodyClasses = [...body.classList];
  if (bodyClasses.some(className => className === "body--dark")) {
    body.classList.remove("body--dark");
    emoji.setAttribute("aria-label", "moon");
    emoji.innerHTML = "🌛"
  } else {
    body.classList.add("body--dark");;
    emoji.setAttribute("aria-label", "sun");
    emoji.innerHTML = "🌞"
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

  [...LampAnimation.classList].some(className => className === "lamp--dark")
    ? LampAnimation.classList.remove("lamp--dark")
    : LampAnimation.classList.add("lamp--dark")

};

const generateSideProject = repository => {
  if (repository.size < 500 || repository.fork) return;
  const wrapper = document.querySelector(".projects__wrapper");

  const project = document.createElement("article");
  const project_title = document.createElement("h3");
  const project_desc = document.createElement("p");
  const project_nav = document.createElement("nav");
  const project_demo = document.createElement("a");
  const project_github = document.createElement("a");
  const project_lang = document.createElement("div");

  if (repository.homepage) {
    project_demo.innerHTML = "Live Demo";
    project_demo.href = repository.homepage;
    project_demo.classList.add("link");
    project_demo.target = "_blank";
    project_demo.rel = "noopener noreferrer";
    project_nav.append(project_demo);
  }

  project.classList.add("project");
  project_github.classList.add("link");
  project_github.target = "_blank";
  project_github.rel = "noopener noreferrer";
  project_github.innerHTML = "Github";
  project_github.href = repository.html_url;
  project_nav.append(project_github);
  project_title.innerHTML = repository.name;
  project_desc.innerHTML = repository.description;
  project_desc.classList.add("text")
  const topicArray = repository.topics;
  topicArray.forEach((topic) => {
    const topicEl = document.createElement("span");
    topicEl.classList.add("topic")
    topicEl.textContent = `${topic}`;
    project_lang.append(topicEl)
  })
  project.append(project_title);
  project.append(project_nav);
  project.append(project_desc);
  project.append(project_lang);
  wrapper.append(project);
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
const getRepositories = () => {
  fetch("https://api.github.com/users/feralonsomaccari/repos")
    .then(response => response.json())
    .then(response => {
      response.sort((a, b) => a.size - b.size)
      response.map(repository => generateSideProject(repository));
    })
    .catch(error => {
      console.error(error)
      // In case it fail it will show a hand wrote side project section that can be outdated
    });
};
getRepositories();
document.querySelector(".theme-toggle-btn").addEventListener("click", handleThemeToggle);
