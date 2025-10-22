// ====== BÀI 3 & 4: XỬ LÝ DOM, SỰ KIỆN, THÊM SẢN PHẨM ======
const toggleBtn = document.getElementById('toggleFormBtn');
const addForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const overlay = document.getElementById('formOverlay');
const productList = document.getElementById('product-list');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const error = document.getElementById('errorMsg');

// === DỮ LIỆU MẪU BAN ĐẦU ===
let products = JSON.parse(localStorage.getItem('products')) || [
  {
    name: "Cà phê Arabica",
    desc: "Hương vị nhẹ nhàng, chua thanh, mùi thơm tinh tế.",
    price: 70000,
    img: "arabica.jpg"
  },
  {
    name: "Cà phê Robusta",
    desc: "Đậm đà, mạnh mẽ, vị đắng đặc trưng Việt Nam.",
    price: 60000,
    img: "robusta.jpg"
  },
  {
    name: "Cold Brew",
    desc: "Hương vị dịu nhẹ, ít đắng, kết hợp hương trái cây.",
    price: 80000,
    img: "coldbrew.jpg"
  }
];

// === HIỂN THỊ DANH SÁCH SẢN PHẨM ===
function renderProducts(list = products) {
  productList.innerHTML = "";
  list.forEach(p => {
    const item = document.createElement('article');
    item.className = 'product-item fade-in';
    item.innerHTML = `
      <img src="${p.img || 'default.jpg'}" alt="${p.name}">
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <p class="product-price">Giá: ${Number(p.price).toLocaleString()}₫</p>
    `;
    productList.appendChild(item);
  });
}
renderProducts();

// === HÀM HIỂN THỊ / ẨN FORM (popup) ===
function showForm() {
  addForm.classList.remove('hidden');
  overlay.classList.add('active');
  setTimeout(() => addForm.classList.add('active'), 10);
}

function hideForm() {
  addForm.classList.remove('active');
  overlay.classList.remove('active');
  setTimeout(() => addForm.classList.add('hidden'), 300);
  addForm.reset();
  error.textContent = "";
}

// === SỰ KIỆN NÚT THÊM / HỦY / NỀN MỜ ===
toggleBtn.addEventListener('click', showForm);
cancelBtn.addEventListener('click', hideForm);
overlay.addEventListener('click', hideForm);

// === XỬ LÝ THÊM SẢN PHẨM ===
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('newName').value.trim();
  const price = document.getElementById('newPrice').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const img = document.getElementById('newImg').value.trim();

  if (!name || isNaN(price) || Number(price) <= 0) {
    error.textContent = " Vui lòng nhập tên và giá hợp lệ!";
    return;
  }

  const newProduct = {
    name,
    desc: desc || "Chưa có mô tả.",
    price: Number(price),
    img: img || "default.jpg"
  };

  products.unshift(newProduct);
  renderProducts();
  localStorage.setItem('products', JSON.stringify(products));

  hideForm();
});

// === TÌM KIẾM SẢN PHẨM ===
function filterProducts() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
}

searchBtn.addEventListener('click', filterProducts);
searchInput.addEventListener('keyup', filterProducts);
