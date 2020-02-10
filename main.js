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

    if (repository.homepage != null) {
      project_demo.innerHTML = "Live Demo";
      project_demo.href = repository.homepage;
      project_demo.classList.add("link");
      project_nav.append(project_demo);
    }
    project_github.classList.add("link");
    project.classList.add("project");
    project_github.innerHTML = "Github";
    project_github.href = repository.html_url;
    project_nav.append(project_github);
    project_title.innerHTML = repository.name;
    project_desc.innerHTML = repository.description;
    project.append(project_title);
    project.append(project_nav);
    project.append(project_desc);
    wrapper.append(project);
  }
};
const getRepositories = () => {
  fetch("https://api.github.com/users/feralonsomaccari/repos")
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      myJson.map(repository => generateSidePorject(repository));
    })
    .catch(error => {
      console.log(error);
    });
};
getRepositories();
document.querySelector(".change-theme").addEventListener("click", changeTheme);