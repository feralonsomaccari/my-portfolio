const changeTheme = () => {
  const body = document.querySelector(".wrapper");
  const header = document.querySelector(".header");
  const btn = document.querySelector(".change-theme");
  const bodyClasses = [...body.classList];
  if (bodyClasses.some(className => className === "body--dark")) {
    body.classList.remove("body--dark");
    // header.classList.remove('header--dark');
    btn.innerHTML = "🌛";
  } else {
    body.classList.add("body--dark");
    // header.classList.add('header--dark');
    btn.innerHTML = "🌞";
  }
};

const generateSidePorject = repository => {
  if (repository.fork == false) {
    const wrapper = document.querySelector(".projects__wrapper");

    const project = document.createElement("article");
    const project_title = document.createElement("h5");
    const project_desc = document.createElement("p");
    const project_nav = document.createElement("nav");
    const project_demo = document.createElement("a");
    const project_github = document.createElement("a");
    const project_lang = document.createElement("p");

    if (repository.homepage != null) {
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
    project_lang.innerHTML = repository.language;
    project.append(project_title);
    project.append(project_nav);
    project.append(project_desc);
    project.append(project_lang);
    wrapper.append(project);
  }
};
const getRepositories = () => {
  fetch("https://api.github.com/users/feralonsomaccari/repos")
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      console.log(myJson);
      myJson.map(repository => generateSidePorject(repository));
    })
    .catch(error => {
      // In case it fail it will show a hand wrote side project section that can be outdated
    });
};
getRepositories();
document.querySelector(".change-theme").addEventListener("click", changeTheme);
