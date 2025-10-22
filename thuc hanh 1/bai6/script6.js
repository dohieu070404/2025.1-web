const toggleBtn = document.getElementById('toggleFormBtn');
const addForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const overlay = document.getElementById('formOverlay');
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const filterPrice = document.getElementById('filterPrice');
const editModeBtn = document.getElementById('editModeBtn');
const error = document.getElementById('errorMsg');
let editIndex = null, editMode = false;

// === DỮ LIỆU MẪU ===
let products = [];

async function fetchProducts() {
  try {
    const res = await fetch('./products.json');
    const data = await res.json();
    products = data;
    renderProducts();
  } catch {
    products = [
      { name: "Cà phê Arabica", desc: "Hương vị nhẹ nhàng.", price: 70000, img: "arabica.jpg" },
      { name: "Cà phê Robusta", desc: "Đậm đà, vị đắng mạnh.", price: 60000, img: "robusta.jpg" },
      { name: "Cold Brew", desc: "Dịu nhẹ, mát lạnh.", price: 80000, img: "coldbrew.jpg" }
    ];
    renderProducts();
  }
}
fetchProducts();

// === HIỂN THỊ SẢN PHẨM ===
function renderProducts(list = products) {
  productList.innerHTML = "";
  list.forEach((p, i) => {
    const item = document.createElement('article');
    item.className = 'product-item fade-filter';
    item.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p class="product-price">Giá: ${p.price.toLocaleString()}₫</p>
    `;
    item.onclick = () => openDetail(p);
    if (editMode) {
      const box = document.createElement('div');
      const editBtn = document.createElement('button');
      const delBtn = document.createElement('button');
      editBtn.textContent = "Sửa";
      delBtn.textContent = "Xóa";
      editBtn.onclick = (e) => { e.stopPropagation(); startEdit(i); };
      delBtn.onclick = (e) => { e.stopPropagation(); deleteProduct(i); };
      box.append(editBtn, delBtn);
      item.append(box);
    }
    productList.append(item);
  });
}

toggleBtn.onclick = () => {
  addForm.classList.toggle('active');
  overlay.classList.toggle('active');
  addForm.style.maxHeight = addForm.scrollHeight + "px";
};
cancelBtn.onclick = () => hideForm();
overlay.onclick = () => hideForm();

function hideForm() {
  addForm.style.maxHeight = "0";
  setTimeout(() => addForm.classList.remove('active'), 400);
  overlay.classList.remove('active');
  addForm.reset();
  editIndex = null;
  error.textContent = "";
}

// === THÊM / SỬA/xóa ===
addForm.onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById('newName').value.trim();
  const price = +document.getElementById('newPrice').value;
  const desc = document.getElementById('newDesc').value.trim();
  const img = document.getElementById('newImg').value.trim() || 'default.jpg';
  if (!name || price <= 0) return error.textContent = "Nhập tên và giá hợp lệ!";
  const p = { name, price, desc, img };
  editIndex !== null ? products.splice(editIndex, 1, p) : products.unshift(p);
  hideForm();
  renderProducts();
};

function startEdit(i) {
  const p = products[i];
  editIndex = i;
  addForm.classList.add('active');
  overlay.classList.add('active');
  document.getElementById('newName').value = p.name;
  document.getElementById('newPrice').value = p.price;
  document.getElementById('newDesc').value = p.desc;
  document.getElementById('newImg').value = p.img;
}
function deleteProduct(i) {
  if (confirm("Xóa sản phẩm này?")) {
    products.splice(i, 1);
    renderProducts();
  }
}

// === TÌM KIẾM / LỌC ===
function filterProducts() {
  const kw = searchInput.value.toLowerCase();
  const priceRange = filterPrice.value;
  let filtered = products.filter(p => p.name.toLowerCase().includes(kw));
  if (priceRange === "1") filtered = filtered.filter(p => p.price < 50000);
  if (priceRange === "2") filtered = filtered.filter(p => p.price >= 50000 && p.price <= 100000);
  if (priceRange === "3") filtered = filtered.filter(p => p.price > 100000);
  renderProducts(filtered);
}
searchInput.onkeyup = filterProducts;
filterPrice.onchange = filterProducts;

sortSelect.onchange = () => {
  const v = sortSelect.value;
  if (v === "asc") products.sort((a,b)=>a.price-b.price);
  if (v === "desc") products.sort((a,b)=>b.price-a.price);
  renderProducts();
};

// === CHẾ ĐỘ CHỈNH SỬA ===
editModeBtn.onclick = () => {
  editMode = !editMode;
  editModeBtn.classList.toggle('active');
  renderProducts();
};

// === POPUP CHI TIẾT SẢN PHẨM ===
const popup = document.createElement('div');
popup.id = 'productDetail';
document.body.appendChild(popup);
function openDetail(p) {
  popup.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <p class="product-price">Giá: ${p.price.toLocaleString()}₫</p>
    <button onclick="closeDetail()">Đóng</button>
  `;
  popup.classList.add('active');
}
window.closeDetail = function() {
  popup.classList.remove('active');
};
