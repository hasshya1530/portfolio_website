/* =========================
script.js
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const typedTextElement =
    document.querySelector(".typed-text");

  const roles = [

    "AI Engineer",

    "Full Stack Developer",

    "Healthcare AI Builder",

    "NLP Engineer",

    "Computer Vision Developer",

    "Generative AI Explorer"

  ];

  let currentIndex = 0;

  const sleep = (ms) =>
    new Promise(res => setTimeout(res, ms));

  async function typeText(text) {

    typedTextElement.textContent = "";

    for (let char of text) {

      typedTextElement.textContent += char;

      await sleep(70);

    }

  }

  async function cycleRoles() {

    while (true) {

      await typeText(roles[currentIndex]);

      await sleep(1500);

      typedTextElement.textContent = "";

      currentIndex =
        (currentIndex + 1) % roles.length;

    }

  }

  cycleRoles();

  // AOS

  if (typeof AOS !== "undefined") {

    AOS.init({
      duration: 1200,
      once: true
    });

  }

  // Vanilla Tilt

  if (typeof VanillaTilt !== "undefined") {

    VanillaTilt.init(
      document.querySelectorAll(".glass-card"),
      {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2
      }
    );

  }

  // Resume Dropdown

  const resumeBtn =
    document.getElementById("resume-btn");

  const resumeMenu =
    document.querySelector(".resume-menu");

  if (resumeBtn) {

    resumeBtn.addEventListener("click", () => {

      resumeMenu.classList.toggle("show-menu");

    });

  }

  // Close dropdown outside click

  document.addEventListener("click", (e) => {

    if (
      !resumeBtn.contains(e.target) &&
      !resumeMenu.contains(e.target)
    ) {

      resumeMenu.classList.remove("show-menu");

    }

  });

  // GitHub API

  const username = "hasshya1530";

  async function fetchGitHubData() {

    try {

      const userResponse =
        await fetch(
          `https://api.github.com/users/${username}`
        );

      const userData =
        await userResponse.json();

      document.getElementById("repo-count")
        .innerText = userData.public_repos;

      const repoResponse =
        await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`
        );

      const repos =
        await repoResponse.json();

      const repoContainer =
        document.getElementById("github-projects");

      repoContainer.innerHTML = "";

      repos
        .slice(0, 6)
        .forEach(repo => {

          const card =
            document.createElement("div");

          card.classList.add(
            "glass-card",
            "repo-card"
          );

          card.innerHTML = `

          <div class="repo-top">

            <div class="repo-language">
              ${repo.language || "Code"}
            </div>

          </div>

          <h3>${repo.name}</h3>

          <p>
            ${repo.description ||
            "Modern AI/ML Repository"
            }
          </p>

          <div class="repo-stats">

            <span>
              ⭐ ${repo.stargazers_count}
            </span>

            <span>
              🍴 ${repo.forks_count}
            </span>

          </div>

          <a
            href="${repo.html_url}"
            target="_blank"
          >
            Explore Repository →
          </a>

          `;

          repoContainer.appendChild(card);

        });

    }
    catch (error) {

      console.log(error);

    }

  }

  fetchGitHubData();

});