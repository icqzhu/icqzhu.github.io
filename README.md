# Academic Homepage

这是一个轻量、可编辑的个人学术主页。页面视觉参考了你给的示例图：左侧个人信息栏，右侧 About、Selected Publications 和 Services，并加入了 Glassmorphism、liquid glass 背景和 hover 动效。

## 预览

因为页面会自动读取 `content/*.md`，请通过本地服务器预览，而不是直接双击打开 HTML。

```bash
node scripts/serve.js 8000
```

然后访问 `http://localhost:8000`。

## 如何编辑内容

- `content/profile.md`: 姓名、职位、单位、头像、邮箱、ORCID、PubMed、About 和 Research Interests。
- `content/publications.md`: 论文列表。复制一个 `--- ... ---` 论文块并修改字段即可新增论文。
- `content/services.md`: 教学、报告、学术服务等条目。
- `assets/profile.png`: 头像图片。
- `assets/papers/`: 论文 PDF。

## 论文条目格式

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

保存后刷新页面，网站会自动重新排版展示。
