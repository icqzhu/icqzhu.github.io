# Academic Homepage

A lightweight and editable personal academic homepage. The page layout follows your reference design: personal information sidebar on the left, and Markdown-driven academic sections on the right, with Glassmorphism, liquid glass background, and hover effects.

## Preview

Start the local preview server:

```bash
node scripts/serve.js 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

This site reads Markdown files directly from the `content/` folder in the browser. Keep the root `.nojekyll` file in the repository so GitHub Pages publishes those Markdown files as static assets instead of processing them with Jekyll.

## How to Edit Content

- `content/profile.md`: Name, position, institution, avatar, email, Google Scholar, ORCID, Web of Science, GitHub, About, and Research Interests.
- `content/skills-expertise.md`: Skills and expertise. Each bullet becomes one displayed item.
- `content/publications.md`: Publications. Copy a `--- ... ---` paper block and modify the fields to add new papers.
- `content/honors-awards.md`: Honors, awards, scholarships, and distinctions.
- `content/education-talks-internships.md`: Education, talks, presentations, internships, visiting experiences, and exchanges.
- `assets/profile.png`: Profile picture.
- Publication links are shown from the `links` field; add any `Label|URL` pair you want displayed.

## Paper Entry Format

```markdown
---
title: Your Paper Title
year: 2026
authors: Ruolin Zhu, Coauthor A, Coauthor B
venue: Journal or Conference Name
category: First/Co-First Author
tags: First Author, Clinical Medicine
links: DOI|https://doi.org/example, PubMed|https://pubmed.ncbi.nlm.nih.gov/example, Google Scholar|https://scholar.google.com/scholar?q=Your+Paper+Title, Web of Science|https://www.webofscience.com/wos/woscc/full-record/example
---

One or two sentences describing this paper.
```

Use `category` to place a paper under `First/Co-First Author`, `Corresponding Author`, or `Others`.
The `links` field is fully data-driven: every `Label|URL` item you add will be shown as a button for that paper.
If a publication has `tags: Template`, it will be hidden from the page.

## Other Section Entry Format

Use the same block style for honors and awards:

```markdown
---
title: Entry Title
year: 2026
institution: University or Organization
location: City, Country
type: Award
links: Website|https://example.com
---

One or two sentences describing this entry.
```

For `content/education-talks-internships.md`, entries are displayed as plain resume-style lines:

```markdown
---
period: Mar 2026 - Present
institution: Shenzhen Bao'an People's Hospital (Guangdong Provincial People's Hospital Shenzhen Hospital)
description: Internship as a clinical physician
---
```

After saving Markdown files, refresh `http://localhost:8000` to see your updates.
