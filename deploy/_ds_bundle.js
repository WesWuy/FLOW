/* @ds-bundle: {"format":4,"namespace":"FLOWDesignSystem_3bfa55","components":[{"name":"CartDrawer","sourcePath":"components/commerce/CartDrawer.jsx"},{"name":"PackCard","sourcePath":"components/commerce/PackCard.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"QuantityStepper","sourcePath":"components/commerce/QuantityStepper.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"}],"sourceHashes":{"components/commerce/CartDrawer.jsx":"663464116dd7","components/commerce/PackCard.jsx":"43cf2179e911","components/commerce/ProductCard.jsx":"b4af3137d357","components/commerce/QuantityStepper.jsx":"dae428e15f24","components/core/Button.jsx":"acb065e54e5f","components/core/Chip.jsx":"3c78c64b9eb0","components/feedback/Toast.jsx":"09a880f7aa50","components/navigation/Header.jsx":"3dee93f1386d"},"inlinedExternals":[],"unexposedExports":[]} */

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
  onCheckout,
  checkoutLabel = "Checkout",
  checkoutNote = "Review your total before continuing."
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
  }, checkoutLabel), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      color: "var(--text-secondary)",
      fontSize: "11px",
      margin: "10px 0 0"
    }
  }, checkoutNote))));
}
Object.assign(__ds_scope, { CartDrawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
// Pill-shaped CTA button. Variants + sizes match the FLOW storefront
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


__ds_ns.CartDrawer = __ds_scope.CartDrawer;

__ds_ns.PackCard = __ds_scope.PackCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Header = __ds_scope.Header;

})();
