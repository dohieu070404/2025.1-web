const toggleBtn = document.getElementById('toggleFormBtn');
const addForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const overlay = document.getElementById('formOverlay');
const productList = document.getElementById('product-list');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const editModeBtn = document.getElementById('editModeBtn');
const formTitle = document.getElementById('formTitle');
const error = document.getElementById('errorMsg');

let products = JSON.parse(localStorage.getItem('products')) || [
  { name: "Cà phê Arabica", desc: "Hương vị nhẹ nhàng, chua thanh, mùi thơm tinh tế.", price: 70000, img: "arabica.jpg" },
  { name: "Cà phê Robusta", desc: "Đậm đà, mạnh mẽ, vị đắng đặc trưng Việt Nam.", price: 60000, img: "robusta.jpg" },
  { name: "Cold Brew", desc: "Hương vị dịu nhẹ, ít đắng, kết hợp hương trái cây.", price: 80000, img: "coldbrew.jpg" }
];

let editIndex = null;
let editMode = false;

function renderProducts(list = products) {
  productList.innerHTML = "";
  list.forEach((p, index) => {
    const item = document.createElement('article');
    item.className = 'product-item fade-in';
    item.innerHTML = `
      <img src="${p.img || 'default.jpg'}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p class="product-price">Giá: ${Number(p.price).toLocaleString()}₫</p>
    `;
    if (editMode) {
      const actionBox = document.createElement('div');
      const editBtn = document.createElement('button');
      const delBtn = document.createElement('button');
      editBtn.textContent = "Sửa";
      delBtn.textContent = "Xóa";
      editBtn.onclick = () => startEdit(index);
      delBtn.onclick = () => deleteProduct(index);
      actionBox.appendChild(editBtn);
      actionBox.appendChild(delBtn);
      item.appendChild(actionBox);
    }
    productList.appendChild(item);
  });
}

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
  editIndex = null;
  formTitle.textContent = "Thêm sản phẩm mới";
}

toggleBtn.onclick = showForm;
cancelBtn.onclick = hideForm;
overlay.onclick = hideForm;

addForm.onsubmit = e => {
  e.preventDefault();
  const name = document.getElementById('newName').value.trim();
  const price = document.getElementById('newPrice').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const img = document.getElementById('newImg').value.trim();
  if (!name || isNaN(price) || Number(price) <= 0) {
    error.textContent = "Vui lòng nhập tên và giá hợp lệ!";
    return;
  }
  const product = { name, desc: desc || "Chưa có mô tả.", price: Number(price), img: img || "default.jpg" };
  if (editIndex !== null) {
    products[editIndex] = product;
  } else {
    products.unshift(product);
  }
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
  hideForm();
};

function deleteProduct(index) {
  if (confirm("Xóa sản phẩm này?")) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
}

function startEdit(index) {
  editIndex = index;
  const p = products[index];
  document.getElementById('newName').value = p.name;
  document.getElementById('newPrice').value = p.price;
  document.getElementById('newDesc').value = p.desc;
  document.getElementById('newImg').value = p.img;
  formTitle.textContent = "Chỉnh sửa sản phẩm";
  showForm();
}

searchBtn.onclick = filterProducts;
searchInput.onkeyup = filterProducts;
function filterProducts() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
}

sortSelect.onchange = () => {
  const val = sortSelect.value;
  if (val === "asc") products.sort((a, b) => a.price - b.price);
  else if (val === "desc") products.sort((a, b) => b.price - a.price);
  renderProducts();
};

editModeBtn.onclick = () => {
  editMode = !editMode;
  editModeBtn.textContent = editMode ? "Thoát chỉnh sửa" : "Chỉnh sửa / Xóa";
  renderProducts();
};

renderProducts();
