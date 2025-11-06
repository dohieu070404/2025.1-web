
const chan = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("menu_channel") : null;

export const notifyMenuChanged = () => {

  try {
    localStorage.setItem("__menu_ping", String(Date.now()));
  } catch (err) {

    console.warn("[menuBus] localStorage bị chặn, dùng fallback chỉ trong tab hiện tại.", err);
  }

  window.dispatchEvent(new CustomEvent("menu:changed"));

  try {
    if (chan) chan.postMessage({ type: "menu:changed", at: Date.now() });
  } catch (err) {
    console.warn("[menuBus] BroadcastChannel lỗi:", err);
  }
};

export const subscribeMenuChanges = (cb) => {
  const onStorage = (e) => {
    if (e.key === "admin.menu" || e.key === "__menu_ping") cb();
  };

  const onCustom = () => cb();

  const onBC = (e) => {
    if (e?.data?.type === "menu:changed") cb();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener("menu:changed", onCustom);
  if (chan) chan.addEventListener("message", onBC);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("menu:changed", onCustom);
    if (chan) chan.removeEventListener("message", onBC);
  };
};
