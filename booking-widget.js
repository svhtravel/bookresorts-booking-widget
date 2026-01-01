/* ============================================================
   BookResorts Universal Booking Widget
   ============================================================ */

(function () {

  // Prevent loading twice
  if (window.__BOOKRESORTS_WIDGET_LOADED__) return;
  window.__BOOKRESORTS_WIDGET_LOADED__ = true;

  // Read config from script tag
  const script = document.currentScript;
  const CONFIG = {
    brand: script?.dataset.brand || "default",
    mode: script?.dataset.mode || "hotel",
    worker: script?.dataset.worker || ""
  };

  // Ensure popup container exists
  let root = document.getElementById("booking-popup");
  if (!root) {
    root = document.createElement("div");
    root.id = "booking-popup";
    document.body.appendChild(root);
  }

  // TEMP PLACEHOLDER
  root.innerHTML = `
    <div style="
      padding:24px;
      font-family:Arial,sans-serif;
      text-align:center;
      border:2px dashed #b89b47;
      border-radius:12px;
    ">
      <h3>Booking Widget Loaded</h3>
      <p>This is the universal widget shell.</p>
      <p><b>Brand:</b> ${CONFIG.brand}</p>
      <p><b>Mode:</b> ${CONFIG.mode}</p>
    </div>
  `;

})();
