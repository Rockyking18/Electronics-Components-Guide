/* ── Cart State ── */
let cart = JSON.parse(localStorage.getItem("ecg-cart") || "[]");

function saveCart() {
  localStorage.setItem("ecg-cart", JSON.stringify(cart));
  updateCartCount();
  renderCartDrawer();
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document
    .querySelectorAll("#cartCount")
    .forEach((el) => (el.textContent = total));
}

function addToCart(id, name, price) {
  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCart();
  openCart();
}

function renderCartDrawer() {
  const container = document.getElementById("cartItems");
  const footer = document.getElementById("cartFooter");

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Cart is empty</p>
      </div>`;
    footer.style.display = "none";
    return;
  }

  footer.style.display = "block";
  let total = 0;

  container.innerHTML = cart
    .map((item) => {
      total += item.price * item.qty;
      return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="https://via.placeholder.com/40/111418/00c8ff?text=${encodeURIComponent(item.name.charAt(0))}" alt="${item.name}"/>
        </div>
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">GHS ${item.price}</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <input class="qty-num" type="text" value="${item.qty}" readonly />
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>`;
    })
    .join("");

  document.getElementById("cartTotal").textContent = `GHS ${total}`;
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  saveCart();
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  renderCartDrawer();
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

document.getElementById("openCart").addEventListener("click", openCart);

/* ── View Toggle ── */
const grid = document.getElementById("productsGrid");
document.getElementById("gridViewBtn").addEventListener("click", function () {
  grid.classList.remove("list-view");
  this.classList.add("active");
  document.getElementById("listViewBtn").classList.remove("active");
});
document.getElementById("listViewBtn").addEventListener("click", function () {
  grid.classList.add("list-view");
  this.classList.add("active");
  document.getElementById("gridViewBtn").classList.remove("active");
});

/* ── Category Filter ── */
document.querySelectorAll(".category-list a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelectorAll(".category-list a")
      .forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
    const cat = this.dataset.cat;
    document.querySelectorAll(".product-card").forEach((card) => {
      card.style.display =
        cat === "all" || card.dataset.cat === cat ? "" : "none";
    });
  });
});

/* ── Search ── */
document.getElementById("searchInput").addEventListener("input", function () {
  const q = this.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach((card) => {
    const name = card.querySelector(".product-name").textContent.toLowerCase();
    const desc = card.querySelector(".product-desc").textContent.toLowerCase();
    card.style.display = name.includes(q) || desc.includes(q) ? "" : "none";
  });
});

/* ── Price Range ── */
document.getElementById("priceRange").addEventListener("input", function () {
  document.getElementById("priceMax").textContent = this.value;
});

/* ── Wishlist ── */
document.querySelectorAll(".wishlist-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
    this.textContent = this.classList.contains("active") ? "♥" : "♡";
  });
});

/* ── Pagination ── */
document.querySelectorAll(".page-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".page-btn")
      .forEach((b) => b.classList.remove("active"));
    if (!["←", "→", "‹", "›"].some((ch) => this.textContent.includes(ch))) {
      this.classList.add("active");
    }
  });
});

/* ── Init ── */
updateCartCount();
renderCartDrawer();
