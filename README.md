# Mirudhula M — Portfolio

**🌐 Live site: https://mirudhulamaruthanayagam27.github.io/**

Personal portfolio of a **Front-End Developer** (HTML, CSS, JavaScript, Angular), built with plain **HTML, CSS and JavaScript** (no frameworks, no build step).

It has these sections: Hero (typing effect and photo), Stats (numbers count up), About, Skills, Projects, Journey (timeline and certifications) and Contact (a form that emails you).

## Tech details

| | |
|---|---|
| **Built with** | HTML5, CSS3 and vanilla JavaScript (ES2020). No framework, no npm packages, no build step |
| **Fonts** | Google Fonts: Bricolage Grotesque (headings) and DM Sans (text) |
| **Hosting** | GitHub Pages (free, static files) |
| **Data storage** | **None.** The site has no database and does not save anything about visitors. Everything shown is written in `index.html` |
| **Contact form** | Sends messages through [FormSubmit](https://formsubmit.co) straight to **mirudhula864@gmail.com**. Nothing is stored on the site |
| **Resume** | A static PDF file in `assets/` |
| **Browser support** | Current Chrome, Edge, Firefox and Safari, on desktop and mobile |

## Files

```
index.html                       all page content
style.css                        styles; every color is a variable at the top
script.js                        mobile menu, typing effect, count-up, contact form
assets/photo.jpg                 profile photo (hero)
assets/Mirudhula_M_Resume.pdf    file for the "Download resume" button
assets/projects/*.jpg            screenshots shown on the project cards (job-tracker, shop-ease, restaurant, portfolio, ironfit)
```

## Run it locally

Double-click `index.html`. Everything works except the contact form, which needs the site to be online (see below).

## Publish on GitHub Pages

The code is in the repository [mirudhulamaruthanayagam27.github.io](https://github.com/MirudhulaMaruthanayagam27/mirudhulamaruthanayagam27.github.io) on the branch **`feat/portfolio`**. Because the repository has this special name, the site opens at the main address.

1. In the repository, go to **Settings → Pages → Build and deployment**.
2. Choose **Deploy from a branch**, then branch **`feat/portfolio`** (or `main` after you merge), folder **/ (root)**, and click **Save**.
3. Wait 1–2 minutes. The site is live at **https://mirudhulamaruthanayagam27.github.io/**

To update the site later, commit and push to the same branch. GitHub republishes it automatically.

## Contact form: how messages reach you

The form sends messages to **mirudhula864@gmail.com** through [FormSubmit](https://formsubmit.co), a free service that needs no account or server.

1. Once the site is online, send yourself a test message from the form.
2. FormSubmit emails **mirudhula864@gmail.com** with an **"Activate Form"** button. Click it once.
3. From then on, every message arrives in that inbox. The visitor's email is set as the reply-to address, so you can just click **Reply**.
4. Check the Spam folder the first time.

Optional: the activation email also gives you a random alias, like `a1b2c3…`. To hide your address from bots, replace the email in `CONTACT_EMAIL` at the top of `script.js` with that alias.

To use a different inbox, change `CONTACT_EMAIL` in `script.js`.

**Why it fails when you double-click `index.html`:** FormSubmit only accepts messages from a website address (`http://` or `https://`), not from a page opened as a file (`file:///`). Test it on the live GitHub Pages site, or from a local web server such as `npx http-server` → `http://localhost:8080`.

**No message is ever lost.** If sending fails for any reason (no internet, form not activated yet, page opened as a file), the visitor gets a **"Send with my email app"** button. It opens Gmail or Outlook with your address, a subject and their message already filled in.

## Project links

Every project card has **Live demo** and **Source code** buttons. A button whose link is not ready yet has `href="#"` and the class `is-pending`; it shows faded with a "coming soon" tooltip and does nothing when clicked.

**To add a link:** in `index.html`, find the button, put the URL in `href`, and delete `is-pending` from its `class`.

| Project | Live demo | Source code |
|---|---|---|
| Job Application Tracker (featured) | ✅ [live](https://mirudhulamaruthanayagam27.github.io/job-tracker/) | ✅ [repository](https://github.com/MirudhulaMaruthanayagam27/job-tracker) |
| ShopEase: E-Commerce Store (Angular) | ⏳ `https://mirudhulamaruthanayagam27.github.io/shop-ease/` | ⏳ `https://github.com/MirudhulaMaruthanayagam27/shop-ease` |
| Restaurant Landing Page | ✅ [live](https://mirudhulamaruthanayagam27.github.io/Restaurant-Landing-PageN/) | ✅ [repository](https://github.com/MirudhulaMaruthanayagam27/Restaurant-Landing-PageN) |
| Personal Portfolio Website | ✅ [live](https://mirudhulamaruthanayagam27.github.io/) | ✅ [repository](https://github.com/MirudhulaMaruthanayagam27/mirudhulamaruthanayagam27.github.io) |
| IRONFIT Gym Landing Page (Figma) | ✅ [View prototype](https://www.figma.com/proto/iJ0lShyvu5bxvKwN6Uwsei/IRONFIT_Landing?node-id=3-9&starting-point-node-id=3%3A9&t=BkJesyUYmIx0oIk6-1) | — |

✅ = link added · ⏳ = placeholder for now.

## Other placeholders

| What | Where | Replace with |
|---|---|---|
| Resume file | `assets/Mirudhula_M_Resume.pdf` | Your newest resume. Keep the same file name |
| Photo | `assets/photo.jpg` | Another photo if you like. A square or portrait photo works best |
| Social preview image | `index.html`, `og:image` | `https://mirudhulamaruthanayagam27.github.io/assets/photo.jpg` once the site is live |

## Change the colors

Open `style.css`. The first block (`:root { … }`) holds every color:
- `--accent` is the terracotta used for buttons and highlights.
- `--ink` is the dark color.
- `--cream` is the page background.
- `--green` is the "Open to work" badge.

Change a value there and the whole site updates.

## Accessibility

The site has:
- A skip link and visible keyboard focus rings
- A mobile menu that closes with Esc
- Labelled form fields, with error messages read out to screen readers
- Animations turned off for visitors who set "reduce motion" on their device
