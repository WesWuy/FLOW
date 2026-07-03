// FLOW — "The Rave in The Cave" show-announcement page.
// Consumes the compiled design-system bundle (loaded by index.html before this
// file) rather than re-implementing Button/Card/etc — no ES import/export so
// this can load as a plain <script type="text/babel" src="…">.
(function () {
  const { Header, Chip, Button, ProductCard, PackCard, CartDrawer, Toast } = window.FLOWDesignSystem_3bfa55;
  const { PRODUCTS } = window.FLOW_MERCH_PRODUCTS;

  function ShowSite() {
    const [kind, setKind] = React.useState("sticker");
    const [filter, setFilter] = React.useState("all");
    const [cart, setCart] = React.useState({});
    const [cartOpen, setCartOpen] = React.useState(false);
    const [toast, setToast] = React.useState({ show: false, message: "" });

    const showToast = (message) => setToast({ show: true, message });

    const addToCart = (slug, qty = 1) => setCart((c) => ({ ...c, [slug]: (c[slug] || 0) + qty }));
    const setQty = (slug, qty) => setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[slug]; else next[slug] = qty;
      return next;
    });
    const removeItem = (slug) => setQty(slug, 0);

    const cartItems = Object.entries(cart).map(([slug, qty]) => {
      const p = PRODUCTS.find((p) => p.slug === slug);
      return p ? { slug, qty, title: p.title, price: p.price, img: p.img } : null;
    }).filter(Boolean);
    const cartCount = cartItems.reduce((a, i) => a + i.qty, 0);
    const cartTotal = cartItems.reduce((a, i) => a + i.qty * i.price, 0);

    const byKind = PRODUCTS.filter((p) => p.kind === kind);
    const visible = filter === "all" ? byKind : byKind.filter((p) => p.tags.includes(filter));

    const addPack = (kindArg) => {
      if (kindArg === "all") {
        byKind.forEach((p) => addToCart(p.slug, 1));
        showToast(`Full Vault added — all ${byKind.length} designs`);
      } else {
        byKind.slice(0, kindArg).forEach((p) => addToCart(p.slug, 1));
        showToast(`${kindArg} designs added to cart`);
      }
      setCartOpen(true);
    };

    return React.createElement("div", { style: { position: "relative", minHeight: "100vh", background: "var(--surface-canvas)", overflowX: "hidden" } },
      React.createElement("div", { "aria-hidden": true, style: {
        position: "fixed", inset: 0, zIndex: -2,
        backgroundImage: "linear-gradient(rgba(120,90,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,90,255,0.07) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)",
      } }),
      React.createElement("div", { "aria-hidden": true, style: {
        position: "fixed", inset: "-20% -10% auto -10%", height: "70vh", zIndex: -1,
        background: "radial-gradient(40% 50% at 20% 10%, rgba(255,45,149,0.22), transparent 70%), radial-gradient(45% 55% at 85% 0%, rgba(54,226,255,0.18), transparent 70%)",
        filter: "blur(20px)",
      } }),
      React.createElement("div", { "aria-hidden": true, className: "flow-sacred-grid", style: {
        position: "fixed", inset: 0, zIndex: -2,
        backgroundImage: "var(--pattern-triangle-grid)",
        backgroundSize: "var(--pattern-triangle-grid-size)",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)",
      } }),
      React.createElement("img", { "aria-hidden": true, src: "assets/geometry/flower-of-life.svg", className: "flow-mandala-spin", style: {
        position: "absolute", top: "52%", left: "50%", transform: "translate(-50%,-50%)",
        width: "min(620px, 82vw)", height: "min(620px, 82vw)", opacity: 0.1, zIndex: 0, pointerEvents: "none",
        maskImage: "radial-gradient(circle, #000 45%, transparent 72%)", WebkitMaskImage: "radial-gradient(circle, #000 45%, transparent 72%)",
      } }),

      React.createElement(Header, { cartCount, onCartClick: () => setCartOpen(true), links: ["Lineup", "Merch", "Info"], logoSrc: "assets/brand/flow-wordmark.jpg" }),

      // ---- Hero: show announcement ----
      React.createElement("section", { "data-screen-label": "Show Site — Hero", style: { position: "relative", padding: "clamp(48px,9vw,110px) clamp(16px,4vw,48px) 40px", maxWidth: 1100, margin: "0 auto", textAlign: "center", overflow: "hidden" } },
        React.createElement("img", { "aria-hidden": true, src: "assets/geometry/flower-of-life.svg", className: "flow-mandala-spin", style: {
          position: "absolute", top: "100%", left: "50%", transform: "translate(-50%, -20%)", zIndex: 0, pointerEvents: "none",
          width: "min(560px, 76vw)", height: "min(560px, 76vw)", opacity: 0.09,
          maskImage: "radial-gradient(circle, #000 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, #000 40%, transparent 70%)",
        } }),
        React.createElement("p", { style: { position: "relative", zIndex: 1, letterSpacing: "4px", textTransform: "uppercase", fontSize: "12px", color: "var(--accent-primary)", margin: "0 0 14px" } }, "FLOW Presents · One Night Only"),
        React.createElement("h1", { style: { position: "relative", zIndex: 1, fontFamily: "var(--font-display)", fontSize: "var(--text-display-hero)", margin: 0 } },
          "The Rave in ", React.createElement("span", { style: { background: "var(--gradient-hero-text)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } }, "The Cave")
        ),
        React.createElement("div", { style: { position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", margin: "16px 0 0", fontFamily: "var(--font-display)", letterSpacing: "3px", textTransform: "uppercase" } },
          React.createElement("span", { style: { fontSize: "34px", color: "var(--gold)", lineHeight: 1 } }, "Jul 25"),
          React.createElement("span", { "aria-hidden": true, style: { width: "8px", height: "8px", background: "var(--accent-primary)", transform: "rotate(45deg)", flexShrink: 0 } }),
          React.createElement("span", { style: { fontSize: "26px", color: "var(--text-primary)", lineHeight: 1 } }, "The Cave · Big Bear")
        ),
        React.createElement("p", { style: { position: "relative", zIndex: 1, maxWidth: 620, margin: "24px auto 32px", color: "var(--text-secondary)", fontSize: "var(--text-body-lede)" } },
          React.createElement("strong", { style: { color: "var(--text-primary)" } }, "Thee-O"), " headlines a night of underground, indy DJs from back in the day — real vinyl energy, real ", React.createElement("strong", { style: { color: "var(--text-primary)" } }, "Future Land of Wonder"), " vibes, back where it belongs: a cave in Big Bear."
        ),
        React.createElement("div", { style: { position: "relative", zIndex: 1, display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" } },
          React.createElement(Button, { variant: "primary", as: "a", href: "#lineup" }, "See the lineup"),
          React.createElement(Button, { variant: "ghost", as: "a", href: "#merch" }, "Grab merch")
        ),
        React.createElement("ul", { style: { position: "relative", zIndex: 1, listStyle: "none", display: "flex", flexWrap: "wrap", gap: "8px 22px", justifyContent: "center", padding: 0, margin: "48px auto 0", maxWidth: 820, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-secondary)" } },
          ["Thee-O headlining", "Underground & indy DJs", "The Future Land of Wonder"].map((t) => React.createElement("li", { key: t, style: { display: "flex", alignItems: "center", gap: "8px" } },
            React.createElement("span", { "aria-hidden": true, style: { width: "6px", height: "6px", background: "var(--cool)", transform: "rotate(45deg)", flexShrink: 0 } }),
            t
          ))
        )
      ),

      // ---- Lineup ----
      React.createElement("section", { id: "lineup", "data-screen-label": "Show Site — Lineup", style: { position: "relative", maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "20px clamp(16px,4vw,48px) 40px", textAlign: "center" } },
        React.createElement("img", { "aria-hidden": true, src: "assets/geometry/metatron-cube.svg", className: "flow-mandala-spin-slow", style: {
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "min(560px, 130%)", height: "min(560px, 130%)", opacity: 0.1, zIndex: 0, pointerEvents: "none",
        } }),
        React.createElement("h2", { style: { position: "relative", zIndex: 1, fontSize: "40px", marginBottom: "18px" } }, "The Lineup"),
        React.createElement("div", { style: {
          background: "var(--surface-card)", border: "1px solid var(--accent-primary)", borderRadius: "var(--radius-lg)",
          boxShadow: "0 0 0 1px rgba(255,45,149,.3), var(--shadow-card)", padding: "28px 24px", marginBottom: "18px", position: "relative", zIndex: 1,
        } },
          React.createElement("span", { style: { display: "inline-block", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#fff", background: "var(--gradient-active-chip)", padding: "4px 12px", borderRadius: "var(--radius-pill)", marginBottom: "10px" } }, "Headliner"),
          React.createElement("h3", { style: { fontSize: "36px", margin: 0 } }, "Thee-O")
        ),
        React.createElement("p", { style: { position: "relative", color: "var(--text-secondary)", fontSize: "15px" } },
          "Plus a rotating cast of underground and indy DJs from back in the day — full support lineup dropping soon."
        )
      ),

      // ---- Info (venue/date placeholder) ----
      React.createElement("section", { id: "info", "data-screen-label": "Show Site — Info", style: { maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "0 clamp(16px,4vw,48px) 60px", textAlign: "center" } },
        React.createElement("h2", { style: { fontSize: "40px", marginBottom: "14px" } }, "The Details"),
        React.createElement("p", { style: { color: "var(--text-secondary)", fontSize: "16px", marginBottom: "6px" } },
          React.createElement("strong", { style: { color: "var(--text-primary)" } }, "The Cave"), " · Big Bear"
        ),
        React.createElement("p", { style: { color: "var(--text-secondary)", fontSize: "14px" } }, "July 25 · Tickets — coming soon."),
        React.createElement("p", { style: { color: "var(--text-secondary)", fontSize: "14px", marginTop: "24px" } },
          "FLOW is the brainchild of ", React.createElement("strong", { style: { color: "var(--text-primary)" } }, "Anthony Daigneault"), " — artist, founder, and the reason any of this exists. ",
          React.createElement("a", { href: "https://www.artpal.com/handecapp", target: "_blank", rel: "noopener", style: { color: "var(--accent-secondary)", textDecoration: "underline", textUnderlineOffset: "3px" } }, "His original art is for sale on ArtPal"), "."
        )
      ),

      // ---- Merch (secondary) ----
      React.createElement("section", { id: "merch", "data-screen-label": "Show Site — Merch", style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "10px clamp(16px,4vw,48px) 20px" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "14px" } },
          React.createElement("h2", { style: { fontSize: "32px", margin: 0 } }, "Rep the night — grab merch"),
          React.createElement("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
            ["sticker", "tshirt", "print"].map((k) => React.createElement(Chip, { key: k, active: kind === k, onClick: () => setKind(k) }, k === "sticker" ? "Stickers" : k === "tshirt" ? "T-Shirts" : "Prints"))
          )
        ),
        React.createElement("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" } },
          ["all", "movies", "games", "street"].map((f) => React.createElement(Chip, { key: f, active: filter === f, onClick: () => setFilter(f) }, f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)))
        ),
        React.createElement("div", { style: { display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" } },
          visible.map((p) => React.createElement(ProductCard, { key: p.slug, product: p, onAdd: (prod) => { addToCart(prod.slug); showToast("Added to cart"); setCartOpen(true); } }))
        )
      ),

      React.createElement("section", { id: "packs", "data-screen-label": "Show Site — Packs", style: { maxWidth: "var(--container-max)", margin: "10px auto 30px", padding: "20px clamp(16px,4vw,48px)" } },
        React.createElement("div", { style: { display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" } },
          React.createElement(PackCard, { title: "Starter 3-Pack", price: "$11.99", note: "Any three single drops. Mix universes.", ctaLabel: "Add 3-Pack", onAdd: () => addPack(3) }),
          React.createElement(PackCard, { title: "The Full Vault", price: "$29.99", note: "All ten designs. The complete Future Land collection.", badge: "Best value", featured: true, ctaLabel: "Add the Vault", onAdd: () => addPack("all") }),
          React.createElement(PackCard, { title: "Holo Duo", price: "$12.99", note: "Any two designs on rainbow holographic vinyl.", ctaLabel: "Add Holo Duo", onAdd: () => addPack(2) })
        )
      ),

      React.createElement("footer", { style: { borderTop: "1px solid var(--border-hairline)", padding: "30px", textAlign: "center", color: "var(--text-secondary)" } },
        React.createElement("img", { src: "assets/brand/flow-wordmark.jpg", alt: "FLOW", style: { height: "34px", width: "auto" } }),
        React.createElement("p", { style: { margin: "6px 0", fontSize: "13px" } }, "The Future Land of Wonder · The Rave in The Cave · Big Bear"),
        React.createElement("p", { style: { margin: "6px 0", fontSize: "12px" } },
          "Founded by Anthony Daigneault · ", React.createElement("a", { href: "https://www.artpal.com/handecapp", target: "_blank", rel: "noopener", style: { color: "var(--accent-secondary)" } }, "Art on ArtPal")
        ),
        React.createElement("p", { style: { margin: "6px 0", fontSize: "11px", opacity: 0.7 } }, `© ${new Date().getFullYear()} FLOW. Stickers are parody fan art.`)
      ),

      React.createElement(CartDrawer, {
        open: cartOpen, items: cartItems, total: cartTotal,
        onClose: () => setCartOpen(false), onQtyChange: setQty, onRemove: removeItem,
        onCheckout: () => { if (!cartCount) { showToast("Cart is empty"); return; } showToast("Demo only — thanks for surfing the FLOW!"); },
      }),
      React.createElement(Toast, { message: toast.message, show: toast.show, onHide: () => setToast((t) => ({ ...t, show: false })) })
    );
  }

  window.ShowSite = ShowSite;
})();
