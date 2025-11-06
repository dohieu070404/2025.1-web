
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
 
  exportAll({ staffs = [], complaints = [], menu = [] }) {
    const data = { staffs, complaints, menu, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hieu-coffee-data.json";
    a.click();
    URL.revokeObjectURL(url);
  },

  async importAll(file, setters) {
    const text = await file.text();
    const json = JSON.parse(text);
    if (json.staffs && Array.isArray(json.staffs)) setters.setStaffs(json.staffs);
    if (json.complaints && Array.isArray(json.complaints)) setters.setComplaints(json.complaints);
    if (json.menu && Array.isArray(json.menu)) setters.setMenu(json.menu);
  },
  KEYS,
};
