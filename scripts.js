const customerSelect = document.getElementById("customerSelect");
const productSelect = document.getElementById("productSelect");
const quantityInput = document.getElementById("quantity");

const priceDisplay = document.getElementById("priceDisplay");
const grossDisplay = document.getElementById("grossDisplay");
const discountDisplay = document.getElementById("discountDisplay");
const netDisplay = document.getElementById("netDisplay");

let currentPrice = 0;
let currentAge = null;

// ---- Part 1: Load data when the page loads ----
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadCustomers();
});

async function loadProducts() {
  const response = await axios.get("api.php?action=getAllProducts");
  const products = response.data;

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.product_id;
    option.textContent = product.product_name;
    productSelect.appendChild(option);
  });
}

async function loadCustomers() {
  const response = await axios.get("api.php?action=getAllCustomers");
  const customers = response.data;

  customers.forEach(customer => {
    const option = document.createElement("option");
    option.value = customer.customer_id;
    option.textContent = customer.full_name;
    customerSelect.appendChild(option);
  });
}


productSelect.addEventListener("change", async () => {
  const id = productSelect.value;
  if (!id) return;

  const response = await axios.get(`api.php?action=getProductPrice&id=${id}`);
  currentPrice = response.data.price;

  priceDisplay.innerHTML = `<strong>Price : ₱${currentPrice.toFixed(2)}</strong>`;
  calculate();
});

customerSelect.addEventListener("change", async () => {
  const id = customerSelect.value;
  if (!id) return;

  const response = await axios.get(`api.php?action=getCustomerAge&id=${id}`);
  currentAge = response.data.age;

  calculate();
});

quantityInput.addEventListener("input", calculate);

function calculate() {
  const quantity = Number(quantityInput.value) || 0;

  
  const grossAmount = currentPrice * quantity;


  let seniorDiscount = 0;
  if (currentAge !== null && currentAge >= 60) {
    seniorDiscount = grossAmount * 0.12;
  }

  const netAmount = grossAmount - seniorDiscount;

  grossDisplay.innerHTML = `<strong>Gross Amount : ₱${grossAmount.toFixed(2)}</strong>`;
  discountDisplay.innerHTML = `<strong>Senior Discount : ₱${seniorDiscount.toFixed(2)}</strong>`;
  netDisplay.innerHTML = `<strong>Net Amount : ₱${netAmount.toFixed(2)}</strong>`;
}
