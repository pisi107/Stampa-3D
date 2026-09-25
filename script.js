const products = [
  { id: 'tappo', name: 'Tappo lavaggio scarico', kind: 'plug', color: '#d9ff00', tag: 'BEST SELLER', price: 12 },
  { id: 'protezione', name: 'Protezione leva freno', kind: 'guard', color: '#ff5c35', tag: 'NUOVO', price: 16 },
  { id: 'gancio', name: 'Gancio portacasco', kind: 'hook', color: '#6e78ff', tag: 'BOX ESSENTIAL', price: 10 }
];
let cart = [];
const euros = n => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(n);
const grid = document.querySelector('#productGrid');
grid.innerHTML = products.map(p => `<article class="product"><div class="product-visual" data-tag="${p.tag}"><div class="shape ${p.kind}" style="--product:${p.color}"></div></div><div class="product-info"><p>ACCESSORIO OFFROAD</p><h3>${p.name}</h3><div class="product-bottom"><b>${euros(p.price)}</b><button class="add" data-id="${p.id}">AGGIUNGI +</button></div></div></article>`).join('');
const panel = document.querySelector('#cartPanel'), overlay = document.querySelector('#overlay'), orderModal = document.querySelector('#orderModal');
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
document.querySelector('#checkout').onclick = () => { toggleCart(false); orderModal.classList.add('open'); orderModal.setAttribute('aria-hidden','false'); };
document.querySelector('#closeOrder').onclick = () => { orderModal.classList.remove('open'); orderModal.setAttribute('aria-hidden','true'); };
document.querySelector('#orderForm').onsubmit = e => { e.preventDefault(); const data = Object.fromEntries(new FormData(e.target)); const orders = JSON.parse(localStorage.getItem('gf-offroad-orders') || '[]'); orders.unshift({id: String(Date.now()).slice(-7), createdAt:new Date().toISOString(), customer:data, items:[...cart], total:cart.reduce((s,p)=>s+p.price,0), status:'Da confermare'}); localStorage.setItem('gf-offroad-orders',JSON.stringify(orders)); cart=[]; renderCart(); orderModal.innerHTML = `<div class="order-card"><p class="eyebrow">RICHIESTA INVIATA</p><h2>CI SIAMO<br /><em>QUASI.</em></h2><p class="order-intro">Grazie ${data.name.split(' ')[0]}! Giorgio e Federico controlleranno la richiesta e ti contatteranno per confermare.</p><button class="button primary submit-order" id="doneOrder">Torna allo shop <span>→</span></button></div>`; document.querySelector('#doneOrder').onclick=()=>orderModal.classList.remove('open'); };
document.querySelector('#year').textContent = new Date().getFullYear();
renderCart();
