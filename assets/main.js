const contentPaths = {
  profile: "content/profile.md",
  skillsExpertise: "content/skills-expertise.md",
  publications: "content/publications.md",
  honorsAwards: "content/honors-awards.md",
  educationTalksInternships: "content/education-talks-internships.md",
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

const fallbackHonorsAwards = [
  {
    title: "Honors & Awards",
    summary: "Add awards, scholarships, recognitions, and distinctions in content/honors-awards.md.",
  },
];

const fallbackSkillsExpertise = [
  "Clinical Medicine",
  "Evidence-Based Medicine",
  "Clinical Research",
  "Academic Writing",
];

const fallbackEducations = [
  {
    title: "Education",
    summary: "Add degrees, institutions, advisors, talks, internships, and visiting experiences in content/education-talks-internships.md.",
  },
];

const fallbackTalksInternships = [
  {
    title: "Talks & Internships",
    summary: "Add invited talks, conference presentations, internships, and visiting experiences in content/education-talks-internships.md.",
  },
];

initThemeToggle();
initNavigation();
loadContent();

async function loadContent() {
  const [profileText, skillsText, publicationText, honorsText, educationTalksInternshipsText] = await Promise.all([
    fetchText(contentPaths.profile),
    fetchText(contentPaths.skillsExpertise),
    fetchText(contentPaths.publications),
    fetchText(contentPaths.honorsAwards),
    fetchText(contentPaths.educationTalksInternships),
  ]);

  const profile = profileText ? parseProfile(profileText) : fallbackProfile;
  const skillsExpertise = skillsText ? markdownListToArray(stripFrontMatter(skillsText)) : fallbackSkillsExpertise;
  const publications = publicationText ? parseEntries(publicationText) : fallbackPublications;
  const honorsAwards = honorsText ? parseEntries(honorsText) : fallbackHonorsAwards;
  const educationTalksInternships = educationTalksInternshipsText
    ? parseEntries(educationTalksInternshipsText)
    : [...fallbackEducations, ...fallbackTalksInternships];

  renderProfile({ ...fallbackProfile, ...profile });
  renderSkillList("#skills-expertise-list", skillsExpertise.length ? skillsExpertise : fallbackSkillsExpertise);
  renderPublications(publications.length ? publications : fallbackPublications);
  renderResumeList("#honors-awards-list", honorsAwards.length ? honorsAwards : fallbackHonorsAwards);
  renderResumeList(
    "#education-talks-internships-list",
    educationTalksInternships.length
      ? educationTalksInternships
      : [...fallbackEducations, ...fallbackTalksInternships],
  );
}

async function fetchText(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    const text = response.ok ? await response.text() : "";
    return normalizeLineEndings(text);
  } catch (error) {
    console.warn(`Could not load ${path}. Using the built-in page content instead.`, error);
    return "";
  }
}

function normalizeLineEndings(text) {
  return text.replace(/\r\n?/g, "\n");
}

function parseProfile(markdown) {
  const frontMatter = readFrontMatter(markdown);
  const body = stripFrontMatter(markdown);
  const sections = splitSections(body);
  const about = sections.About || body;
  const interests = markdownListToArray(sections["Research Interests"] || "");

  return {
    ...frontMatter,
    interests,
    about: markdownToHtml(about),
  };
}

function stripFrontMatter(markdown) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, "").trim();
}

function parseEntries(markdown) {
  const entries = [];
  const pattern = /---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*?)(?=\r?\n---\r?\n|$)/g;
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
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
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
  const sortedPublications = [...publications]
    .filter((publication) => !hasTemplateTag(publication))
    .sort((a, b) => Number(b.year || 0) - Number(a.year || 0));

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
  { key: "first", label: "First/Co-First* Author" },
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
      <div class="publication-head">
        <h4>${publicationTitleToHtml(publication.title || "Untitled publication")}</h4>
        ${publication.year ? `<span class="publication-year">${escapeHtml(publication.year)}</span>` : ""}
      </div>
      <p class="authors">${highlightName(publication.authors || "")}</p>
      <p class="venue">${escapeHtml(publication.venue || "")}</p>
      <div class="summary">${publication.summary || ""}</div>
      ${
        tags || links
          ? `<div class="publication-actions">
              ${tags ? `<div class="publication-meta">${tags}</div>` : ""}
              ${links ? `<div class="publication-links">${links}</div>` : ""}
            </div>`
          : ""
      }
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

function renderEntries(selector, entries) {
  document.querySelector(selector).innerHTML = entries
    .sort((a, b) => Number(b.year || 0) - Number(a.year || 0))
    .map((entry) => {
      const summary = entry.summary || "";
      const summaryHtml = /<[a-z][\s\S]*>/i.test(summary) ? summary : markdownToHtml(summary);
      const meta = [entry.year, entry.institution, entry.location, entry.type]
        .filter(Boolean)
        .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
        .join("");
      const links = parseLinks(entry.links)
        .map(
          (link) =>
            `<a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`,
        )
        .join("");

      return `
      <article class="entry-card glass">
        <h3>${escapeHtml(entry.title || "Entry")}</h3>
        ${meta ? `<div class="publication-meta">${meta}</div>` : ""}
        <div class="summary">${summaryHtml}</div>
        ${links ? `<div class="publication-links">${links}</div>` : ""}
      </article>
    `;
    })
    .join("");
}

function renderSkillList(selector, skills) {
  document.querySelector(selector).innerHTML = skills
    .map((skill) => `<li>${escapeHtml(skill)}</li>`)
    .join("");
}

function renderResumeList(selector, entries) {
  document.querySelector(selector).innerHTML = entries
    .sort((a, b) => getSortYear(b) - getSortYear(a))
    .map((entry) => {
      const period = entry.period || entry.date || entry.year || "";
      const place = entry.institution || entry.organization || entry.venue || "";
      const rank = entry.rank || entry.type || "";
      const description = entry.description || entry.title || stripHtml(entry.summary || "");
      const parts = [period, place, description].filter(Boolean);
      const links = parseLinks(entry.links)
        .map(
          (link) =>
            `<a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`,
        )
        .join("");

      return `
        <li>
          <span>${parts.map((part) => escapeHtml(part)).join(", ")}</span>
          ${rank ? `<span class="resume-rank">${escapeHtml(rank)}</span>` : ""}
          ${links ? `<span class="resume-links">${links}</span>` : ""}
        </li>
      `;
    })
    .join("");
}

function getSortYear(entry) {
  const value = `${entry.period || entry.date || entry.year || ""}`;
  const years = value.match(/\d{4}/g);
  return years ? Number(years[years.length - 1]) : 0;
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, "").trim();
}

function hasTemplateTag(publication) {
  return splitComma(publication.tags).some((tag) => tag.toLowerCase() === "template");
}

function publicationTitleToHtml(title) {
  return escapeHtml(title).replace(/\*([^*]+)\*/g, "<em>$1</em>");
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
  return escapeHtml(authors)
    .replace(/\bet al\.?\b/g, "<em>$&</em>")
    .replace(/Ruolin Zhu/g, "<strong>Ruolin Zhu</strong>");
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
    .map((link) => ({
      link,
      section: document.querySelector(link.getAttribute("href")),
    }))
    .filter((item) => item.section);

  if (!sections.length) {
    return;
  }

  const setActiveLink = (activeLink) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link === activeLink);
    });
  };

  const updateActiveLink = () => {
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const referenceY = headerHeight + window.innerHeight * 0.45;
    const nearPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;

    if (nearPageBottom) {
      setActiveLink(sections[sections.length - 1].link);
      return;
    }

    const current = sections.reduce((active, item) => {
      const top = item.section.getBoundingClientRect().top;
      return top <= referenceY ? item : active;
    }, sections[0]);

    setActiveLink(current.link);
  };

  let ticking = false;
  const requestUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    requestAnimationFrame(() => {
      updateActiveLink();
      ticking = false;
    });
  };

  updateActiveLink();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}
