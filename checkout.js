const cart = JSON.parse(localStorage.getItem("ecg-cart") || "[]");

function renderOrder() {
  const lines = document.getElementById("orderLines");
  let subtotal = 0;

  if (cart.length === 0) {
    lines.innerHTML =
      '<p style="font-size:0.85rem;color:var(--muted);padding:0.5rem 0;">No items in cart. <a href="shop.html" style="color:var(--cyan);">Go shop →</a></p>';
  } else {
    lines.innerHTML = cart
      .map((item) => {
        subtotal += item.price * item.qty;
        return `
        <div class="order-line">
          <span class="name">${item.name} × ${item.qty}</span>
          <span class="amount">GHS ${item.price * item.qty}</span>
        </div>`;
      })
      .join("");
  }

  document.getElementById("summaryTotal").textContent = `GHS ${subtotal}`;
  document.getElementById("finalTotal").textContent = `GHS ${subtotal + 15}`;
}

function placeOrder() {
  alert("Order placed! Thank you for shopping with us.");
  localStorage.removeItem("ecg-cart");
  window.location.href = "index.html";
}

// Card number formatting
document.getElementById("cardNum")?.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
});

// Payment method tabs
document.querySelectorAll(".payment-tab").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".payment-tab")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});

// Shipping option selection
document.querySelectorAll('input[name="shipping"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.querySelectorAll(".shipping-option").forEach((opt) => {
      opt.classList.remove("selected");
    });
    this.closest(".shipping-option").classList.add("selected");
  });
});

// Initialize
renderOrder();
