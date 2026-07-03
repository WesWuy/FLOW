/* @ds-bundle: {"format":4,"namespace":"FLOWDesignSystem_3bfa55","components":[{"name":"CartDrawer","sourcePath":"components/commerce/CartDrawer.jsx"},{"name":"PackCard","sourcePath":"components/commerce/PackCard.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"QuantityStepper","sourcePath":"components/commerce/QuantityStepper.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"}],"sourceHashes":{"components/commerce/CartDrawer.jsx":"663464116dd7","components/commerce/PackCard.jsx":"43cf2179e911","components/commerce/ProductCard.jsx":"b4af3137d357","components/commerce/QuantityStepper.jsx":"dae428e15f24","components/core/Button.jsx":"acb065e54e5f","components/core/Chip.jsx":"3c78c64b9eb0","components/feedback/Toast.jsx":"09a880f7aa50","components/navigation/Header.jsx":"3dee93f1386d","ui_kits/flow-show/ShowSite.jsx":"7440a8c82168","ui_kits/flow-show/products.js":"bc49426f183d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FLOWDesignSystem_3bfa55 = window.FLOWDesignSystem_3bfa55 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/PackCard.jsx
try { (() => {
// Pricing bundle tile — .pack / .pack-featured in source site.
function PackCard({
  title,
  price,
  note,
  badge,
  featured = false,
  ctaLabel,
  onAdd
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      position: "relative",
      background: "var(--surface-card)",
      border: featured ? "1px solid var(--accent-primary)" : "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-lg)",
      padding: "26px 22px",
      textAlign: "center",
      boxShadow: featured ? "0 0 0 1px rgba(255,45,149,.3), var(--shadow-card)" : "none"
    }
  }, badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "-11px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--gradient-active-chip)",
      color: "#fff",
      fontSize: "11px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      padding: "4px 12px",
      borderRadius: "var(--radius-pill)"
    }
  }, badge), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "28px",
      margin: "0 0 6px"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-display-pack-price)",
      margin: "0 0 6px",
      color: "var(--accent-success)"
    }
  }, price), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      fontSize: "13px",
      margin: "0 0 18px",
      minHeight: "36px"
    }
  }, note), /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 700,
      fontSize: "15px",
      padding: "13px 24px",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      border: featured ? "1px solid transparent" : "1px solid var(--border-hairline)",
      background: featured ? "var(--gradient-btn-primary)" : "transparent",
      color: featured ? "#fff" : "var(--text-primary)",
      boxShadow: featured ? "var(--glow-primary)" : "none",
      width: "100%"
    }
  }, ctaLabel));
}
Object.assign(__ds_scope, { PackCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PackCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
// Sticker product tile — .card / .card-media / .card-body in source site.
function ProductCard({
  product,
  onAdd
}) {
  const {
    title,
    blurb,
    price,
    parody,
    accent,
    img
  } = product;
  return /*#__PURE__*/React.createElement("article", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "transform var(--duration-slow) var(--ease-standard), border-color var(--duration-slow) var(--ease-standard), box-shadow var(--duration-slow) var(--ease-standard)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.borderColor = accent || "var(--accent-secondary)";
      e.currentTarget.style.boxShadow = "var(--shadow-card)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "var(--border-hairline)";
      e.currentTarget.style.boxShadow = "none";
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "1 / 1",
      background: "#050409",
      display: "grid",
      placeItems: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 2,
      fontSize: "10px",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      background: "rgba(7,6,13,.7)",
      border: "1px solid var(--border-hairline)",
      color: "var(--text-secondary)",
      padding: "4px 9px",
      borderRadius: "var(--radius-pill)"
    }
  }, parody), img && /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      padding: "14px"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-display-card-title)",
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "13px",
      color: "var(--text-secondary)",
      flex: 1,
      margin: 0
    }
  }, blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "24px",
      letterSpacing: "1px"
    }
  }, "$", price.toFixed(2)), /*#__PURE__*/React.createElement("button", {
    onClick: () => onAdd && onAdd(product),
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 700,
      fontSize: "13px",
      color: "#fff",
      background: accent || "var(--accent-primary)",
      border: "none",
      padding: "9px 16px",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      transition: "filter var(--duration-base), transform var(--duration-fast)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.filter = "brightness(1.12)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = "none";
    }
  }, "Add to cart"))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/QuantityStepper.jsx
try { (() => {
// Quantity stepper — .qty in the source site.
function QuantityStepper({
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": "Decrease",
    onClick: () => onChange(value - 1),
    style: {
      width: "24px",
      height: "24px",
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--border-hairline)",
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      cursor: "pointer",
      fontSize: "15px",
      lineHeight: 1
    }
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: "18px",
      textAlign: "center",
      fontSize: "14px"
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Increase",
    onClick: () => onChange(value + 1),
    style: {
      width: "24px",
      height: "24px",
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--border-hairline)",
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      cursor: "pointer",
      fontSize: "15px",
      lineHeight: 1
    }
  }, "+"));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CartDrawer.jsx
try { (() => {
// Slide-in cart drawer — #cartDrawer / #cartOverlay in source site.
function CartDrawer({
  open,
  items,
  total,
  onClose,
  onQtyChange,
  onRemove,
  onCheckout
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      background: "rgba(0,0,0,.6)",
      backdropFilter: "blur(var(--blur-cart-overlay))"
    }
  }), /*#__PURE__*/React.createElement("aside", {
    role: "dialog",
    "aria-label": "Cart",
    style: {
      position: "fixed",
      top: 0,
      right: 0,
      zIndex: 70,
      height: "100%",
      width: "min(390px, 92vw)",
      background: "var(--surface-raised)",
      borderLeft: "1px solid var(--border-hairline)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "var(--shadow-drawer)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 20px",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "28px",
      margin: 0
    }
  }, "Your Cart"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close cart",
    style: {
      background: "none",
      border: "none",
      color: "var(--text-primary)",
      fontSize: "28px",
      lineHeight: 1,
      cursor: "pointer"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "10px 16px"
    }
  }, items.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      textAlign: "center",
      padding: "40px 10px"
    }
  }, "Your cart is empty.", /*#__PURE__*/React.createElement("br", null), "Go grab some FLOW.") : items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.slug,
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      padding: "12px 4px",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, it.img && /*#__PURE__*/React.createElement("img", {
    src: it.img,
    alt: "",
    style: {
      width: "54px",
      height: "54px",
      objectFit: "contain",
      background: "#050409",
      borderRadius: "var(--radius-md)",
      padding: "4px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "14px",
      fontWeight: 700
    }
  }, it.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "var(--text-secondary)"
    }
  }, "$", it.price.toFixed(2), " each"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(it.slug),
    style: {
      background: "none",
      border: "none",
      color: "var(--text-secondary)",
      cursor: "pointer",
      fontSize: "12px"
    }
  }, "Remove")), /*#__PURE__*/React.createElement(__ds_scope.QuantityStepper, {
    value: it.qty,
    onChange: n => onQtyChange(it.slug, n)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "14px",
      fontSize: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "30px",
      color: "var(--accent-success)"
    }
  }, "$", total.toFixed(2))), /*#__PURE__*/React.createElement("button", {
    onClick: onCheckout,
    style: {
      width: "100%",
      fontFamily: "var(--font-body)",
      fontWeight: 700,
      fontSize: "15px",
      padding: "13px 24px",
      borderRadius: "var(--radius-pill)",
      border: "none",
      cursor: "pointer",
      background: "var(--gradient-btn-primary)",
      color: "#fff",
      boxShadow: "var(--glow-primary)"
    }
  }, "Checkout"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      color: "var(--text-secondary)",
      fontSize: "11px",
      margin: "10px 0 0"
    }
  }, "Demo storefront \u2014 checkout is a placeholder."))));
}
Object.assign(__ds_scope, { CartDrawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
// Pill-shaped CTA button. Variants + sizes match the Rave Cave Merch Site
// .btn / .btn-primary / .btn-ghost classes exactly.
function Button({
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  as = "button",
  href,
  children,
  onClick,
  style
}) {
  const base = {
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    fontSize: size === "sm" ? "13px" : "15px",
    padding: size === "sm" ? "9px 16px" : "13px 24px",
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid transparent",
    transition: "transform var(--duration-fast) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), background var(--duration-base) var(--ease-standard), filter var(--duration-base) var(--ease-standard)",
    display: full ? "flex" : "inline-flex",
    width: full ? "100%" : undefined,
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    opacity: disabled ? 0.5 : 1,
    ...style
  };
  const variants = {
    primary: {
      background: "var(--gradient-btn-primary)",
      color: "#fff",
      boxShadow: "var(--glow-primary)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-primary)",
      borderColor: "var(--border-hairline)"
    },
    accent: {
      background: "var(--accent-primary)",
      color: "#fff"
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: as === "button" ? disabled : undefined,
    style: {
      ...base,
      ...variants[variant]
    },
    onMouseEnter: e => {
      if (disabled) return;
      if (variant === "primary") e.currentTarget.style.boxShadow = "var(--glow-primary-hover)";
      if (variant === "ghost") {
        e.currentTarget.style.borderColor = "var(--accent-secondary)";
        e.currentTarget.style.color = "var(--accent-secondary)";
      }
      if (variant === "accent") e.currentTarget.style.filter = "brightness(1.12)";
    },
    onMouseLeave: e => {
      if (variant === "primary") e.currentTarget.style.boxShadow = "var(--glow-primary)";
      if (variant === "ghost") {
        e.currentTarget.style.borderColor = "var(--border-hairline)";
        e.currentTarget.style.color = "var(--text-primary)";
      }
      if (variant === "accent") e.currentTarget.style.filter = "none";
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "translateY(1px) scale(.99)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
// Filter pill — .chip / .chip.is-active in the source site.
function Chip({
  active = false,
  onClick,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      color: active ? "#fff" : "var(--text-secondary)",
      background: active ? "var(--gradient-active-chip)" : "var(--surface-card)",
      border: active ? "1px solid transparent" : "1px solid var(--border-hairline)",
      padding: "7px 16px",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      transition: "color var(--duration-base) var(--ease-standard)"
    },
    onMouseEnter: e => {
      if (!active) e.currentTarget.style.color = "var(--text-primary)";
    },
    onMouseLeave: e => {
      if (!active) e.currentTarget.style.color = "var(--text-secondary)";
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const {
  useEffect
} = React; // Bottom toast — #toast in source site.
function Toast({
  message,
  show,
  onHide,
  duration = 1900
}) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onHide && onHide(), duration);
    return () => clearTimeout(t);
  }, [show, message]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      left: "50%",
      bottom: "26px",
      zIndex: 90,
      transform: show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
      background: "var(--text-primary)",
      color: "var(--surface-canvas)",
      fontWeight: 700,
      fontSize: "14px",
      padding: "11px 20px",
      borderRadius: "var(--radius-pill)",
      boxShadow: "var(--shadow-card)",
      opacity: show ? 1 : 0,
      pointerEvents: "none",
      transition: "opacity var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)"
    }
  }, message);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
// Sticky site header — .site-header / .brand / .nav in source site.
function Header({
  cartCount = 0,
  onCartClick,
  links = ["Shop", "Packs", "About"],
  logoSrc
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px clamp(16px, 4vw, 48px)",
      background: "rgba(7, 6, 13, 0.72)",
      backdropFilter: "blur(var(--blur-header))",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      lineHeight: 1
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "FLOW \u2014 The Future Land of Wonder",
    style: {
      height: "38px",
      width: "auto"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "30px",
      letterSpacing: "4px",
      background: "var(--gradient-brand)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "FLOW"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, "The Future Land of Wonder"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(10px, 2vw, 26px)"
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#" + l.toLowerCase(),
    style: {
      fontSize: "14px",
      color: "var(--text-secondary)"
    }
  }, l)), /*#__PURE__*/React.createElement("button", {
    onClick: onCartClick,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      fontWeight: 700,
      color: "var(--text-primary)",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-pill)",
      padding: "8px 14px",
      cursor: "pointer",
      display: "inline-flex",
      gap: "8px",
      alignItems: "center"
    }
  }, "Cart", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--accent-primary)",
      color: "#fff",
      fontSize: "11px",
      minWidth: "18px",
      height: "18px",
      borderRadius: "var(--radius-pill)",
      display: "inline-grid",
      placeItems: "center",
      padding: "0 5px"
    }
  }, cartCount))));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/flow-show/ShowSite.jsx
try { (() => {
// FLOW — "The Rave in The Cave" show-announcement page.
// Consumes the compiled design-system bundle (loaded by index.html before this
// file) rather than re-implementing Button/Card/etc — no ES import/export so
// this can load as a plain <script type="text/babel" src="…">.
(function () {
  const {
    Header,
    Chip,
    Button,
    ProductCard,
    PackCard,
    CartDrawer,
    Toast
  } = window.FLOWDesignSystem_3bfa55;
  const {
    PRODUCTS
  } = window.FLOW_MERCH_PRODUCTS;
  function ShowSite() {
    const [kind, setKind] = React.useState("sticker");
    const [filter, setFilter] = React.useState("all");
    const [cart, setCart] = React.useState({});
    const [cartOpen, setCartOpen] = React.useState(false);
    const [toast, setToast] = React.useState({
      show: false,
      message: ""
    });
    const showToast = message => setToast({
      show: true,
      message
    });
    const addToCart = (slug, qty = 1) => setCart(c => ({
      ...c,
      [slug]: (c[slug] || 0) + qty
    }));
    const setQty = (slug, qty) => setCart(c => {
      const next = {
        ...c
      };
      if (qty <= 0) delete next[slug];else next[slug] = qty;
      return next;
    });
    const removeItem = slug => setQty(slug, 0);
    const cartItems = Object.entries(cart).map(([slug, qty]) => {
      const p = PRODUCTS.find(p => p.slug === slug);
      return p ? {
        slug,
        qty,
        title: p.title,
        price: p.price,
        img: p.img
      } : null;
    }).filter(Boolean);
    const cartCount = cartItems.reduce((a, i) => a + i.qty, 0);
    const cartTotal = cartItems.reduce((a, i) => a + i.qty * i.price, 0);
    const byKind = PRODUCTS.filter(p => p.kind === kind);
    const visible = filter === "all" ? byKind : byKind.filter(p => p.tags.includes(filter));
    const addPack = kindArg => {
      if (kindArg === "all") {
        byKind.forEach(p => addToCart(p.slug, 1));
        showToast(`Full Vault added — all ${byKind.length} designs`);
      } else {
        byKind.slice(0, kindArg).forEach(p => addToCart(p.slug, 1));
        showToast(`${kindArg} designs added to cart`);
      }
      setCartOpen(true);
    };
    return React.createElement("div", {
      style: {
        position: "relative",
        minHeight: "100vh",
        background: "var(--surface-canvas)",
        overflowX: "hidden"
      }
    }, React.createElement("div", {
      "aria-hidden": true,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: -2,
        backgroundImage: "linear-gradient(rgba(120,90,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,90,255,0.07) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)"
      }
    }), React.createElement("div", {
      "aria-hidden": true,
      style: {
        position: "fixed",
        inset: "-20% -10% auto -10%",
        height: "70vh",
        zIndex: -1,
        background: "radial-gradient(40% 50% at 20% 10%, rgba(255,45,149,0.22), transparent 70%), radial-gradient(45% 55% at 85% 0%, rgba(54,226,255,0.18), transparent 70%)",
        filter: "blur(20px)"
      }
    }), React.createElement("div", {
      "aria-hidden": true,
      className: "flow-sacred-grid",
      style: {
        position: "fixed",
        inset: 0,
        zIndex: -2,
        backgroundImage: "var(--pattern-triangle-grid)",
        backgroundSize: "var(--pattern-triangle-grid-size)",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)"
      }
    }), React.createElement("img", {
      "aria-hidden": true,
      src: "../../assets/geometry/flower-of-life.svg",
      className: "flow-mandala-spin",
      style: {
        position: "absolute",
        top: "52%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "min(620px, 82vw)",
        height: "min(620px, 82vw)",
        opacity: 0.1,
        zIndex: 0,
        pointerEvents: "none",
        maskImage: "radial-gradient(circle, #000 45%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(circle, #000 45%, transparent 72%)"
      }
    }), React.createElement(Header, {
      cartCount,
      onCartClick: () => setCartOpen(true),
      links: ["Lineup", "Merch", "Info"],
      logoSrc: "../../assets/brand/flow-wordmark.jpg"
    }),
    // ---- Hero: show announcement ----
    React.createElement("section", {
      "data-screen-label": "Show Site — Hero",
      style: {
        position: "relative",
        padding: "clamp(48px,9vw,110px) clamp(16px,4vw,48px) 40px",
        maxWidth: 1100,
        margin: "0 auto",
        textAlign: "center",
        overflow: "hidden"
      }
    }, React.createElement("img", {
      "aria-hidden": true,
      src: "../../assets/geometry/flower-of-life.svg",
      className: "flow-mandala-spin",
      style: {
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -20%)",
        zIndex: 0,
        pointerEvents: "none",
        width: "min(560px, 76vw)",
        height: "min(560px, 76vw)",
        opacity: 0.09,
        maskImage: "radial-gradient(circle, #000 40%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle, #000 40%, transparent 70%)"
      }
    }), React.createElement("p", {
      style: {
        position: "relative",
        zIndex: 1,
        letterSpacing: "4px",
        textTransform: "uppercase",
        fontSize: "12px",
        color: "var(--accent-primary)",
        margin: "0 0 14px"
      }
    }, "FLOW Presents · One Night Only"), React.createElement("h1", {
      style: {
        position: "relative",
        zIndex: 1,
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-display-hero)",
        margin: 0
      }
    }, "The Rave in ", React.createElement("span", {
      style: {
        background: "var(--gradient-hero-text)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent"
      }
    }, "The Cave")), React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        margin: "16px 0 0",
        fontFamily: "var(--font-display)",
        letterSpacing: "3px",
        textTransform: "uppercase"
      }
    }, React.createElement("span", {
      style: {
        fontSize: "34px",
        color: "var(--gold)",
        lineHeight: 1
      }
    }, "Jul 25"), React.createElement("span", {
      "aria-hidden": true,
      style: {
        width: "8px",
        height: "8px",
        background: "var(--accent-primary)",
        transform: "rotate(45deg)",
        flexShrink: 0
      }
    }), React.createElement("span", {
      style: {
        fontSize: "26px",
        color: "var(--text-primary)",
        lineHeight: 1
      }
    }, "The Cave · Big Bear")), React.createElement("p", {
      style: {
        position: "relative",
        zIndex: 1,
        maxWidth: 620,
        margin: "24px auto 32px",
        color: "var(--text-secondary)",
        fontSize: "var(--text-body-lede)"
      }
    }, React.createElement("strong", {
      style: {
        color: "var(--text-primary)"
      }
    }, "Thee-O"), " headlines a night of underground, indy DJs from back in the day — real vinyl energy, real ", React.createElement("strong", {
      style: {
        color: "var(--text-primary)"
      }
    }, "Future Land of Wonder"), " vibes, back where it belongs: a cave in Big Bear."), React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 1,
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        flexWrap: "wrap"
      }
    }, React.createElement(Button, {
      variant: "primary",
      as: "a",
      href: "#lineup"
    }, "See the lineup"), React.createElement(Button, {
      variant: "ghost",
      as: "a",
      href: "#merch"
    }, "Grab merch")), React.createElement("ul", {
      style: {
        position: "relative",
        zIndex: 1,
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px 22px",
        justifyContent: "center",
        padding: 0,
        margin: "48px auto 0",
        maxWidth: 820,
        fontSize: "12px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "var(--text-secondary)"
      }
    }, ["Thee-O headlining", "Underground & indy DJs", "The Future Land of Wonder"].map(t => React.createElement("li", {
      key: t,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }
    }, React.createElement("span", {
      "aria-hidden": true,
      style: {
        width: "6px",
        height: "6px",
        background: "var(--cool)",
        transform: "rotate(45deg)",
        flexShrink: 0
      }
    }), t)))),
    // ---- Lineup ----
    React.createElement("section", {
      id: "lineup",
      "data-screen-label": "Show Site — Lineup",
      style: {
        position: "relative",
        maxWidth: "var(--container-narrow)",
        margin: "0 auto",
        padding: "20px clamp(16px,4vw,48px) 40px",
        textAlign: "center"
      }
    }, React.createElement("img", {
      "aria-hidden": true,
      src: "../../assets/geometry/metatron-cube.svg",
      className: "flow-mandala-spin-slow",
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "min(560px, 130%)",
        height: "min(560px, 130%)",
        opacity: 0.1,
        zIndex: 0,
        pointerEvents: "none"
      }
    }), React.createElement("h2", {
      style: {
        position: "relative",
        zIndex: 1,
        fontSize: "40px",
        marginBottom: "18px"
      }
    }, "The Lineup"), React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        border: "1px solid var(--accent-primary)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 0 0 1px rgba(255,45,149,.3), var(--shadow-card)",
        padding: "28px 24px",
        marginBottom: "18px",
        position: "relative",
        zIndex: 1
      }
    }, React.createElement("span", {
      style: {
        display: "inline-block",
        fontSize: "11px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#fff",
        background: "var(--gradient-active-chip)",
        padding: "4px 12px",
        borderRadius: "var(--radius-pill)",
        marginBottom: "10px"
      }
    }, "Headliner"), React.createElement("h3", {
      style: {
        fontSize: "36px",
        margin: 0
      }
    }, "Thee-O")), React.createElement("p", {
      style: {
        position: "relative",
        color: "var(--text-secondary)",
        fontSize: "15px"
      }
    }, "Plus a rotating cast of underground and indy DJs from back in the day — full support lineup dropping soon.")),
    // ---- Info (venue/date placeholder) ----
    React.createElement("section", {
      id: "info",
      "data-screen-label": "Show Site — Info",
      style: {
        maxWidth: "var(--container-narrow)",
        margin: "0 auto",
        padding: "0 clamp(16px,4vw,48px) 60px",
        textAlign: "center"
      }
    }, React.createElement("h2", {
      style: {
        fontSize: "40px",
        marginBottom: "14px"
      }
    }, "The Details"), React.createElement("p", {
      style: {
        color: "var(--text-secondary)",
        fontSize: "16px",
        marginBottom: "6px"
      }
    }, React.createElement("strong", {
      style: {
        color: "var(--text-primary)"
      }
    }, "The Cave"), " · Big Bear"), React.createElement("p", {
      style: {
        color: "var(--text-secondary)",
        fontSize: "14px"
      }
    }, "July 25 · Tickets — coming soon."), React.createElement("p", {
      style: {
        color: "var(--text-secondary)",
        fontSize: "14px",
        marginTop: "24px"
      }
    }, "FLOW is the brainchild of ", React.createElement("strong", {
      style: {
        color: "var(--text-primary)"
      }
    }, "Anthony Daigneault"), " — artist, founder, and the reason any of this exists. ", React.createElement("a", {
      href: "https://www.artpal.com/handecapp",
      target: "_blank",
      rel: "noopener",
      style: {
        color: "var(--accent-secondary)",
        textDecoration: "underline",
        textUnderlineOffset: "3px"
      }
    }, "His original art is for sale on ArtPal"), ".")),
    // ---- Merch (secondary) ----
    React.createElement("section", {
      id: "merch",
      "data-screen-label": "Show Site — Merch",
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "10px clamp(16px,4vw,48px) 20px"
      }
    }, React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        marginBottom: "14px"
      }
    }, React.createElement("h2", {
      style: {
        fontSize: "32px",
        margin: 0
      }
    }, "Rep the night — grab merch"), React.createElement("div", {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
      }
    }, ["sticker", "tshirt", "print"].map(k => React.createElement(Chip, {
      key: k,
      active: kind === k,
      onClick: () => setKind(k)
    }, k === "sticker" ? "Stickers" : k === "tshirt" ? "T-Shirts" : "Prints")))), React.createElement("div", {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "22px"
      }
    }, ["all", "movies", "games", "street"].map(f => React.createElement(Chip, {
      key: f,
      active: filter === f,
      onClick: () => setFilter(f)
    }, f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)))), React.createElement("div", {
      style: {
        display: "grid",
        gap: "18px",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))"
      }
    }, visible.map(p => React.createElement(ProductCard, {
      key: p.slug,
      product: p,
      onAdd: prod => {
        addToCart(prod.slug);
        showToast("Added to cart");
        setCartOpen(true);
      }
    })))), React.createElement("section", {
      id: "packs",
      "data-screen-label": "Show Site — Packs",
      style: {
        maxWidth: "var(--container-max)",
        margin: "10px auto 30px",
        padding: "20px clamp(16px,4vw,48px)"
      }
    }, React.createElement("div", {
      style: {
        display: "grid",
        gap: "18px",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
      }
    }, React.createElement(PackCard, {
      title: "Starter 3-Pack",
      price: "$11.99",
      note: "Any three single drops. Mix universes.",
      ctaLabel: "Add 3-Pack",
      onAdd: () => addPack(3)
    }), React.createElement(PackCard, {
      title: "The Full Vault",
      price: "$29.99",
      note: "All ten designs. The complete Future Land collection.",
      badge: "Best value",
      featured: true,
      ctaLabel: "Add the Vault",
      onAdd: () => addPack("all")
    }), React.createElement(PackCard, {
      title: "Holo Duo",
      price: "$12.99",
      note: "Any two designs on rainbow holographic vinyl.",
      ctaLabel: "Add Holo Duo",
      onAdd: () => addPack(2)
    }))), React.createElement("footer", {
      style: {
        borderTop: "1px solid var(--border-hairline)",
        padding: "30px",
        textAlign: "center",
        color: "var(--text-secondary)"
      }
    }, React.createElement("img", {
      src: "../../assets/brand/flow-wordmark.jpg",
      alt: "FLOW",
      style: {
        height: "34px",
        width: "auto"
      }
    }), React.createElement("p", {
      style: {
        margin: "6px 0",
        fontSize: "13px"
      }
    }, "The Future Land of Wonder · The Rave in The Cave · Big Bear"), React.createElement("p", {
      style: {
        margin: "6px 0",
        fontSize: "12px"
      }
    }, "Founded by Anthony Daigneault · ", React.createElement("a", {
      href: "https://www.artpal.com/handecapp",
      target: "_blank",
      rel: "noopener",
      style: {
        color: "var(--accent-secondary)"
      }
    }, "Art on ArtPal")), React.createElement("p", {
      style: {
        margin: "6px 0",
        fontSize: "11px",
        opacity: 0.7
      }
    }, `© ${new Date().getFullYear()} FLOW. Stickers are parody fan art.`)), React.createElement(CartDrawer, {
      open: cartOpen,
      items: cartItems,
      total: cartTotal,
      onClose: () => setCartOpen(false),
      onQtyChange: setQty,
      onRemove: removeItem,
      onCheckout: () => {
        if (!cartCount) {
          showToast("Cart is empty");
          return;
        }
        showToast("Demo only — thanks for surfing the FLOW!");
      }
    }), React.createElement(Toast, {
      message: toast.message,
      show: toast.show,
      onHide: () => setToast(t => ({
        ...t,
        show: false
      }))
    }));
  }
  window.ShowSite = ShowSite;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/flow-show/ShowSite.jsx", error: String((e && e.message) || e) }); }

// ui_kits/flow-show/products.js
try { (() => {
// FLOW — merch line-up for The Rave in The Cave (mirrors source repo products.js).
// Each design now ships in three formats: sticker (original), t-shirt, print.
// Real artwork exists for 9 of 10 designs (uploaded by the user); flow-future
// still uses the repo's auto-generated placeholder.
(function () {
  const DESIGNS = [{
    slug: "flow-pirates",
    title: "Pirates of the FLOW-ribbean",
    blurb: "Skull, cutlasses and a galleon under a blood-orange sunset. Yo-ho.",
    parody: "Pirates of the Caribbean",
    price: 4.99,
    accent: "#c9a227",
    tags: ["movies", "classic"],
    img: "../../images/products/flow-pirates.png"
  }, {
    slug: "flow-flowfather",
    title: "The FLOWfather",
    blurb: "Gold-foil mob royalty. An offer you can't outflow.",
    parody: "The Godfather",
    price: 4.99,
    accent: "#d4af37",
    tags: ["movies", "classic"],
    img: "../../images/products/flow-flowfather.png"
  }, {
    slug: "flow-jurassic",
    title: "FLOW Park",
    blurb: "Apex-predator red. The future land where the dinos roam.",
    parody: "Jurassic Park",
    price: 4.99,
    accent: "#d32f2f",
    tags: ["movies"],
    img: "../../images/products/flow-jurassic.jpg"
  }, {
    slug: "flow-wars",
    title: "FLOW Wars",
    blurb: "A galaxy far, far in the flow. May the flow be with you.",
    parody: "Star Wars",
    price: 4.99,
    accent: "#f4c20d",
    tags: ["movies"],
    img: "../../images/products/flow-wars.png"
  }, {
    slug: "flow-fresh",
    title: "FLOW Fresh",
    blurb: "The real deal — crown-topped bubble graffiti dripping in sunset gradients. Also the wordmark on the door at The Cave.",
    parody: "Street / graffiti",
    price: 3.99,
    accent: "#ff5db1",
    tags: ["street"],
    img: "../../images/products/flow-fresh.jpg"
  }, {
    slug: "flow-zelda",
    title: "Legend of FLOW",
    blurb: "Triforce crest on the Hylian shield. It's dangerous to go without flow.",
    parody: "The Legend of Zelda",
    price: 4.99,
    accent: "#2e7d32",
    tags: ["games"],
    img: "../../images/products/flow-zelda.jpg"
  }, {
    slug: "flow-tv",
    title: "FLOW TV",
    blurb: "Neon green-pink drip with a glitchy retro set. Static never looked so clean.",
    parody: "Street / retro",
    price: 3.99,
    accent: "#23e08a",
    tags: ["street"],
    img: "../../images/products/flow-tv.jpg"
  }, {
    slug: "flow-street",
    title: "FLOW Street",
    blurb: "Wildstyle throw-up sprayed straight onto the concrete.",
    parody: "Street / graffiti",
    price: 3.99,
    accent: "#f4b400",
    tags: ["street"],
    img: "../../images/products/flow-street.jpg"
  }, {
    slug: "flow-grey",
    title: "FLOW the Grey",
    blurb: "Chrome wildstyle with a wizard standing watch. You shall not outflow.",
    parody: "The Lord of the Rings",
    price: 4.99,
    accent: "#9b6dff",
    tags: ["movies", "street"],
    img: "../../images/products/flow-grey.jpg"
  }, {
    slug: "flow-future",
    title: "Back to the FLOWture",
    blurb: "88 mph straight into the Future Land of Wonder.",
    parody: "Back to the Future",
    price: 4.99,
    accent: "#4ea3ff",
    tags: ["movies"],
    img: "../../images/_placeholder/flow-future.svg"
  }, {
    slug: "flow-mrflowhead",
    title: "Mr FLOW Head",
    blurb: "Disco-fried spud royalty in platform shoes. Point it anywhere — the funk follows.",
    parody: "Mr. Potato Head",
    price: 4.99,
    accent: "#f4a220",
    tags: ["movies", "classic"],
    img: "../../images/products/flow-mrflowhead.jpg"
  }, {
    slug: "flow-need4flow",
    title: "Need for FLOW 2 Underground",
    blurb: "Neon-drenched street racers at 2AM. The underground never sleeps.",
    parody: "Need for Speed",
    price: 4.99,
    accent: "#e14bd2",
    tags: ["games", "street"],
    img: "../../images/products/flow-need4flow.png"
  }, {
    slug: "flow-megaflow",
    title: "Mega FLOW",
    blurb: "Blue bomber energy, buster fully charged. Boss level: the future.",
    parody: "Mega Man",
    price: 4.99,
    accent: "#2f7ff4",
    tags: ["games"],
    img: "../../images/products/flow-megaflow.png"
  }];
  const FORMATS = {
    sticker: {
      label: "Stickers",
      price: 4.99,
      suffix: "",
      parodyPrefix: ""
    },
    tshirt: {
      label: "T-Shirts",
      price: 24.99,
      suffix: " Tee",
      parodyPrefix: "Tee · "
    },
    print: {
      label: "Prints",
      price: 14.99,
      suffix: " Print",
      parodyPrefix: "11×17 Print · "
    }
  };
  const PRODUCTS = [];
  Object.keys(FORMATS).forEach(kind => {
    const f = FORMATS[kind];
    DESIGNS.forEach(d => {
      PRODUCTS.push({
        slug: d.slug + "-" + kind,
        title: d.title + f.suffix,
        blurb: d.blurb,
        parody: f.parodyPrefix + d.parody,
        price: kind === "sticker" ? d.price || 4.99 : f.price,
        accent: d.accent,
        tags: d.tags,
        kind,
        img: d.img
      });
    });
  });
  window.FLOW_MERCH_PRODUCTS = {
    PRODUCTS,
    DESIGNS,
    FORMATS
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/flow-show/products.js", error: String((e && e.message) || e) }); }

__ds_ns.CartDrawer = __ds_scope.CartDrawer;

__ds_ns.PackCard = __ds_scope.PackCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Header = __ds_scope.Header;

})();
