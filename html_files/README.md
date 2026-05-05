# Legacy Static Website Reference

This directory contains the original static HTML/CSS/JavaScript version of the ProKitchenTech website.

It is kept as a visual and content reference only. The active application is now in `../my-app`.

## Contents

Typical files in this directory include:

- `index.html`
- `products.html`
- `product-detail.html`
- `factory.html`
- `applications.html`
- `certificates.html`
- `news.html`
- `news-detail.html`
- `contact.html`
- `style.css`
- `script.js`

## How To Preview

You can open `index.html` directly in a browser.

For a local static server:

```bash
cd html_files
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Migration Notes

- Do not copy static HTML directly into React components.
- Treat page structure, copy, and visual rhythm as reference material.
- The Next.js app should use reusable components, typed data, and Sanity content where available.
- Changes to production pages should be made in `../my-app`, not here.

## Deployment

This static folder is not the intended production deployment target. Deploy the Next.js app from `../my-app`.
