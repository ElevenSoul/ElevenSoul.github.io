# Eleven · portfolio

A one-page portfolio built with React and Framer Motion.

## Run it on your computer

You need [Node.js](https://nodejs.org) 18 or newer.

```
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Change the words and projects

Everything written on the site is in `src/content.js`: your about text, links,
the gallery pieces and the "What I play" list. Edit that file and save.

- To show a Discord or email button, fill in `me.links.discord` or `me.links.email`.
- To add pictures to a project, put the images in `src/assets/`, import them at the
  top of `content.js`, and set `art: 'photos'` with an `images: [...]` list.
- Colours and fonts are the variables at the top of `src/styles.css`.

## Put it online for free (GitHub Pages)

1. Run `npm run build`. The finished site is in the `dist` folder.
2. Create a public repository named `ElevenSoul.github.io`.
3. Upload the contents of `dist` to it (or push them with git).
4. In the repository, open Settings, then Pages, and choose the `main` branch.

The site will be live at https://elevensoul.github.io a minute later.

`npm run build:single` makes one self-contained `index.html` in `dist-single`
if you ever want to send the whole site as a single file.

## Where things are

```
src/content.js            all the text and projects
src/styles.css            colours, fonts, layout
src/components/Loader     the count to eleven at the start
src/components/Sky        stars and drifting light
src/components/Hero       the name and the moon
src/components/Marquee    the moving band of words
src/components/About      the scroll-revealed text and the record
src/components/Gallery    the sideways gallery, frames and lightbox
src/components/Art        the pictures drawn by code (circle, stars, waves)
src/components/Repertoire the "What I play" list
src/components/Coda       contact and footer
```
