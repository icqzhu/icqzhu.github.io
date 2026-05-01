# Academic Homepage

A lightweight static academic homepage powered by editable Markdown files.

## Overview

This project keeps the page structure, styles, and academic content separate:

- `index.html` defines the page layout.
- `assets/main.js` loads and renders Markdown content in the browser.
- `assets/styles.css` controls the visual design.
- `content/` stores the editable profile, publications, skills, honors, and resume entries.

No build step is required.

## Local Preview

Run:

```bash
node scripts/serve.js 8000
```

Then open:

```text
http://localhost:8000
```

Using the local server is recommended because the page reads Markdown files from `content/`.

## Editing Content

Update the Markdown files in `content/`:

- `profile.md`: profile metadata, biography, and research interests.
- `skills-expertise.md`: skills and expertise.
- `publications.md`: publication entries.
- `honors-awards.md`: honors, awards, and distinctions.
- `education-talks-internships.md`: education, talks, internships, and related experiences.

Refresh the browser after saving changes.

## Publication Entry

```markdown
---
title: Paper Title
year: 2026
authors: Author A, Author B, Author C
venue: Journal or Conference Name
category: First/Co-First Author
tags: Tag A, Tag B
links: Article|https://example.com
---

Optional short description.
```

Use `category` to place a paper under `First/Co-First Author`, `Corresponding Author`, or `Others`.

Entries with `tags: Template` are hidden from the page.

## Resume Entry

```markdown
---
period: 2025 - Present
institution: Institution Name
description: Short description
---
```

## Deployment

The site can be deployed directly with GitHub Pages. Keep the root `.nojekyll` file so Markdown files in `content/` are served as static assets.
