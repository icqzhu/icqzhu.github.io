const contentPaths = {
  profile: "content/profile.md",
  publications: "content/publications.md",
  services: "content/services.md",
};

const fallbackProfile = {
  name: "Ruolin Zhu",
  role: "Clinical Medicine",
  affiliation: "P.R. China",
  avatar: "assets/profile.png",
  email: "icqzhu@gmail.com",
  google_scholar: "https://scholar.google.com/citations?user=M6JBBRIAAAAJ&hl=en",
  orcid: "https://orcid.org/0009-0007-1542-9888",
  wos: "https://www.webofscience.com/wos/author/record/PEX-5311-2025",
  pubmed: "https://www.ncbi.nlm.nih.gov/pubmed/?term=zhu+ruolin",
  github: "https://github.com/icqzhu/",
  cv: "",
  interests: ["Clinical Medicine", "Evidence & Publications", "Academic Collaboration"],
  about:
    "I am building an academic profile in clinical medicine. This page is powered by Markdown files in the content folder.",
};

const fallbackPublications = [
  {
    title:
      "Parallel microevolution of multidrug resistance and hypermucoviscosity in two carbapenem-resistant Pseudomonas aeruginosa clinical isolates with strikingly divergent virulence outcomes",
    year: "2024",
    authors:
      "Yang, Rui*; Zhu, Ruolin*; Lai, Chunmiao*; Zeng, Jie*; Zheng, Anran; Chen, Pinjia; Chen, Xiaoying; Tian, Xiaoxin; Wang, Xin; Feng, Shengjun et al.",
    venue: "GitHub Journal of Bugs",
    category: "First/Co-First Author",
    tags: "Template, Replace me",
    summary:
      "Template entry from the reference site. Replace this block with a real citation, abstract, and links.",
    links: "DOI|https://doi.org/10.1186/s12866-025-04703-z, PubMed|https://pubmed.ncbi.nlm.nih.gov/41593470/, PubMed Central|https://pmc.ncbi.nlm.nih.gov/articles/PMC12973579/",
  },
  {
    title: "Paper Title Number 3",
    year: "2015",
    authors: "Ruolin Zhu",
    venue: "Journal 1",
    category: "Corresponding Author",
    tags: "Template",
    summary: "This paper is about the number 3. The number 4 is left for future work.",
    links:
      "DOI|https://doi.org/example, PubMed|https://pubmed.ncbi.nlm.nih.gov/, Google Scholar|https://scholar.google.com/scholar?q=Ruolin+Zhu, Web of Science|https://www.webofscience.com/wos/author/record/PEX-5311-2025",
  },
  {
    title: "Paper Title Number 2",
    year: "2010",
    authors: "Ruolin Zhu",
    venue: "Journal 1",
    category: "Others",
    tags: "Template",
    summary: "This paper is about the number 2. The number 3 is left for future work.",
    links:
      "DOI|https://doi.org/example, PubMed|https://pubmed.ncbi.nlm.nih.gov/, Google Scholar|https://scholar.google.com/scholar?q=Ruolin+Zhu, Web of Science|https://www.webofscience.com/wos/author/record/PEX-5311-2025",
  },
  {
    title: "Paper Title Number 1",
    year: "2009",
    authors: "Ruolin Zhu",
    venue: "Journal 1",
    category: "Others",
    tags: "Template",
    summary: "This paper is about the number 1. The number 2 is left for future work.",
    links:
      "DOI|https://doi.org/example, PubMed|https://pubmed.ncbi.nlm.nih.gov/, Google Scholar|https://scholar.google.com/scholar?q=Ruolin+Zhu, Web of Science|https://www.webofscience.com/wos/author/record/PEX-5311-2025",
  },
];

const fallbackServices = [
  {
    title: "Academic Service",
    summary: "Add reviewing, committee service, teaching, awards, and collaborations in content/services.md.",
  },
];

document.querySelector("#year").textContent = new Date().getFullYear();

initThemeToggle();
initNavigation();
loadContent();

async function loadContent() {
  const [profileText, publicationText, serviceText] = await Promise.all([
    fetchText(contentPaths.profile),
    fetchText(contentPaths.publications),
    fetchText(contentPaths.services),
  ]);

  const profile = profileText ? parseProfile(profileText) : fallbackProfile;
  const publications = publicationText ? parseEntries(publicationText) : fallbackPublications;
  const services = serviceText ? parseEntries(serviceText) : fallbackServices;

  renderProfile({ ...fallbackProfile, ...profile });
  renderPublications(publications.length ? publications : fallbackPublications);
  renderServices(services.length ? services : fallbackServices);
}

async function fetchText(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    return response.ok ? response.text() : "";
  } catch (error) {
    console.warn(`Could not load ${path}. Using the built-in page content instead.`, error);
    return "";
  }
}

function parseProfile(markdown) {
  const frontMatter = readFrontMatter(markdown);
  const body = markdown.replace(/^---[\s\S]*?---/, "").trim();
  const sections = splitSections(body);
  const about = sections.About || body;
  const interests = markdownListToArray(sections["Research Interests"] || "");

  return {
    ...frontMatter,
    interests,
    about: markdownToHtml(about),
  };
}

function parseEntries(markdown) {
  const entries = [];
  const pattern = /---\n([\s\S]*?)\n---\n([\s\S]*?)(?=\n---\n|$)/g;
  let match = pattern.exec(markdown);

  while (match) {
    const frontMatter = parseFrontMatterBlock(match[1]);
    const body = match[2].trim();
    entries.push({
      ...frontMatter,
      summary: frontMatter.summary || markdownToHtml(body),
    });
    match = pattern.exec(markdown);
  }

  return entries;
}

function readFrontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }

  return parseFrontMatterBlock(match[1]);
}

function parseFrontMatterBlock(block) {
  return block.split("\n").reduce((data, line) => {
    const separator = line.indexOf(":");
    if (separator < 0) {
      return data;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = value;
    return data;
  }, {});
}

function splitSections(markdown) {
  const sections = {};
  let current = "About";

  markdown.split("\n").forEach((line) => {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      current = heading[1].trim();
      sections[current] = "";
      return;
    }

    sections[current] = `${sections[current] || ""}${line}\n`;
  });

  return Object.fromEntries(
    Object.entries(sections).map(([key, value]) => [key, value.trim()]),
  );
}

function markdownListToArray(markdown) {
  return markdown
    .split("\n")
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean);
}

function markdownToHtml(markdown) {
  if (!markdown) {
    return "";
  }

  return markdown
    .split(/\n{2,}/)
    .map((paragraph) => {
      const trimmed = paragraph.trim();
      if (!trimmed) {
        return "";
      }
      if (/^[-*]\s+/m.test(trimmed)) {
        const items = markdownListToArray(trimmed)
          .map((item) => `<li>${inlineMarkdown(item)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${inlineMarkdown(trimmed.replace(/\n/g, " "))}</p>`;
    })
    .join("");
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProfile(profile) {
  document.title = `${profile.name} | Academic Homepage`;
  document.querySelectorAll('[data-profile="name"]').forEach((node) => {
    node.textContent = profile.name;
  });
  setText('[data-profile="role"]', profile.role);
  setText('[data-profile="affiliation"]', profile.affiliation);

  const avatar = document.querySelector('[data-profile="avatar"]');
  avatar.src = profile.avatar || fallbackProfile.avatar;
  avatar.alt = `Portrait of ${profile.name}`;

  const linkMap = {
    email: profile.email ? `mailto:${profile.email}` : "",
    google_scholar: profile.google_scholar,
    orcid: profile.orcid,
    wos: profile.wos,
    github: profile.github,
  };

  Object.entries(linkMap).forEach(([key, href]) => {
    const link = document.querySelector(`[data-link="${key}"]`);
    if (!link) {
      return;
    }
    link.href = href || "#";
    link.classList.toggle("is-hidden", !href);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelector("#about-content").innerHTML =
    profile.about || markdownToHtml(fallbackProfile.about);
  document.querySelector("#interest-list").innerHTML = profile.interests
    .map((interest) => `<li>${escapeHtml(interest)}</li>`)
    .join("");
}

function renderPublications(publications) {
  const sortedPublications = [...publications].sort(
    (a, b) => Number(b.year || 0) - Number(a.year || 0),
  );

  const groups = publicationGroups.map((group) => ({
    ...group,
    items: sortedPublications.filter((publication) => getPublicationGroup(publication) === group.key),
  }));

  document.querySelector("#publication-list").innerHTML = groups
    .map(
      (group) => `
        <section class="publication-group" aria-labelledby="publication-group-${group.key}">
          <h3 id="publication-group-${group.key}">${group.label}</h3>
          <div class="publication-group-list">
            ${
              group.items.length
                ? group.items.map((publication) => buildPublicationCard(publication)).join("")
                : '<p class="empty-publication-group">No publications listed yet.</p>'
            }
          </div>
        </section>
      `,
    )
    .join("");
}

const publicationGroups = [
  { key: "first", label: "First/Co-First Author" },
  { key: "corresponding", label: "Corresponding Author" },
  { key: "others", label: "Others" },
];

function buildPublicationCard(publication) {
  const tags = splitComma(publication.tags)
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
  const links = parseLinks(publication.links)
    .map(
      (link) =>
        `<a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`,
    )
    .join("");

  return `
    <article class="publication-card glass">
      <h4>${escapeHtml(publication.title || "Untitled publication")}</h4>
      <p class="authors">${highlightName(publication.authors || "")}</p>
      <p class="venue">${escapeHtml(publication.venue || "")}</p>
      <div class="summary">${publication.summary || ""}</div>
      ${tags ? `<div class="publication-meta">${tags}</div>` : ""}
      ${links ? `<div class="publication-links">${links}</div>` : ""}
    </article>
  `;
}

function getPublicationGroup(publication) {
  const category = `${publication.category || publication.type || publication.tags || ""}`.toLowerCase();

  if (category.includes("corresponding")) {
    return "corresponding";
  }

  if (category.includes("first") || category.includes("co-first") || category.includes("cofirst")) {
    return "first";
  }

  return "others";
}

function renderServices(services) {
  document.querySelector("#service-list").innerHTML = services
    .map((service) => `
      <article class="service-card glass">
        <h3>${escapeHtml(service.title || "Service")}</h3>
        <p>${escapeHtml(service.summary || "")}</p>
      </article>
    `)
    .join("");
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = value || "";
  }
}

function splitComma(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseLinks(value = "") {
  return splitComma(value)
    .map((item) => {
      const [label, href] = item.split("|").map((part) => part.trim());
      return label && href ? { label, href } : null;
    })
    .filter(Boolean);
}

function highlightName(authors) {
  return escapeHtml(authors).replace(/Ruolin Zhu/g, "<strong>Ruolin Zhu</strong>");
}

function initThemeToggle() {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) {
    return;
  }

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.warn("Could not save the selected theme.", error);
    }
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    toggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  };

  applyTheme(document.documentElement.dataset.theme || "light");

  toggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

function initNavigation() {
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-20% 0px -58% 0px",
      threshold: [0.1, 0.3, 0.6],
    },
  );

  sections.forEach((section) => observer.observe(section));
}
