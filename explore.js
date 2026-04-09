// Filter dropdown
const filterBtn = document.querySelector(".filter-btn");
const filterDropdown = document.querySelector(".filter-dropdown");
const filterOptions = document.querySelectorAll(".filter-option");
const filterValue = document.querySelector(".filter-value");

filterBtn.addEventListener("click", () => {
  filterDropdown.classList.toggle("open");
});

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    filterOptions.forEach((o) => o.classList.remove("active"));
    option.classList.add("active");
    filterValue.textContent = option.textContent;
    filterDropdown.classList.remove("open");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!filterDropdown.contains(e.target)) {
    filterDropdown.classList.remove("open");
  }
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("ecg-cart") || "[]");
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  document
    .querySelectorAll("#cartCount")
    .forEach((el) => (el.textContent = total));
}

updateCartCount();
