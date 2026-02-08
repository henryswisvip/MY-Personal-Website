const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    navToggle.setAttribute(
      "aria-expanded",
      nav.classList.contains("open").toString()
    );
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === "all") {
        card.style.display = "grid";
        return;
      }

      const tags = card.dataset.tags || "";
      card.style.display = tags.includes(filter) ? "grid" : "none";
    });
  });
});

const emailSpan = document.querySelector("[data-email]");
const copyBtn = document.querySelector("[data-copy-email]");

if (emailSpan && copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = emailSpan.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Copied";
      setTimeout(() => {
        copyBtn.textContent = "Copy email";
      }, 1800);
    } catch (error) {
      window.location.href = `mailto:${email}`;
    }
  });
}

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".site-nav a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => link.classList.remove("active"));
      const id = entry.target.getAttribute("id");
      const active = document.querySelector(`.site-nav a[href="#${id}"]`);
      if (active) active.classList.add("active");
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));
