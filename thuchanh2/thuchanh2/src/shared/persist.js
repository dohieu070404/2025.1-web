const KEYS = {
  staffs: "admin.staffs",
  complaints: "admin.complaints",
  menu: "admin.menu",
};

export const persist = {
  load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  exportAll(payload) {
    const data = { ...payload, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hieu-coffee-data.json";
    a.click();
    URL.revokeObjectURL(url);
  },
  async importAll(file) {
    const text = await file.text();
    return JSON.parse(text);
  },
  KEYS,
};
