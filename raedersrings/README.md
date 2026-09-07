# Raeder's Rings — raedersrings.com

A static site for Raeder's Rings: custom rings hand-turned on a manual lathe in
Salt Lake City. Plain HTML, one stylesheet, one small JS file. No build step, no
framework, no dependencies to keep up with — open `index.html` in a browser and it
works.

```
index.html        Homepage: hero, work, process, materials, about, FAQ, CTA
gallery.html      Full grid of past commissions
quote.html        Custom commission request form
404.html          Not-found page
assets/styles.css All styling
assets/main.js    Sticky header, mobile nav, scroll reveals, form handling
images/           Your photos go here (see images/README.md)
favicon.svg       Tab icon
CNAME             Custom domain for GitHub Pages
robots.txt        Search engine directives
sitemap.xml       Search engine page list
```

## Before it goes live

These are the spots that still hold placeholder content, because they're details I
couldn't invent for you:

1. **Contact details** — search the project for `hello@raedersrings.com` and replace
   it with your real address. Same for the Instagram link (`https://www.instagram.com/`).
   Every occurrence is marked with a `TODO` comment.
2. **Photos** — see `images/README.md`. Each placeholder in the HTML has a commented-out
   `<img>` tag naming the file it expects; drop the photo in and uncomment the tag.
3. **Form delivery** — see the comment block at the top of the form in `quote.html`.
   Right now it falls back to opening the visitor's email client. Pointing it at a free
   form service (Formspree, Basin, Netlify Forms) is one attribute and is much more
   reliable.
4. **Copy** — the words describe the business accurately, but they're my phrasing, not
   yours. Read it through and make it sound like you.

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying, and getting off IONOS

The site is plain static files, so it will run anywhere. Two good free options:

### GitHub Pages

1. Put these files at the **root of a repository** (see the note below about this repo).
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Settings → Pages → Custom domain: enter `raedersrings.com`. The `CNAME` file here
   already carries that value.
4. Tick **Enforce HTTPS** once the certificate provisions (usually within an hour).

### Cloudflare Pages / Netlify

Connect the repository, leave the build command empty, and set the publish directory
to the folder containing `index.html`. Add the custom domain in their dashboard.

### DNS cutover

Your domain registration and your hosting are separate things. You can leave the domain
registered at IONOS and just repoint DNS, or transfer the registration elsewhere later —
either way, moving DNS is what actually takes the site off IONOS hosting.

For GitHub Pages, in your DNS panel:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<your-github-username>.github.io` |

Confirm those IPs against GitHub's current documentation before you commit to them —
they have changed historically.

**Do this before cancelling anything at IONOS:**

- Lower the DNS TTL to 5 minutes a day ahead of the switch, so a mistake is quick to undo.
- Check whether **email** for the domain also runs through IONOS. If it does, changing
  nameservers will break your mail. Preserve the existing `MX` and any `TXT`/SPF/DKIM
  records, or move mail somewhere first.
- Keep the IONOS plan running until the new site resolves and serves over HTTPS. Test on
  a phone off wifi, where DNS caching is different.
- Save a copy of anything on the old site you can't regenerate — photos especially.

## A note about this repository

These files currently live in the `raedersrings/` subdirectory of `pawtism.github.io`,
which is a different site. GitHub Pages serves a user-pages repo from its root and
applies one custom domain to the whole thing, so **`raedersrings.com` cannot point at a
subfolder of this repo.** To go live, this directory needs to become the root of its own
repository. Every path in the HTML is relative, so the files move as-is — no edits needed.
