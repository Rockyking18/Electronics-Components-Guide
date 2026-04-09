// Update cart count from localStorage
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("ecg-cart") || "[]");
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  document
    .querySelectorAll("#cartCount")
    .forEach((el) => (el.textContent = total));
}

updateCartCount();
