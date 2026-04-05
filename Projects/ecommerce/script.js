const products = [
  { id:1, name:'Wireless Headphones', price:49.99, icon:'🎧', category:'Electronics' },
  { id:2, name:'Running Sneakers', price:79.99, icon:'👟', category:'Fashion' },
  { id:3, name:'Leather Backpack', price:59.99, icon:'🎒', category:'Fashion' },
  { id:4, name:'Smart Watch', price:129.99, icon:'⌚', category:'Electronics' },
  { id:5, name:'Coffee Maker', price:89.99, icon:'☕', category:'Home' },
  { id:6, name:'Yoga Mat', price:29.99, icon:'🧘', category:'Sports' },
  { id:7, name:'Desk Lamp', price:34.99, icon:'💡', category:'Home' },
  { id:8, name:'Sunglasses', price:44.99, icon:'🕶️', category:'Fashion' },
];

let cart = [];

function renderProducts() {
  document.getElementById('productsGrid').innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img">${p.icon}</div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price">$${p.price.toFixed(2)}</div>
        <button class="add-to-cart-btn" id="btn-${p.id}" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  const btn = document.getElementById('btn-' + id);
  btn.textContent = '✓ Added';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added'); }, 1000);
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (item) { item.qty += delta; if (item.qty <= 0) cart = cart.filter(c => c.id !== id); }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = total.toFixed(2);
  const cartItems = document.getElementById('cartItems');
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">🛒<br>Your cart is empty</div>';
    return;
  }
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-icon">${item.icon}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');
}

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  panel.style.display = panel.style.display === 'none' ? 'flex' : '';
}

function checkout() {
  if (cart.length === 0) return alert('Your cart is empty!');
  cart = [];
  renderCart();
  document.getElementById('checkoutModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('checkoutModal').classList.add('hidden');
}

renderProducts(); renderCart();