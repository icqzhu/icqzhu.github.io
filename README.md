# Academic Homepage

A lightweight and editable personal academic homepage. The page layout follows your reference design: personal information sidebar on the left, and About, Selected Publications, and Services on the right, with Glassmorphism, liquid glass background, and hover effects.

## Preview

Start the local preview server:

```bash
node scripts/serve.js 8000
```

Then visit `http://localhost:8000`.

## How to Edit Content

- `content/profile.md`: Name, position, institution, avatar, email, Google Scholar, ORCID, Web of Science, GitHub, About, and Research Interests.
- `content/publications.md`: Paper list. Copy a `--- ... ---` paper block and modify the fields to add new papers.
- `content/services.md`: Teaching, talks, academic service entries, etc.
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

After saving Markdown files, refresh `http://localhost:8000` to see your updates.
