# Academic Homepage

A lightweight and editable personal academic homepage. The page layout follows your reference design: personal information sidebar on the left, and About, Selected Publications, and Services on the right, with Glassmorphism, liquid glass background, and hover effects.

## Preview

Since the page automatically reads `content/*.md`, please preview through a local server rather than directly opening the HTML file.

```bash
node scripts/serve.js 8000
```

Then visit `http://localhost:8000`.

## How to Edit Content

- `content/profile.md`: Name, position, institution, avatar, email, ORCID, PubMed, About, and Research Interests.
- `content/publications.md`: Paper list. Copy a `--- ... ---` paper block and modify the fields to add new papers.
- `content/services.md`: Teaching, talks, academic service entries, etc.
- `assets/profile.png`: Profile picture.
- `assets/papers/`: Paper PDFs.

## Paper Entry Format

```markdown
---
title: Your Paper Title
year: 2026
authors: Ruolin Zhu, Coauthor A, Coauthor B
venue: Journal or Conference Name
tags: First Author, Clinical Medicine
links: PDF|assets/papers/paper.pdf, DOI|https://doi.org/example
---

One or two sentences describing this paper.
```

After saving, refresh the page and the website will automatically reformat and display the content.
