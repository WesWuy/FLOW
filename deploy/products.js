// FLOW — merch collection for The Future Land of Wonder.
// Each design now ships in three formats: sticker (original), t-shirt, print.
// All listed designs use user-provided artwork.
(function () {
  const DESIGNS = [
    { slug: "flow-pirates", title: "Pirates of the FLOW-ribbean", blurb: "Skull, cutlasses and a galleon under a blood-orange sunset. Yo-ho.", parody: "Pirates of the Caribbean", price: 4.99, accent: "#c9a227", tags: ["movies", "classic"], img: "images/products/flow-pirates.png" },
    { slug: "flow-flowfather", title: "The FLOWfather", blurb: "Gold-foil mob royalty. An offer you can't outflow.", parody: "The Godfather", price: 4.99, accent: "#d4af37", tags: ["movies", "classic"], img: "images/products/flow-flowfather.png" },
    { slug: "flow-jurassic", title: "FLOW Park", blurb: "Apex-predator red. The future land where the dinos roam.", parody: "Jurassic Park", price: 4.99, accent: "#d32f2f", tags: ["movies"], img: "images/products/flow-jurassic.jpg" },
    { slug: "flow-wars", title: "FLOW Wars", blurb: "A galaxy far, far in the flow. May the flow be with you.", parody: "Star Wars", price: 4.99, accent: "#f4c20d", tags: ["movies"], img: "images/products/flow-wars.png" },
    { slug: "flow-fresh", title: "FLOW Fresh", blurb: "The real deal — crown-topped bubble graffiti dripping in sunset gradients.", parody: "Street / graffiti", price: 3.99, accent: "#ff5db1", tags: ["street"], img: "images/products/flow-fresh.jpg" },
    { slug: "flow-zelda", title: "Legend of FLOW", blurb: "Triforce crest on the Hylian shield. It's dangerous to go without flow.", parody: "The Legend of Zelda", price: 4.99, accent: "#2e7d32", tags: ["games"], img: "images/products/flow-zelda.jpg" },
    { slug: "flow-tv", title: "FLOW TV", blurb: "Neon green-pink drip with a glitchy retro set. Static never looked so clean.", parody: "Street / retro", price: 3.99, accent: "#23e08a", tags: ["street"], img: "images/products/flow-tv.jpg" },
    { slug: "flow-street", title: "FLOW Street", blurb: "Wildstyle throw-up sprayed straight onto the concrete.", parody: "Street / graffiti", price: 3.99, accent: "#f4b400", tags: ["street"], img: "images/products/flow-street.jpg" },
    { slug: "flow-grey", title: "FLOW the Grey", blurb: "Chrome wildstyle with a wizard standing watch. You shall not outflow.", parody: "The Lord of the Rings", price: 4.99, accent: "#9b6dff", tags: ["movies", "street"], img: "images/products/flow-grey.jpg" },
    { slug: "flow-future", title: "Back to the FLOWture", blurb: "88 mph straight into the Future Land of Wonder.", parody: "Back to the Future", price: 4.99, accent: "#4ea3ff", tags: ["movies"], img: "images/products/flow-future.png" },
    { slug: "flow-mrflowhead", title: "Mr FLOW Head", blurb: "Disco-fried spud royalty in platform shoes. Point it anywhere — the funk follows.", parody: "Mr. Potato Head", price: 4.99, accent: "#f4a220", tags: ["movies", "classic"], img: "images/products/flow-mrflowhead.jpg" },
    { slug: "flow-need4flow", title: "Need for FLOW 2 Underground", blurb: "Neon-drenched street racers at 2AM. The underground never sleeps.", parody: "Need for Speed", price: 4.99, accent: "#e14bd2", tags: ["games", "street"], img: "images/products/flow-need4flow.png" },
    { slug: "flow-megaflow", title: "Mega FLOW", blurb: "Blue bomber energy, buster fully charged. Boss level: the future.", parody: "Mega Man", price: 4.99, accent: "#2f7ff4", tags: ["games"], img: "images/products/flow-megaflow.png" },
  ];

  const FORMATS = {
    sticker: { label: "Stickers", price: 4.99, suffix: "", parodyPrefix: "" },
    tshirt: { label: "T-Shirts", price: 24.99, suffix: " Tee", parodyPrefix: "Tee · " },
    print: { label: "Prints", price: 14.99, suffix: " Print", parodyPrefix: "11×17 Print · " },
  };

  const PRODUCTS = [];
  Object.keys(FORMATS).forEach((kind) => {
    const f = FORMATS[kind];
    DESIGNS.forEach((d) => {
      PRODUCTS.push({
        slug: d.slug + "-" + kind,
        title: d.title + f.suffix,
        blurb: d.blurb,
        parody: f.parodyPrefix + d.parody,
        price: kind === "sticker" ? d.price || 4.99 : f.price,
        accent: d.accent,
        tags: d.tags,
        kind,
        img: d.img,
      });
    });
  });

  window.FLOW_MERCH_PRODUCTS = { PRODUCTS, DESIGNS, FORMATS };
})();
