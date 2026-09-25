const products = [
  { id: 'tappo', name: 'Tappo lavaggio scarico', kind: 'plug', color: '#d9ff00', tag: 'BEST SELLER', price: 12 },
  { id: 'protezione', name: 'Protezione leva freno', kind: 'guard', color: '#ff5c35', tag: 'NUOVO', price: 16 },
  { id: 'gancio', name: 'Gancio portacasco', kind: 'hook', color: '#6e78ff', tag: 'BOX ESSENTIAL', price: 10 }
];
let cart = [];
const euros = n => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(n);
const grid = document.querySelector('#productGrid');
grid.innerHTML = products.map(p => `<article class="product"><div class="product-visual" data-tag="${p.tag}"><div class="shape ${p.kind}" style="--product:${p.color}"></div></div><div class="product-info"><p>ACCESSORIO OFFROAD</p><h3>${p.name}</h3><div class="product-bottom"><b>${euros(p.price)}</b><button class="add" data-id="${p.id}">AGGIUNGI +</button></div></div></article>`).join('');
const panel = document.querySelector('#cartPanel'), overlay = document.querySelector('#overlay');
function toggleCart(open) { panel.classList.toggle('open', open); overlay.classList.toggle('show', open); panel.setAttribute('aria-hidden', !open); }
function renderCart() {
  const items = document.querySelector('#cartItems');
  document.querySelector('#cartCount').textContent = cart.length;
  const total = cart.reduce((s, p) => s + p.price, 0);
  document.querySelector('#cartTotal').textContent = euros(total);
  document.querySelector('#checkout').disabled = !cart.length;
  items.innerHTML = cart.length ? cart.map((p, i) => `<div class="cart-item"><span class="cart-dot" style="--product:${p.color}"></span><div><h3>${p.name}</h3><p>${euros(p.price)}</p></div><button class="remove" data-index="${i}">RIMUOVI</button></div>`).join('') : '<p class="empty">Il carrello è vuoto.<br>Trova il tuo prossimo pezzo.</p>';
}
grid.addEventListener('click', e => { const id = e.target.dataset.id; if (!id) return; cart.push(products.find(p => p.id === id)); renderCart(); toggleCart(true); });
document.querySelector('#cartButton').onclick = () => toggleCart(true);
document.querySelector('#closeCart').onclick = () => toggleCart(false);
overlay.onclick = () => toggleCart(false);
document.querySelector('#cartItems').onclick = e => { if (e.target.matches('.remove')) { cart.splice(+e.target.dataset.index, 1); renderCart(); }};
document.querySelector('#checkout').onclick = () => { const lines = cart.map(p => `• ${p.name} — ${euros(p.price)}`).join('%0A'); const total = euros(cart.reduce((s,p)=>s+p.price,0)); window.open(`https://wa.me/393331234567?text=Ciao%20GF%20Offroad%20Lab!%20Vorrei%20ordinare:%0A${lines}%0A%0ATotale:%20${encodeURIComponent(total)}`, '_blank'); };
document.querySelector('#year').textContent = new Date().getFullYear();
renderCart();
