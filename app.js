// FLOW — The Future Land of Wonder · storefront logic
(function () {
  const products = window.FLOW_PRODUCTS || [];
  const grid = document.getElementById('grid');
  const money = (n) => '$' + n.toFixed(2);

  // Image source: real PNG, falling back to generated placeholder if missing.
  const imgFor = (p) =>
    `images/${p.slug}.png`;
  const placeholderFor = (p) =>
    `images/_placeholder/${p.slug}.svg`;

  // ---- Render product grid ----
  function cardHTML(p) {
    return `
      <article class="card" data-tags="${p.tags.join(' ')}" style="--card-accent:${p.accent}">
        <div class="card-media">
          <span class="card-parody">${p.parody}</span>
          <img src="${imgFor(p)}" alt="${p.title} sticker"
               loading="lazy"
               onerror="this.onerror=null;this.src='${placeholderFor(p)}'">
        </div>
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-blurb">${p.blurb}</p>
          <div class="card-foot">
            <span class="price">${money(p.price)}</span>
            <button class="add-btn" data-add="${p.slug}">Add to cart</button>
          </div>
        </div>
      </article>`;
  }

  grid.innerHTML = products.map(cardHTML).join('');

  // ---- Filters ----
  const filters = document.getElementById('filters');
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    filters.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    const f = btn.dataset.filter;
    grid.querySelectorAll('.card').forEach((card) => {
      const show = f === 'all' || card.dataset.tags.split(' ').includes(f);
      card.style.display = show ? '' : 'none';
    });
  });

  // ---- Cart state ----
  const STORE_KEY = 'flow_cart_v1';
  let cart = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch { return {}; }
  }
  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); }
  function bySlug(slug) { return products.find((p) => p.slug === slug); }

  function addToCart(slug, qty = 1) {
    cart[slug] = (cart[slug] || 0) + qty;
    save(); renderCart(); bumpCount();
  }
  function setQty(slug, qty) {
    if (qty <= 0) delete cart[slug];
    else cart[slug] = qty;
    save(); renderCart(); bumpCount();
  }

  function count() { return Object.values(cart).reduce((a, b) => a + b, 0); }
  function total() {
    return Object.entries(cart).reduce((sum, [slug, q]) => {
      const p = bySlug(slug);
      return p ? sum + p.price * q : sum;
    }, 0);
  }

  const cartCountEl = document.getElementById('cartCount');
  function bumpCount() {
    const c = count();
    cartCountEl.textContent = c;
    cartCountEl.style.transform = 'scale(1.3)';
    setTimeout(() => (cartCountEl.style.transform = 'scale(1)'), 140);
  }

  // ---- Cart drawer ----
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  function openCart() { drawer.hidden = false; overlay.hidden = false; }
  function closeCart() { drawer.hidden = true; overlay.hidden = true; }

  function renderCart() {
    const entries = Object.entries(cart).filter(([slug]) => bySlug(slug));
    if (!entries.length) {
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.<br>Go grab some FLOW.</p>';
    } else {
      itemsEl.innerHTML = entries.map(([slug, q]) => {
        const p = bySlug(slug);
        return `
          <div class="ci">
            <img src="${imgFor(p)}" alt="" onerror="this.onerror=null;this.src='${placeholderFor(p)}'">
            <div class="ci-main">
              <div class="ci-title">${p.title}</div>
              <div class="ci-price">${money(p.price)} each</div>
              <button class="ci-remove" data-remove="${slug}">Remove</button>
            </div>
            <div class="qty">
              <button data-dec="${slug}" aria-label="Decrease">−</button>
              <span>${q}</span>
              <button data-inc="${slug}" aria-label="Increase">+</button>
            </div>
          </div>`;
      }).join('');
    }
    totalEl.textContent = money(total());
  }

  // ---- Events ----
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) { addToCart(add.dataset.add); toast('Added to cart'); openCart(); return; }

    const inc = e.target.closest('[data-inc]');
    if (inc) { setQty(inc.dataset.inc, (cart[inc.dataset.inc] || 0) + 1); return; }

    const dec = e.target.closest('[data-dec]');
    if (dec) { setQty(dec.dataset.dec, (cart[dec.dataset.dec] || 0) - 1); return; }

    const rem = e.target.closest('[data-remove]');
    if (rem) { setQty(rem.dataset.remove, 0); return; }

    const pack = e.target.closest('[data-pack]');
    if (pack) { addPack(pack.dataset.pack); return; }
  });

  function addPack(kind) {
    if (kind === 'all') {
      products.forEach((p) => addToCart(p.slug, 1));
      toast('Full Vault added — all 9 designs');
    } else {
      const n = parseInt(kind, 10);
      products.slice(0, n).forEach((p) => addToCart(p.slug, 1));
      toast(`${n} designs added to cart`);
    }
    openCart();
  }

  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (!count()) { toast('Cart is empty'); return; }
    toast('Demo only — thanks for surfing the FLOW! 🌊');
  });

  // ---- Toast ----
  let toastTimer;
  const toastEl = document.getElementById('toast');
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1900);
  }

  // ---- Init ----
  document.getElementById('year').textContent = new Date().getFullYear();
  renderCart();
  bumpCount();
})();
