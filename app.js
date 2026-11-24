// Trendora Ecommerce - Core Logic
const STORAGE_KEYS = {
  products: 'trendora_products',
  cart: 'trendora_cart',
  orders: 'trendora_orders',
  admin: 'trendora_admin'
};

// Default products
const defaultProducts = [
  {
    id: 'p1',
    name: 'Smart Car Wireless Charger Mount',
    category: 'Car Gadgets',
    originalPrice: 2499,
    price: 1499,
    discount: 40,
    image: 'imagine_images/YNWej.jpg',
    description: 'Fast wireless charging car mount with automatic clamping. Perfect for safe driving.',
    features: ['15W Fast Charging', 'Automatic Clamp', '360° Rotation', 'Universal Compatibility'],
    stock: 50,
    trending: true,
    bestseller: true
  },
  {
    id: 'p2',
    name: 'Smart Electric Kettle',
    category: 'Home & Kitchen',
    originalPrice: 3299,
    price: 1999,
    discount: 39,
    image: 'imagine_images/A1pBk.jpg',
    description: 'Temperature control smart kettle with multiple brewing presets.',
    features: ['Precise Temperature Control', 'Keep Warm Function', 'Stainless Steel', '1.7L Capacity'],
    stock: 35,
    trending: true,
    bestseller: true
  },
  {
    id: 'p3',
    name: 'Wireless Earbuds + Phone Stand',
    category: 'Mobile Accessories',
    originalPrice: 2999,
    price: 1799,
    discount: 40,
    image: 'imagine_images/FUo2Z.jpg',
    description: 'Premium wireless earbuds with charging case and foldable phone stand.',
    features: ['Active Noise Cancellation', '30H Battery', 'Wireless Charging Stand', 'IPX5 Waterproof'],
    stock: 80,
    trending: true,
    bestseller: false
  },
  {
    id: 'p4',
    name: 'Travel Power Bank + Universal Adapter',
    category: 'Travel Gadgets',
    originalPrice: 2799,
    price: 1699,
    discount: 39,
    image: 'imagine_images/xcCuU.jpg',
    description: '10000mAh power bank with universal travel adapter for worldwide use.',
    features: ['10000mAh Capacity', 'Universal Sockets', 'Fast Charging', 'Compact Design'],
    stock: 42,
    trending: false,
    bestseller: true
  },
  {
    id: 'p5',
    name: 'Smart Air Purifier',
    category: 'Smart Gadgets',
    originalPrice: 8999,
    price: 5499,
    discount: 39,
    image: 'imagine_images/7KZzw.jpg',
    description: 'HEPA smart air purifier with app control and air quality sensor.',
    features: ['True HEPA Filter', 'App Control', 'Quiet Operation', 'Auto Mode'],
    stock: 20,
    trending: true,
    bestseller: false
  }
];

// Initialize products
function initProducts() {
  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(defaultProducts));
  }
}

function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.products) || '[]');
}

function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty = 1) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product || product.stock < 1) return alert('Out of stock');

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty, name: product.name, price: product.price, image: product.image });
  }
  saveCart(cart);
  showToast('Added to cart');
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#111;color:white;padding:12px 24px;border-radius:50px;z-index:9999;font-size:14px;';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

// WhatsApp order
function orderViaWhatsApp(productName = '', price = '') {
  const phone = '919876543210'; // Replace with real number
  let text = 'Hi Trendora, I want to place an order';
  if (productName) text += `\nProduct: ${productName}\nPrice: ${price}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  initProducts();
  updateCartCount();
});
