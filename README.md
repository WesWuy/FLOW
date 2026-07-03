# FLOW — Rave Cave Merch Site

A single-page sticker storefront for **FLOW · The Future Land of Wonder**.

Nine die-cut sticker drops, each a parody of a different universe, with a
filterable line-up, pack deals, and a working client-side cart.

## Run it

It's plain HTML/CSS/JS — no build step. Just open `index.html`, or serve the
folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Current live-site package

The imported `deploy/` directory contains **The Rave in The Cave** site and its
packaged FLOW design-system runtime. It is ready for static hosting as-is:

```bash
python3 -m http.server 8000 --directory deploy
# then visit http://localhost:8000
```

The root-level storefront files are the earlier prototype and remain available
for reference.

## Adding the real artwork

The site ships with auto-generated placeholders so it looks complete out of the
box. To use the real designs, upload the artwork into `images/` using the exact
filenames listed in [`images/README.md`](images/README.md) (drag them in as-is —
no renaming, mixed `.jpg`/`.png` is fine). They swap in automatically.

## The line-up

| Design | Parody |
|--------|--------|
| Pirates of the FLOW-ribbean | Pirates of the Caribbean |
| The FLOWfather | The Godfather |
| FLOW Park | Jurassic Park |
| FLOW Wars | Star Wars |
| FLOW Fresh | Street / graffiti |
| Legend of FLOW | The Legend of Zelda |
| FLOW TV | Street / retro |
| FLOW Street | Street / graffiti |
| FLOW the Grey | The Lord of the Rings |
| Back to the FLOWture | Back to the Future |

## Project structure

```
deploy/         current live site + packaged design-system runtime
index.html      markup + sections
styles.css      rave/neon styling
products.js     the line-up (edit titles, prices, blurbs here)
app.js          grid render, filters, cart
images/         your PNGs go here (placeholders included)
```

Stickers are parody fan art.
