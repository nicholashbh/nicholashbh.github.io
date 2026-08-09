# Preventive Medicine Residency — site

Ten static HTML pages. No build step, no dependencies, no server required.

## Viewing it

**Double-click `index.html`.** It opens in your browser and every page, link, font and image
works from the folder as-is. You can zip this folder and email it, or put it on a USB stick, and
it will still work on someone else's machine with nothing installed.

## Why the paths look the way they do

Every internal link is **relative to the page it sits on**, not absolute:

| From | Link to Admissions reads |
|---|---|
| `index.html` | `admissions/index.html` |
| `careers/index.html` | `../admissions/index.html` |
| `programme/training-sites/index.html` | `../../admissions/index.html` |

This is deliberate and it is the reason the site works by double-clicking. An earlier version used
root-absolute paths (`/assets/css/site.css`, `/admissions/`), which is tidier on a live domain but
resolves to your C: drive when a file is opened directly — the page renders as unstyled black text
on white. If you ever see that, a path has been changed back to the `/…` form.

**`404.html` is the one exception** and keeps root-absolute paths on purpose. A web server serves
it in place of any mistyped URL, at any depth, so its paths must resolve from the site root rather
than from wherever the visitor mistyped. It is not meant to be opened by double-clicking.

## Editing

- **Content** lives in the ten HTML files. Everything is plain HTML — no templating.
- **All styling** is in `assets/css/site.css`. There is one stylesheet for the whole site and no
  page has its own styles. Change a colour or a size once and it applies everywhere.
- **The masthead and footer are duplicated** across all ten files and are currently byte-identical.
  If you change the navigation, change it in all ten. `_shared/head.html` and `_shared/foot.html`
  hold reference copies of the depth-0 version.

## Before this goes live

Read **`MOCK-DATA.md` first.** The site is populated with invented figures so the design can be
judged as a finished page — resident counts, graduate numbers, the MPH fee, the bond terms and all
application dates are made up. They are listed there and tagged `<!-- MOCK -->` in the HTML:

```bash
grep -rn "MOCK" .
```

Roughly 236 further gaps are marked in the pages themselves as dotted-underlined placeholders:

```bash
grep -rn 'class="todo"' .
```

## Deploying to GitHub Pages

The relative paths mean this works either way — from a custom domain
(`prevmed.nuhs.edu.sg`) or from a repo subpath (`username.github.io/repo/`). A custom domain is
still preferable: it lets `robots.txt` work, keeps `404.html` correct, and reads as institutional
rather than as a student project.
