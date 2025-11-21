const API_BASE = "https://jsonplaceholder.typicode.com";
const API_RESOURCE = "/users";
const STORAGE_KEY = "userStudioChanges_v1";

const els = {
    message: document.getElementById("message"),
    statusChip: document.getElementById("statusChip"),
    userTableBody: document.getElementById("userTableBody"),
    searchInput: document.getElementById("searchInput"),
    paginationInfo: document.getElementById("paginationInfo"),
    prevBtn: document.getElementById("prevPage"),
    nextBtn: document.getElementById("nextPage"),
    reloadBtn: document.getElementById("reloadBtn"),
    createForm: document.getElementById("createForm"),
    editForm: document.getElementById("editForm"),
    editModal: document.getElementById("editModal"),
    closeEdit: document.getElementById("closeEdit"),
    userCountBadge: document.getElementById("userCountBadge"),
};

let users = [];
let filteredUsers = [];
let currentPage = 1;
const PAGE_SIZE = 5;
let editingId = null;

const api = axios.create({
    baseURL: API_BASE,
    timeout: 8000, // 8s timeout
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        if (status === 503 || status === 502 || status === 504) {
            setMessage("Server đang bận hoặc timeout (5xx). Thử lại sau…", true);
            setStatusChip(false, "API: Unavailable");
        }
        return Promise.reject(error);
    }
);

function loadChanges() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return { created: [], updated: {}, deleted: [] };
        }
        const parsed = JSON.parse(raw);
        return {
            created: parsed.created || [],
            updated: parsed.updated || {},
            deleted: parsed.deleted || [],
        };
    } catch (e) {
        console.warn("Failed to parse local changes", e);
        return { created: [], updated: {}, deleted: [] };
    }
}

function saveChanges(changes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(changes));
}

function mergeRemoteWithLocal(remoteList) {
    const changes = loadChanges();
    let merged = remoteList.map((u) => ({ ...u }));
    merged = merged.filter((u) => !changes.deleted.includes(String(u.id)));
    merged = merged.map((u) => {
        const up = changes.updated[String(u.id)];
        return up ? { ...u, ...up } : u;
    });
    merged = [...(changes.created || []), ...merged];

    return merged;
}
function setMessage(text, isError = false) {
    els.message.textContent = text || "";
    els.message.classList.toggle("error", Boolean(isError));
}
function setStatusChip(isOnline, text) {
    els.statusChip.textContent = text;
    if (isOnline) {
        els.statusChip.classList.remove("status-offline");
    } else {
        els.statusChip.classList.add("status-offline");
    }
}

function setLoadingTable() {
    els.userTableBody.innerHTML =
        '<tr class="loading-row"><td colspan="4">Loading users…</td></tr>';
}

function paginate() {
    const total = filteredUsers.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;

    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const items = filteredUsers.slice(startIdx, endIdx);

    els.paginationInfo.textContent = `Page ${currentPage} of ${totalPages} · ${total} user(s)`;
    els.prevBtn.disabled = currentPage === 1;
    els.nextBtn.disabled = currentPage === totalPages;

    els.userCountBadge.textContent = `${total} user(s)`;
    return items;
}

function render() {
    const items = paginate();
    els.userTableBody.innerHTML = "";

    if (!items.length) {
        els.userTableBody.innerHTML =
            '<tr><td colspan="4">No users found.</td></tr>';
        return;
    }

    for (const user of items) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${escapeHtml(user.name)}</td>
      <td>${escapeHtml(user.email)}</td>
      <td>${escapeHtml(user.phone)}</td>
      <td>
        <div class="actions">
          <button class="ghost" data-action="edit" data-id="${user.id}">Edit</button>
          <button class="danger" data-action="delete" data-id="${user.id}">Delete</button>
        </div>
      </td>
    `;
        els.userTableBody.appendChild(tr);
    }
}

function escapeHtml(value) {
    if (value == null) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
function applyFilter() {
    const term = els.searchInput.value.trim().toLowerCase();
    filteredUsers = term
        ? users.filter((u) => u.name.toLowerCase().includes(term))
        : [...users];

    currentPage = 1;
    render();
}
function openEditModal(user) {
    editingId = user.id;
    els.editForm.editName.value = user.name;
    els.editForm.editEmail.value = user.email;
    els.editForm.editPhone.value = user.phone;
    els.editModal.style.display = "flex";
}

function closeEditModal() {
    editingId = null;
    els.editModal.style.display = "none";
}
async function fetchUsers() {
    try {
        setMessage("Loading users from API…");
        setLoadingTable();
        setStatusChip(true, "API: Checking…");

        const response = await api.get(API_RESOURCE);
        if (!Array.isArray(response.data)) {
            throw new Error("Invalid API response");
        }

        const remoteUsers = response.data;
        users = mergeRemoteWithLocal(remoteUsers);
        applyFilter();

        setMessage("Users loaded (local changes kept).");
        setStatusChip(true, "API: Online");
    } catch (err) {
        console.error("Fetch users failed:", err);
        setMessage(err.message || "Failed to load users", true);
        setStatusChip(false, "API: Offline or Error");
        els.userTableBody.innerHTML =
            '<tr><td colspan="4">Could not load users.</td></tr>';
    }
}

async function createUser(payload) {
    try {
        setMessage("Creating user…");
        const response = await api.post(API_RESOURCE, payload);
        const data = response.data || {};
        const newUser = {
            ...payload,
            id: data.id || `local-${Date.now()}`,
        };

        const changes = loadChanges();
        changes.created.unshift(newUser);
        saveChanges(changes);

        users.unshift(newUser);
        applyFilter();

        setMessage("User created (UI + localStorage updated).");
    } catch (err) {
        console.error("Create user failed:", err);
        setMessage(err.message || "Failed to create user", true);
    }
}

async function updateUser(id, payload) {
    try {
        setMessage("Updating user…");
        await api.put(`${API_RESOURCE}/${id}`, payload);

        const idStr = String(id);
        const changes = loadChanges();
        const localIdx = changes.created.findIndex(
            (u) => String(u.id) === idStr
        );
        if (localIdx !== -1) {
            changes.created[localIdx] = {
                ...changes.created[localIdx],
                ...payload,
            };
        } else {
            changes.updated[idStr] = {
                ...(changes.updated[idStr] || {}),
                ...payload,
            };
        }

        saveChanges(changes);
        const idx = users.findIndex((u) => String(u.id) === idStr);
        if (idx !== -1) {
            users[idx] = { ...users[idx], ...payload };
        }
        applyFilter();

        setMessage("User updated (UI + localStorage updated).");
    } catch (err) {
        console.error("Update user failed:", err);
        setMessage(err.message || "Failed to update user", true);
    }
}

async function deleteUser(id) {
    try {
        setMessage("Deleting user…");
        await api.delete(`${API_RESOURCE}/${id}`);

        const idStr = String(id);
        const changes = loadChanges();

        const localIdx = changes.created.findIndex(
            (u) => String(u.id) === idStr
        );
        if (localIdx !== -1) {
            changes.created.splice(localIdx, 1);
        } else {
            changes.deleted = [...new Set([...changes.deleted, idStr])];
            delete changes.updated[idStr];
        }
        saveChanges(changes);

        users = users.filter((u) => String(u.id) !== idStr);
        applyFilter();

        setMessage("User deleted (UI + localStorage updated).");
    } catch (err) {
        console.error("Delete user failed:", err);
        setMessage(err.message || "Failed to delete user", true);
    }
}

els.searchInput.addEventListener("input", () => {
    applyFilter();
});

els.prevBtn.addEventListener("click", () => {
    currentPage = Math.max(1, currentPage - 1);
    render();
});

els.nextBtn.addEventListener("click", () => {
    currentPage += 1;
    render();
});

els.reloadBtn.addEventListener("click", () => {
    fetchUsers();
});

els.userTableBody.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;

    const id = btn.dataset.id;
    const user = users.find((u) => String(u.id) === String(id));
    if (!user) return;

    if (btn.dataset.action === "edit") {
        openEditModal(user);
    } else if (btn.dataset.action === "delete") {
        const confirmed = confirm(`Delete "${user.name}"?`);
        if (confirmed) deleteUser(id);
    }
});

els.createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(els.createForm);

    const payload = {
        name: formData.get("name").trim(),
        email: formData.get("email").trim(),
        phone: formData.get("phone").trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
        setMessage("Please fill all fields before creating.", true);
        return;
    }

    createUser(payload);
    els.createForm.reset();
});

els.editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!editingId) return;

    const formData = new FormData(els.editForm);
    const payload = {
        name: formData.get("name").trim(),
        email: formData.get("email").trim(),
        phone: formData.get("phone").trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
        setMessage("Please fill all fields before saving.", true);
        return;
    }

    updateUser(editingId, payload);
    closeEditModal();
});

els.closeEdit.addEventListener("click", () => {
    closeEditModal();
});

els.editModal.addEventListener("click", (e) => {
    if (e.target === els.editModal) {
        closeEditModal();
    }
});
fetchUsers();
