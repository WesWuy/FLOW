// FLOW — The Future Land of Wonder storefront and brand home.
// Uses the compiled FLOW design-system components loaded by index.html.
(function () {
  const { Header, Chip, Button, ProductCard, PackCard, CartDrawer, Toast } = window.FLOWDesignSystem_3bfa55;
  const { PRODUCTS, PACKS } = window.FLOW_MERCH_PRODUCTS;
  const ALL_PURCHASABLE_ITEMS = PRODUCTS.concat(PACKS);
  const PAYPAL_ME_URL = "https://paypal.me/Antonius369";

  const paypalCheckoutUrl = (total) => `${PAYPAL_ME_URL}/${total.toFixed(2)}USD`;

  function FlowSite() {
    const [kind, setKind] = React.useState("sticker");
    const [filter, setFilter] = React.useState("all");
    const [cart, setCart] = React.useState({});
    const [cartOpen, setCartOpen] = React.useState(false);
    const [eventOpen, setEventOpen] = React.useState(false);
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
      const product = ALL_PURCHASABLE_ITEMS.find((p) => p.slug === slug);
      return product ? { slug, qty, title: product.title, price: product.price, img: product.img, orderPrompt: product.orderPrompt } : null;
    }).filter(Boolean);
    const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
    const cartTotal = cartItems.reduce((total, item) => total + item.qty * item.price, 0);

    const byKind = PRODUCTS.filter((product) => product.kind === kind);
    const visible = filter === "all" ? byKind : byKind.filter((product) => product.tags.includes(filter));

    const addPack = (slug) => {
      const pack = PACKS.find((item) => item.slug === slug);
      if (!pack) return;
      addToCart(pack.slug, 1);
      showToast(`${pack.title} added to cart`);
      setCartOpen(true);
    };

    const checkoutWithPayPal = () => {
      if (!cartCount) {
        showToast("Cart is empty");
        return;
      }

      const orderSummary = [
        "FLOW order",
        ...cartItems.map((item) => `${item.qty} x ${item.title} - $${(item.qty * item.price).toFixed(2)}${item.orderPrompt ? `\n  ${item.orderPrompt}` : ""}`),
        `Total: $${cartTotal.toFixed(2)} USD`,
      ].join("\n");
      const checkoutUrl = paypalCheckoutUrl(cartTotal);
      const orderCopy = navigator.clipboard && window.isSecureContext
        ? navigator.clipboard.writeText(orderSummary)
        : null;

      window.open(checkoutUrl, "_blank", "noopener,noreferrer");

      if (orderCopy) {
        orderCopy
          .then(() => showToast("PayPal opened — paste the copied order details into the note"))
          .catch(() => showToast("PayPal opened — add your order details to the payment note"));
      } else {
        showToast("PayPal opened — add your order details to the payment note");
      }
    };

    return React.createElement("div", { id: "top", style: { position: "relative", minHeight: "100vh", background: "var(--surface-canvas)", overflowX: "hidden" } },
      React.createElement("a", {
        href: "#main-content",
        className: "flow-skip-link",
      }, "Skip to main content"),
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
        position: "absolute", top: "44%", left: "50%", transform: "translate(-50%,-50%)",
        width: "min(620px, 82vw)", height: "min(620px, 82vw)", opacity: 0.1, zIndex: 0, pointerEvents: "none",
        maskImage: "radial-gradient(circle, #000 45%, transparent 72%)", WebkitMaskImage: "radial-gradient(circle, #000 45%, transparent 72%)",
      } }),

      React.createElement(Header, { cartCount, onCartClick: () => setCartOpen(true), links: ["About", "Merch", "Events"], logoSrc: "assets/brand/flow-wordmark.jpg" }),

      React.createElement("main", { id: "main-content" },
        React.createElement("section", { "data-screen-label": "FLOW Site — Hero", style: { position: "relative", padding: "clamp(64px,10vw,126px) clamp(16px,4vw,48px) 64px", maxWidth: 1100, margin: "0 auto", textAlign: "center", overflow: "hidden" } },
          React.createElement("img", { "aria-hidden": true, src: "assets/geometry/flower-of-life.svg", className: "flow-mandala-spin", style: {
            position: "absolute", top: "100%", left: "50%", transform: "translate(-50%, -20%)", zIndex: 0, pointerEvents: "none",
            width: "min(560px, 76vw)", height: "min(560px, 76vw)", opacity: 0.09,
            maskImage: "radial-gradient(circle, #000 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, #000 40%, transparent 70%)",
          } }),
          React.createElement("p", { style: { position: "relative", zIndex: 1, letterSpacing: "4px", textTransform: "uppercase", fontSize: "12px", color: "var(--accent-primary)", margin: "0 0 14px" } }, "FLOW · Art, Merch & Experiences"),
          React.createElement("h1", { style: { position: "relative", zIndex: 1, fontFamily: "var(--font-display)", fontSize: "var(--text-display-hero)", margin: 0 } },
            "The Future Land of ", React.createElement("span", { style: { background: "var(--gradient-hero-text)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } }, "Wonder")
          ),
          React.createElement("p", { style: { position: "relative", zIndex: 1, maxWidth: 700, margin: "24px auto 32px", color: "var(--text-secondary)", fontSize: "var(--text-body-lede)" } },
            "FLOW is an evolving world of original art, playful remixes, collectible merch, and imaginative experiences — built to make room for more wonder."
          ),
          React.createElement("div", { style: { position: "relative", zIndex: 1, display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" } },
            React.createElement(Button, { variant: "primary", as: "a", href: "#merch" }, "Shop FLOW"),
            React.createElement(Button, { variant: "ghost", as: "a", href: "#about" }, "Discover the world")
          ),
          React.createElement("ul", { style: { position: "relative", zIndex: 1, listStyle: "none", display: "flex", flexWrap: "wrap", gap: "8px 22px", justifyContent: "center", padding: 0, margin: "48px auto 0", maxWidth: 820, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-secondary)" } },
            ["Original art", "Wearable worlds", "Events when ready"].map((text) => React.createElement("li", { key: text, style: { display: "flex", alignItems: "center", gap: "8px" } },
              React.createElement("span", { "aria-hidden": true, style: { width: "6px", height: "6px", background: "var(--cool)", transform: "rotate(45deg)", flexShrink: 0 } }),
              text
            ))
          )
        ),

        React.createElement("section", { id: "about", "data-screen-label": "FLOW Site — About", style: { position: "relative", maxWidth: "var(--container-max)", margin: "0 auto", padding: "20px clamp(16px,4vw,48px) 72px" } },
          React.createElement("div", { style: { display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" } },
            React.createElement("article", { style: { background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", padding: "clamp(24px,4vw,42px)", boxShadow: "var(--shadow-card)" } },
              React.createElement("p", { style: { color: "var(--accent-secondary)", letterSpacing: "3px", textTransform: "uppercase", fontSize: "11px", marginTop: 0 } }, "The idea"),
              React.createElement("h2", { style: { fontSize: "40px", margin: "0 0 14px" } }, "What is FLOW?"),
              React.createElement("p", { style: { color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.75, marginBottom: 0 } },
                "A creative universe where color, humor, nostalgia, and possibility collide. FLOW turns a distinct visual language into art you can collect, wear, share, and step inside."
              )
            ),
            React.createElement("article", { style: { background: "linear-gradient(145deg, rgba(255,45,149,.12), rgba(54,226,255,.08)), var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", padding: "clamp(24px,4vw,42px)", boxShadow: "var(--shadow-card)" } },
              React.createElement("p", { style: { color: "var(--gold)", letterSpacing: "3px", textTransform: "uppercase", fontSize: "11px", marginTop: 0 } }, "The artist"),
              React.createElement("h2", { style: { fontSize: "40px", margin: "0 0 14px" } }, "Meet Anthony"),
              React.createElement("p", { style: { color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.75 } },
                "FLOW is the brainchild of Anthony Daigneault — artist, founder, and builder of the Future Land of Wonder."
              ),
              React.createElement(Button, { variant: "ghost", as: "a", href: "https://www.artpal.com/handecapp", style: { marginTop: "10px" } }, "Explore original art")
            )
          )
        ),

        React.createElement("section", { id: "merch", "data-screen-label": "FLOW Site — Merch", style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "10px clamp(16px,4vw,48px) 20px" } },
          React.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "18px", marginBottom: "18px" } },
            React.createElement("div", null,
              React.createElement("p", { style: { color: "var(--accent-primary)", letterSpacing: "3px", textTransform: "uppercase", fontSize: "11px", margin: "0 0 8px" } }, "The collection"),
              React.createElement("h2", { style: { fontSize: "40px", margin: 0 } }, "Shop the FLOW"),
              React.createElement("p", { style: { color: "var(--text-secondary)", margin: "8px 0 0" } }, "Stickers, tees, and prints from across the Future Land of Wonder."),
              React.createElement("p", { style: { color: "var(--text-secondary)", margin: "6px 0 0", fontSize: "13px" } }, "Prices are in USD. Checkout is handled securely through PayPal.")
            ),
            React.createElement("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
              ["sticker", "tshirt", "print"].map((format) => React.createElement(Chip, { key: format, active: kind === format, onClick: () => setKind(format) }, format === "sticker" ? "Stickers" : format === "tshirt" ? "T-Shirts" : "Prints"))
            )
          ),
          React.createElement("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" } },
            ["all", "movies", "games", "street"].map((tag) => React.createElement(Chip, { key: tag, active: filter === tag, onClick: () => setFilter(tag) }, tag === "all" ? "All" : tag[0].toUpperCase() + tag.slice(1)))
          ),
          React.createElement("div", { style: { display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" } },
            visible.map((product) => React.createElement(ProductCard, { key: product.slug, product, onAdd: (selected) => { addToCart(selected.slug); showToast("Added to cart"); setCartOpen(true); } }))
          )
        ),

        kind === "sticker" && React.createElement("section", { id: "packs", "data-screen-label": "FLOW Site — Packs", style: { maxWidth: "var(--container-max)", margin: "10px auto 30px", padding: "20px clamp(16px,4vw,48px)" } },
          React.createElement("div", { style: { display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" } },
            React.createElement(PackCard, { title: "Starter 3-Pack", price: "$11.99", note: "Any three single drops. Add your choices to the PayPal note.", ctaLabel: "Add 3-Pack", onAdd: () => addPack("starter-3-pack") }),
            React.createElement(PackCard, { title: "The Full Vault", price: "$29.99", note: "One sticker in every FLOW design.", badge: "Best value", featured: true, ctaLabel: "Add the Vault", onAdd: () => addPack("full-vault") }),
            React.createElement(PackCard, { title: "Holo Duo", price: "$12.99", note: "Any two designs on rainbow holographic vinyl. Add your choices to the PayPal note.", ctaLabel: "Add Holo Duo", onAdd: () => addPack("holo-duo") })
          )
        ),

        React.createElement("section", { id: "events", "data-screen-label": "FLOW Site — Events", style: { position: "relative", maxWidth: "var(--container-narrow)", margin: "0 auto", padding: "30px clamp(16px,4vw,48px) 80px" } },
          React.createElement("img", { "aria-hidden": true, src: "assets/geometry/metatron-cube.svg", className: "flow-mandala-spin-slow", style: {
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(520px, 120%)", height: "min(520px, 120%)", opacity: 0.08, zIndex: 0, pointerEvents: "none",
          } }),
          React.createElement("div", { style: { position: "relative", zIndex: 1, background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: "clamp(28px,5vw,48px)", textAlign: "center" } },
            React.createElement("p", { style: { color: "var(--accent-secondary)", letterSpacing: "3px", textTransform: "uppercase", fontSize: "11px", margin: "0 0 10px" } }, "FLOW events"),
            React.createElement("h2", { style: { fontSize: "42px", margin: "0 0 12px" } }, "Rave in The Cave"),
            React.createElement("p", { style: { color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 22px" } },
              "A FLOW experience currently in development. Public details will be shared only after everything is confirmed."
            ),
            React.createElement("button", {
              type: "button",
              "aria-expanded": eventOpen,
              "aria-controls": "event-status",
              onClick: () => setEventOpen((open) => !open),
              style: { fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "15px", padding: "13px 24px", borderRadius: "var(--radius-pill)", cursor: "pointer", border: "1px solid var(--border-hairline)", background: "transparent", color: "var(--text-primary)" },
            }, eventOpen ? "Hide event status" : "View event status"),
            eventOpen && React.createElement("p", { id: "event-status", style: { color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7, margin: "22px auto 0", maxWidth: 520 } },
              "Planning is underway. Date, venue, lineup, and ticket information are not yet public."
            )
          )
        )
      ),

      React.createElement("footer", { style: { borderTop: "1px solid var(--border-hairline)", padding: "30px", textAlign: "center", color: "var(--text-secondary)" } },
        React.createElement("img", { src: "assets/brand/flow-wordmark.jpg", alt: "FLOW — The Future Land of Wonder", style: { height: "34px", width: "auto" } }),
        React.createElement("p", { style: { margin: "6px 0", fontSize: "13px" } }, "The Future Land of Wonder · Art · Merch · Experiences"),
        React.createElement("p", { style: { margin: "6px 0", fontSize: "12px" } },
          "Founded by Anthony Daigneault · ", React.createElement("a", { href: "https://www.artpal.com/handecapp", target: "_blank", rel: "noopener", style: { color: "var(--accent-secondary)" } }, "Art on ArtPal")
        ),
        React.createElement("p", { style: { margin: "6px 0", fontSize: "11px", opacity: 0.7 } }, `© ${new Date().getFullYear()} FLOW. Stickers are parody fan art.`)
      ),

      React.createElement(CartDrawer, {
        open: cartOpen, items: cartItems, total: cartTotal,
        onClose: () => setCartOpen(false), onQtyChange: setQty, onRemove: removeItem,
        checkoutLabel: "Pay with PayPal",
        checkoutNote: "Pay Antonius369 in USD. Your total is prefilled; paste the copied order details into the PayPal note.",
        onCheckout: checkoutWithPayPal,
      }),
      React.createElement(Toast, { message: toast.message, show: toast.show, onHide: () => setToast((current) => ({ ...current, show: false })) })
    );
  }

  window.FlowSite = FlowSite;
})();
