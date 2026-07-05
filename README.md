# FLOW — The Future Land of Wonder

The official FLOW home for original art, collectible merch, and imaginative
experiences created by artist and founder Anthony Daigneault.

## Current live site

Netlify publishes the self-contained `deploy/` directory. It includes the FLOW
brand home, merchandise collection, PayPal checkout, design tokens, and product
artwork.

```bash
python3 -m http.server 8000 --directory deploy
# then visit http://localhost:8000
```

The root-level storefront files are an earlier prototype retained for reference.

## Content policy

FLOW events appear as entries within the broader brand site. Unconfirmed dates,
venues, lineups, ticket information, and other event details are not published.

## Merchandise

The current collection offers each design as stickers, T-shirts, and prints.
Product content and image mappings live in `deploy/products.js`; artwork lives
in `deploy/images/products/`.

Cart checkout opens Anthony's PayPal.Me profile with the USD total prefilled.
The site copies the itemized order summary so the buyer can paste it into the
PayPal payment note. Sticker packs use their displayed bundle prices.

## Project structure

```text
deploy/                         current Netlify site
deploy/index.html              document shell and accessibility styles
deploy/flow-site.jsx           FLOW brand, merch, and events interface
deploy/products.js             product catalog and image mappings
deploy/images/products/        production artwork
deploy/tokens/                 design-system tokens
deploy/_ds_bundle.js           packaged shared UI components
netlify.toml                   Netlify publish-directory configuration
```

Stickers are parody fan art.
