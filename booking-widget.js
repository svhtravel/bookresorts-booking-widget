/* ============================================================
   BookResorts Universal Booking Widget v2.0 (Production)
   ============================================================ */

(function () {

  // Prevent loading twice
  if (window.__BOOKRESORTS_WIDGET_LOADED__) return;
  window.__BOOKRESORTS_WIDGET_LOADED__ = true;

  // Read config from script tag
  var script = document.currentScript;
  var CONFIG = {
    brand: (script && script.dataset && script.dataset.brand) || "default",
    mode: (script && script.dataset && script.dataset.mode) || "hotel",
    worker: (script && script.dataset && script.dataset.worker) || ""
  };

  // Ensure popup container exists
  var container = document.getElementById("booking-popup");
  if (!container) {
    container = document.createElement("div");
    container.id = "booking-popup";
    document.body.appendChild(container);
  }

  // Load Google Font
  if (!document.getElementById("brp-font-lora")) {
    var link = document.createElement("link");
    link.id = "brp-font-lora";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&display=swap";
    document.head.appendChild(link);
  }

  // ============================================================
  // CSS INJECTION
  // ============================================================

  if (!document.getElementById("brp-style")) {
    var styleEl = document.createElement("style");
    styleEl.id = "brp-style";
    styleEl.textContent = "\n:root {\n  --gold: #b89b47;\n  --gold-d: #a48a3e;\n  --ink: #2a2a2a;\n  --muted: #6b6b6b;\n  --input-h: 46px;\n  --radius: 12px;\n}\n\n#brp-root {\n  font-family: 'Lora', serif !important;\n  color: var(--ink);\n  width: 100%;\n  padding: 32px 26px;\n}\n\n.brp-title {\n  text-align: center;\n  color: var(--gold);\n  font-weight: 700;\n  font-size: 30px;\n  letter-spacing: .04em;\n  margin: 4px 0 22px;\n}\n\n.brp-pills {\n  display: flex;\n  justify-content: center;\n  gap: 14px;\n  flex-wrap: wrap;\n  margin: 0 0 20px;\n}\n\n.brp-pill {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: 999px;\n  padding: 10px 18px;\n  background: #fff;\n  cursor: pointer;\n  font-weight: 700;\n  user-select: none;\n  transition: background .2s, color .2s, border-color .2s, transform .02s;\n}\n\n.brp-pill input {\n  appearance: none;\n  width: 16px;\n  height: 16px;\n  border-radius: 999px;\n  border: 2px solid var(--gold);\n  display: inline-block;\n}\n\n.brp-pill.is-active {\n  background: var(--gold);\n  color: #fff;\n  border-color: var(--gold);\n}\n\n.brp-pill.is-active input {\n  border-color: #fff;\n}\n\n.brp-pill:active {\n  transform: translateY(1px)\n}\n\n.brp-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n  margin-bottom: 16px;\n}\n\n.brp-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.brp-label {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--muted);\n  text-transform: uppercase;\n  letter-spacing: .08em\n}\n\n.brp-input {\n  height: var(--input-h);\n  line-height: var(--input-h);\n  border: 1px solid rgba(0, 0, 0, .15);\n  background: #fff;\n  border-radius: var(--radius);\n  padding: 0 12px;\n  font-size: 16px;\n  font-weight: 500;\n  transition: border-color .2s, box-shadow .2s;\n}\n\n.brp-input:focus {\n  outline: none;\n  border-color: var(--gold);\n  box-shadow: 0 0 0 3px rgba(184, 155, 71, .18)\n}\n\n.brp-row {\n  margin-bottom: 14px;\n}\n\n#ci-wrap,\n#co-wrap {\n  cursor: pointer;\n}\n\n#brp-root #departure_city_container.dep-suggest-wrap {\n  position: relative;\n}\n\n#brp-root .dep-suggest {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  background: #fff !important;\n  color: #2a2a2a;\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: 10px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, .12);\n  margin-top: 6px;\n  max-height: 280px;\n  overflow: auto;\n  display: none;\n}\n\n#brp-root .dep-s-item {\n  padding: 10px 12px;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n#brp-root .dep-s-item:hover {\n  background: #f6f6f6;\n}\n\n#brp-root .dep-s-name {\n  font-weight: 700;\n}\n\n#brp-root .dep-s-meta {\n  font-size: 12px;\n  color: #666;\n}\n\n.datalist-note {\n  font-size: 12px;\n  color: var(--muted);\n  margin-top: 4px\n}\n\n.rg-inline {\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: var(--radius);\n  background: #fff;\n  margin-bottom: 14px;\n}\n\n.rg-summary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 12px;\n  height: var(--input-h);\n  cursor: pointer;\n  gap: 10px;\n}\n\n.rg-badges {\n  display: flex;\n  gap: 12px;\n  align-items: center\n}\n\n.rg-badge {\n  display: flex;\n  align-items: center;\n  gap: 6px\n}\n\n.rg-badge .num {\n  font-weight: 700;\n  font-size: 18px\n}\n\n.rg-caret {\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  transition: transform .2s\n}\n\n.rg-inline.is-open .rg-caret {\n  transform: rotate(180deg)\n}\n\n.rg-panel {\n  display: none;\n  border-top: 1px solid rgba(0, 0, 0, .12);\n  padding: 12px;\n}\n\n.rg-inline.is-open .rg-panel {\n  display: block\n}\n\n.rg-room {\n  padding: 12px;\n  border: 1px solid rgba(0, 0, 0, .08);\n  border-radius: 10px;\n  margin-bottom: 10px;\n  background: #fafafa\n}\n\n.rg-room:last-child {\n  margin-bottom: 0\n}\n\n.rg-title {\n  font-weight: 700;\n  margin-bottom: 8px\n}\n\n.rg-ctrl {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 8px 0\n}\n\n.rg-ctrl-label {\n  font-size: 16px\n}\n\n.rg-steps {\n  display: flex;\n  align-items: center;\n  gap: 12px\n}\n\n.rg-step {\n  width: 36px;\n  height: 36px;\n  border: 1px solid rgba(0, 0, 0, .25);\n  border-radius: 999px;\n  background: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  cursor: pointer;\n}\n\n.rg-count {\n  min-width: 16px;\n  text-align: center\n}\n\n.rg-actions {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 10px\n}\n\n.rg-add {\n  background: none;\n  border: none;\n  color: #1a3d5c;\n  font-weight: 700;\n  cursor: pointer\n}\n\n.rg-room button[data-remove] {\n  background: none;\n  border: none;\n  color: #b33;\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 15px;\n  margin-top: 8px\n}\n\n#rg-collapse.rg-link {\n  background: #1a73e8;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 8px 16px;\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 15px;\n  transition: background .2s, transform .02s;\n}\n\n#rg-collapse.rg-link:hover {\n  background: #1557b0;\n}\n\n#rg-collapse.rg-link:active {\n  transform: translateY(1px)\n}\n\n.check-availability-btn {\n  width: 100%;\n  height: var(--input-h);\n  line-height: var(--input-h);\n  background: var(--gold);\n  color: #fff;\n  font-weight: 800;\n  font-size: 17px;\n  border: none;\n  border-radius: var(--radius);\n  cursor: pointer;\n  transition: background .2s, transform .02s;\n}\n\n.check-availability-btn:hover {\n  background: var(--gold-d)\n}\n\n.check-availability-btn:active {\n  transform: translateY(1px)\n}\n\n.brp-points {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  align-items: center;\n  margin-top: 14px;\n  flex-wrap: wrap;\n  font-size: 15px;\n}\n\n.brp-dot {\n  width: 8px;\n  height: 8px;\n  background: var(--gold);\n  border-radius: 999px;\n  display: inline-block;\n  margin-right: 8px;\n  vertical-align: middle\n}\n\n#brp-root .autocomplete-suggestions,\n#brp-root .autocomplete-panel,\n#brp-root .awesomplete,\n#brp-root .ui-autocomplete,\n#brp-root #airport_suggestions {\n  display: none !important;\n}\n\n@media(max-width:640px) {\n  .brp-grid {\n    grid-template-columns: 1fr\n  }\n  .brp-title {\n    font-size: 26px\n  }\n  .check-availability-btn {\n    font-size: 16px\n  }\n}\n\n.brp-lead-wrap {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  padding: 10px 0 6px;\n}\n\n.brp-spinner {\n  width: 54px;\n  height: 54px;\n  border-radius: 999px;\n  border: 5px solid rgba(0, 0, 0, .12);\n  border-top-color: var(--gold);\n  animation: brpSpin 1s linear infinite;\n}\n\n@keyframes brpSpin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.brp-rotator {\n  font-weight: 800;\n  font-size: 18px;\n  color: var(--ink);\n  text-align: center;\n  min-height: 28px;\n}\n\n.brp-lead-title {\n  text-align: center;\n  font-weight: 700;\n  font-size: 16px;\n  color: var(--muted);\n  margin-top: 2px;\n  max-width: 520px;\n}\n\n.brp-lead-form {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 6px;\n}\n\n.brp-lead-form .brp-input {\n  width: 100%;\n}\n\n.brp-lead-submit {\n  width: 100%;\n  height: var(--input-h);\n  line-height: var(--input-h);\n  background: var(--gold);\n  color: #fff;\n  font-weight: 800;\n  font-size: 16px;\n  border: none;\n  border-radius: var(--radius);\n  cursor: pointer;\n  transition: background .2s, transform .02s;\n}\n\n.brp-lead-submit:hover {\n  background: var(--gold-d);\n}\n\n.brp-lead-submit:active {\n  transform: translateY(1px);\n}\n\n.brp-lead-note {\n  text-align: center;\n  font-size: 12px;\n  color: var(--muted);\n  margin-top: 2px;\n}\n\n.brp-success {\n  text-align: center;\n  font-weight: 800;\n  font-size: 20px;\n  color: var(--ink);\n  margin-top: 6px;\n}\n\n.brp-success-sub {\n  text-align: center;\n  font-weight: 700;\n  font-size: 14px;\n  color: var(--muted);\n  max-width: 520px;\n}\n";
    document.head.appendChild(styleEl);
  }

  // ============================================================
  // HTML INJECTION
  // ============================================================

  container.innerHTML = "\n<div id=\"brp-error\" style=\"\n  display:none;\n  margin:16px auto 8px;\n  max-width:420px;\n  padding:10px 14px;\n  border-radius:8px;\n  background:#fff3f3;\n  border:1px solid #f0c2c2;\n  color:#8f2d2d;\n  font-size:14px;\n  font-weight:500;\n  text-align:center;\n  position:relative;\n  box-sizing:border-box;\n\">\n  <span>\n  Whoops! We didn\u2019t find availability on your selected dates.\n</span>\n\n</div>\n\n<div id=\"brp-root\">\n  <h3 class=\"brp-title\">BOOK YOUR GETAWAY</h3>\n\n  <div class=\"brp-pills\">\n    <label class=\"brp-pill is-active\">\n      <input type=\"radio\" name=\"booking_type\" value=\"Hotel Only\" checked required> Hotel Only\n    </label>\n    <label class=\"brp-pill\">\n      <input type=\"radio\" name=\"booking_type\" value=\"Hotel + Flight\" required> Hotel + Flight\n    </label>\n  </div>\n\n  <div class=\"brp-grid\">\n    <div class=\"brp-field\" id=\"ci-wrap\">\n      <div class=\"brp-label\">Check In</div>\n      <input id=\"checkin_field\" type=\"date\" required class=\"brp-input\">\n    </div>\n    <div class=\"brp-field\" id=\"co-wrap\">\n      <div class=\"brp-label\">Check Out</div>\n      <input id=\"checkout_field\" type=\"date\" required class=\"brp-input\">\n    </div>\n  </div>\n\n  <div id=\"departure_city_container\" class=\"brp-field\" style=\"display:none;\">\n    <div class=\"brp-label\">Departure City</div>\n    <input id=\"departure_city_field\" type=\"text\" placeholder=\"Type city or IATA (e.g., LAX, JFK, MIA)\" class=\"brp-input\" autocomplete=\"off\">\n    <div class=\"datalist-note\"></div>\n  </div>\n\n  <div class=\"brp-field\">\n    <div class=\"brp-label\">Rooms & Guests</div>\n    <div class=\"rg-inline\" id=\"rg-inline\">\n      <div class=\"rg-summary\" id=\"rg-summary\">\n        <div class=\"rg-badges\">\n          <span class=\"rg-badge\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"3\" y=\"10\" width=\"18\" height=\"8\" rx=\"1.5\"></rect><path d=\"M7 10V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3\"></path></svg>\n            <span id=\"rg-rooms-count\" class=\"num\">1</span>\n          </span>\n          <span class=\"rg-badge\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z\"></path><path d=\"M4 20a8 8 0 0 1 16 0\"></path></svg>\n            <span id=\"rg-guests-count\" class=\"num\">2</span>\n          </span>\n        </div>\n        <span class=\"rg-caret\" aria-hidden=\"true\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"><path d=\"M6 9l6 6 6-6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></span>\n      </div>\n\n      <div class=\"rg-panel\" id=\"rg-panel\">\n        <div id=\"rg-rooms\"></div>\n        <div class=\"rg-actions\">\n          <button id=\"rg-add\" class=\"rg-add\" type=\"button\">\uFF0B Add Room</button>\n          <button id=\"rg-collapse\" class=\"rg-link\" type=\"button\">Done</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <button id=\"brp-check-btn\" class=\"check-availability-btn\">\n    Check Availability\n  </button>\n\n  <div class=\"brp-points\">\n    <span><i class=\"brp-dot\"></i><b>Lowest Price Guaranteed</b></span>\n    <span><i class=\"brp-dot\"></i><b>Complimentary Perks</b></span>\n    <span><i class=\"brp-dot\"></i><b>No Hidden Fees</b></span>\n  </div>\n</div>\n";

  // Save original template
  if (!window.__BRP_TEMPLATE_HTML__) {
    var root = document.getElementById("brp-root");
    if (root) window.__BRP_TEMPLATE_HTML__ = root.innerHTML;
  }

  // ============================================================
  // MAIN POPUP LOGIC
  // ============================================================

  function initBookingPopup() {
    var root = document.getElementById("brp-root");
    if (!root) return;

    // Ensure template exists
    if (!window.__BRP_TEMPLATE_HTML__) {
      window.__BRP_TEMPLATE_HTML__ = root.innerHTML;
    }

    // Check for prefill from booking bar
    if (window.__BRP_PREFILL__) {
      var data = window.__BRP_PREFILL__;
      window.__BRP_PREFILL__ = null;

      showLoadingLeadForm({
        bookingType: data.bookingType || "Hotel Only",
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        departure: data.departure || "",
        rooms: data.rooms || [{ adults: 2, children: 0 }]
      });

      return;
    }

    // Default dates (today + 3 nights)
    var checkin = document.getElementById('checkin_field');
    var checkout = document.getElementById('checkout_field');

    if (checkin && checkout) {
      var today = new Date();

      var toISO = function(d) {
        var y = d.getFullYear();
        var m = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        return y + "-" + m + "-" + day;
      };

      var plus3 = new Date(today);
      plus3.setDate(plus3.getDate() + 3);

      checkin.min = toISO(today);
      checkin.value = toISO(today);

      checkout.min = toISO(today);
      checkout.value = toISO(plus3);
    }

    // ============================================================
    // HOTEL CONFIG (FROM GOOGLE SHEET)
    // ============================================================

    var ACTIVE_HOTEL_ID = null;
    var ACTIVE_MAX_ADULTS = 2;
    var ACTIVE_MAX_CHILDREN = 0;
    var ACTIVE_MAX_ROOMS = 1;

    function getWordPressSiteTitle() {
      var ogSite = document.querySelector('meta[property="og:site_name"]');
      if (ogSite && ogSite.content) return ogSite.content.trim();

      if (window._wpSiteName) return window._wpSiteName.trim();

      var headerTitle = document.querySelector('.site-title, .logo-text, header h1');
      if (headerTitle && headerTitle.textContent) return headerTitle.textContent.trim();

      return (document.title || "")
        .split("|")[0]
        .split("–")[0]
        .split("-")[0]
        .trim();
    }

    function getHotelIdFromSheet(siteTitle) {
      var SHEET_ID = "1_RQTyhOsvhlRLQV7xPJ4Jdukd9umtUYEKRhAoJmr2NA";
      var SHEET_NAME = "Hotel Info";

      var url =
        "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + encodeURIComponent(SHEET_NAME) + "&tq=" +
        encodeURIComponent("SELECT A, B, C, D, E");

      return fetch(url)
        .then(function(res){ return res.text(); })
        .then(function(text){
          var json = JSON.parse(text.substring(47).slice(0, -2));
          var rows = json.table.rows || [];

          var target = siteTitle.toLowerCase();

          for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var hotelName = row.c[0] && row.c[0].v;
            var hotelId   = row.c[1] && row.c[1].v;

            if (!hotelName || !hotelId) continue;

            if (target.includes(hotelName.toLowerCase())) {
              return {
                hotelId: String(hotelId),
                maxAdults: Number(row.c[2] && row.c[2].v || 2),
                maxChildren: Number(row.c[3] && row.c[3].v || 0),
                maxRooms: Number(row.c[4] && row.c[4].v || 1)
              };
            }
          }

          return null;
        });
    }

    (function initHotelId() {
      var siteTitle = getWordPressSiteTitle();
      getHotelIdFromSheet(siteTitle).then(function(hotelConfig){
        if (!hotelConfig || !hotelConfig.hotelId) {
          console.error("❌ MakCorp Hotel config not found for site:", siteTitle);
          return;
        }

        ACTIVE_HOTEL_ID = hotelConfig.hotelId;
        ACTIVE_MAX_ADULTS = hotelConfig.maxAdults;
        ACTIVE_MAX_CHILDREN = hotelConfig.maxChildren;
        ACTIVE_MAX_ROOMS = hotelConfig.maxRooms;

        console.log("✅ Hotel config loaded", {
          ACTIVE_HOTEL_ID: ACTIVE_HOTEL_ID,
          ACTIVE_MAX_ADULTS: ACTIVE_MAX_ADULTS,
          ACTIVE_MAX_CHILDREN: ACTIVE_MAX_CHILDREN,
          ACTIVE_MAX_ROOMS: ACTIVE_MAX_ROOMS
        });

        enforceRoomsRules();
      }).catch(function(err){
        console.error("❌ Failed to load hotel config:", err);
      });
    })();

    // ============================================================
    // HELPER FUNCTIONS
    // ============================================================

    function toLocalISO(date){
      var y = date.getFullYear();
      var m = String(date.getMonth()+1).padStart(2,'0');
      var d = String(date.getDate()).padStart(2,'0');
      return y + "-" + m + "-" + d;
    }

    function parseLocalDate(str){
      if(!str) return null;
      var parts = str.split('-').map(Number);
      return new Date(parts[0], parts[1]-1, parts[2]);
    }

    function formatRange(ci,co){
      var a=parseLocalDate(ci), b=parseLocalDate(co);
      var opt={month:"short",day:"numeric"};
      return a.toLocaleDateString("en-US",opt) + "–" + b.toLocaleDateString("en-US",opt) + ", " + a.getFullYear();
    }

    function getTotalsFromRooms(rooms) {
      rooms = rooms || [];
      return {
        adults: rooms.reduce(function(sum, r){ return sum + (r.adults || 0); }, 0),
        rooms: rooms.length
      };
    }

    function fetchWithRetry(url, maxAttempts, delayMs) {
      maxAttempts = maxAttempts || 3;
      delayMs = delayMs || 500;

      function attempt(n) {
        return fetch(url)
          .then(function(res){ return res.json(); })
          .then(function(data){
            var normalized = normalizeComparisonResults(data);

            var hasExpedia = normalized.some(function(r){ return r.vendor === "Expedia.com"; });
            var hasHotels  = normalized.some(function(r){ return r.vendor === "Hotels.com"; });

            if (hasExpedia && hasHotels) {
              return normalized;
            }

            if (n === maxAttempts && normalized.length > 0) {
              return normalized;
            }

            if (n < maxAttempts) {
              return new Promise(function(resolve){ 
                setTimeout(function(){ 
                  resolve(attempt(n + 1)); 
                }, delayMs); 
              });
            }

            return [];
          })
          .catch(function(err){
            console.warn("Worker attempt " + n + " failed", err);
            
            if (n < maxAttempts) {
              return new Promise(function(resolve){ 
                setTimeout(function(){ 
                  resolve(attempt(n + 1)); 
                }, delayMs); 
              });
            }

            return [];
          });
      }

      return attempt(1);
    }

    function normalizeComparisonResults(raw){
      if(!raw || !raw.comparison || !raw.comparison[0]) return [];

      var PRIORITY = [
        "Expedia.com",
        "Hotels.com"
      ];

      var rows = raw.comparison[0];
      var vendors = [];

      rows.forEach(function(obj){
        Object.keys(obj).forEach(function(key){
          if(key.startsWith("vendor") && obj[key]){
            var idx = key.replace("vendor","");
            var vendor = obj[key];
            var price = obj["price"+idx];
            var total = obj["Totalprice"+idx];

            if(price && total){
              vendors.push({
                vendor: vendor,
                nightly: price,
                total: total
              });
            }
          }
        });
      });

      var ordered = [];
      PRIORITY.forEach(function(p){
        var match = vendors.find(function(v){
          return v.vendor.toLowerCase() === p.toLowerCase();
        });
        if(match) ordered.push(match);
      });

      return ordered.slice(0,4);
    }

    var VENDOR_LOGOS = {
      "BookResorts": "https://img-cdn-prod.travelapi.ai/68e5a3b8124af727db1c6ea9-logo-mobile.png",
      "Expedia.com": "https://www.expedia.com/favicon.ico",
      "Hotels.com": "https://www.hotels.com/favicon.ico"
    };

    function calculateOurRate(results, discountPct) {
      discountPct = discountPct || 2.5;
      
      if (!results || !results.length) return null;

      var eligible = results.filter(function(r){
        return ["Expedia.com", "Hotels.com"].indexOf(r.vendor) !== -1;
      });

      if (!eligible.length) return null;

      var parseMoney = function(v){ return Number(v.replace(/[^0-9.]/g, "")); };
      
      var cheapest = eligible.reduce(function(a, b){
        return parseMoney(a.total) <= parseMoney(b.total) ? a : b;
      });

      var baseTotal = parseMoney(cheapest.total);
      var baseNight = parseMoney(cheapest.nightly);

      var discountedTotal = baseTotal * (1 - discountPct / 100);
      var discountedNight = baseNight * (1 - discountPct / 100);

      var savings = baseTotal - discountedTotal;

      function fmt(n) {
        return n.toLocaleString("en-US");
      }

      return {
        vendor: "BookResorts",
        nightly: "$" + fmt(Math.round(discountedNight)),
        total: "$" + fmt(Math.round(discountedTotal)),
        savings: "$" + fmt(Math.round(savings)),
        source: cheapest.vendor
      };
    }

    function renderComparisonResults(results, name, phone){
      var ourRate = calculateOurRate(results);
      var hotelName = getWordPressSiteTitle();

      var html = '<div style="width:100%;max-width:600px;">';

      if (ourRate) {
        html += '<div style="border:2px solid #b89b47;border-radius:18px;padding:20px;margin-bottom:22px;background:linear-gradient(135deg,#fff8e6,#ffffff);box-shadow:0 10px 30px rgba(184,155,71,.25);">';
        html += '<div style="display:flex;align-items:center;gap:14px;margin-bottom:8px;">';
        html += '<img src="' + VENDOR_LOGOS.BookResorts + '" style="height:28px">';
        html += '<div style="font-weight:900;font-size:18px;">Lowest Price</div>';
        html += '<span style="background:#1f7a3f;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">Best Rate Guaranteed</span>';
        html += '</div>';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
        html += '<div><div style="font-size:14px;color:#555;">' + ourRate.nightly + ' / night</div>';
        html += '<div style="font-size:13px;color:#1f7a3f;font-weight:800;">You save ' + ourRate.savings + '</div></div>';
        html += '<div style="text-align:right;"><div style="font-size:26px;font-weight:900;">' + ourRate.total + '</div>';
        html += '<div style="font-size:12px;color:#666;">total</div></div></div>';
        html += '<div style="margin-top:12px;font-size:13px;color:#555;">✔ No hidden fees &nbsp; ✔ Dedicated resort specialist</div>';
        html += '</div>';
        html += '<div style="font-weight:800;margin:6px 0 14px;color:#555;">Other Booking Sites</div>';
      }

      results.forEach(function(r){
        html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border:1px solid rgba(0,0,0,.15);border-radius:14px;margin-bottom:12px;background:#fff;">';
        html += '<div style="display:flex;align-items:center;gap:14px;">';
        html += '<img src="' + (VENDOR_LOGOS[r.vendor] || '') + '" style="height:22px;max-width:110px;object-fit:contain">';
        html += '<div><div style="font-weight:800">' + r.vendor + '</div>';
        html += '<div style="font-size:13px;color:#666">' + r.nightly + ' / night</div></div></div>';
        html += '<div style="text-align:right;"><div style="font-weight:800;font-size:18px">' + r.total + '</div>';
        html += '<div style="font-size:12px;color:#666">total</div></div></div>';
      });

      html += '<div style="margin-top:18px; text-align:center; font-size:14px; color:#444;">';
      html += '<div style="font-size:15px; color:#444;">A ' + hotelName + ' specialist will be reaching out to you soon.</div>';
      html += '<div id="phone-confirmation-area" style="margin-top:12px; text-align:center;">';
      html += '<div id="confirm-phone-display" style="font-size:16px; margin-bottom:6px;">📞 <b>' + phone + '</b></div>';
      html += '<div style="font-size:14px; color:#555;">Is this the best number to reach you?</div>';
      html += '<div style="margin-top:10px; display:flex; gap:10px; justify-content:center;">';
      html += '<button id="phone-yes-btn" style="padding:8px 16px; border-radius:8px; border:none; background:#1f7a3f; color:#fff; font-weight:700; cursor:pointer;">Yes</button>';
      html += '<button id="phone-edit-btn" style="padding:8px 16px; border-radius:8px; border:1px solid #ccc; background:#fff; font-weight:700; cursor:pointer;">Update Number</button>';
      html += '</div>';
      html += '<div id="phone-edit-wrap" style="display:none; margin-top:14px;">';
      html += '<div style="display:flex; gap:8px; justify-content:center;">';
      html += '<select id="confirm-country-code" class="brp-input" style="width:110px; text-overflow:ellipsis;"></select>';
      html += '<input id="phone-edit-input" type="tel" inputmode="tel" class="brp-input" placeholder="(555) 555-5555" style="max-width:220px;">';
      html += '</div>';
      html += '<div style="margin-top:10px; text-align:center;">';
      html += '<button id="phone-save-btn" style="padding:8px 18px; border-radius:8px; border:none; background:#1a73e8; color:#fff; font-weight:800; cursor:pointer;">Save</button>';
      html += '</div></div></div></div>';
      html += '<div style="margin-top:14px; text-align:center;">';
      html += '<div style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:#fff6d6;border:1px solid #f1d48a;border-radius:999px;font-size:13px;font-weight:600;color:#8a6d1d;">';
      html += '⏱ Average wait time: <b>Less than 1 min</b></div></div></div></div>';

      return html;
    }

    // ============================================================
    // LOADING + LEAD FORM
    // ============================================================

    var ROTATE_PHRASES = [
      "Best Rates Guaranteed",
      "30+ Years of Experience",
      "24/7 Guest Support"
    ];
    var rotateTimer = null;

    function showLoadingLeadForm(payload){
      var LOCKED_BOOKING = {
        bookingType: payload.bookingType,
        checkIn: payload.checkIn,
        checkOut: payload.checkOut,
        departure: payload.departure || "",
        rooms: JSON.parse(JSON.stringify(payload.rooms || []))
      };

      container.dataset.pendingBooking = JSON.stringify(LOCKED_BOOKING);

      var popupRoot = document.getElementById("brp-root");
      if (!popupRoot) return;

      popupRoot.innerHTML = '<div class="brp-lead-wrap"><div class="brp-spinner" aria-label="Loading"></div><div class="brp-rotator" id="brp-rotator">' + ROTATE_PHRASES[0] + '</div><div class="brp-lead-title">Please enter your information to receive your exclusive offers</div><form class="brp-lead-form" id="brp-lead-form" autocomplete="on"><div class="brp-field"><div class="brp-label">Name</div><input class="brp-input" id="brp-lead-name" name="name" type="text" placeholder="Your name" required></div><div class="brp-field"><div class="brp-label">Phone Number</div><div style="display:flex; gap:8px;"><select id="brp-country-code" class="brp-input" style="width:110px; text-overflow:ellipsis;"></select><input class="brp-input" id="brp-lead-phone" name="phone" type="tel" inputmode="tel" placeholder="(555) 555-5555" required style="flex:1;"></div></div><button class="brp-lead-submit" id="brp-lead-submit" type="submit">Continue</button><div class="brp-lead-note">No spam — just your best available offers.</div></form></div>';

      var i = 0;
      clearInterval(rotateTimer);
      rotateTimer = setInterval(function () {
        i = (i + 1) % ROTATE_PHRASES.length;
        var el = document.getElementById("brp-rotator");
        if(el) el.textContent = ROTATE_PHRASES[i];
      }, 2500);

      var form = document.getElementById("brp-lead-form");
      var submitBtn = document.getElementById("brp-lead-submit");
      var countrySelect = document.getElementById("brp-country-code");
      var phoneInput = document.getElementById("brp-lead-phone");

      if (countrySelect && phoneInput) {
        var COUNTRIES = [
          { code: "+1",  label: "🇺🇸 United States" },
          { code: "+44", label: "🇬🇧 United Kingdom" },
          { code: "+61", label: "🇦🇺 Australia" },
          { code: "+52", label: "🇲🇽 Mexico" },
          { code: "+49", label: "🇩🇪 Germany" },
          { code: "+33", label: "🇫🇷 France" },
          { code: "+39", label: "🇮🇹 Italy" },
          { code: "+34", label: "🇪🇸 Spain" },
          { code: "+31", label: "🇳🇱 Netherlands" },
          { code: "+41", label: "🇨🇭 Switzerland" },
          { code: "+43", label: "🇦🇹 Austria" },
          { code: "+45", label: "🇩🇰 Denmark" },
          { code: "+46", label: "🇸🇪 Sweden" },
          { code: "+47", label: "🇳🇴 Norway" },
          { code: "+48", label: "🇵🇱 Poland" },
          { code: "+351",label: "🇵🇹 Portugal" },
          { code: "+353",label: "🇮🇪 Ireland" },
          { code: "+32", label: "🇧🇪 Belgium" },
          { code: "+7",  label: "🇷🇺 Russia" },
          { code: "+90", label: "🇹🇷 Turkey" },
          { code: "+20", label: "🇪🇬 Egypt" },
          { code: "+27", label: "🇿🇦 South Africa" },
          { code: "+971",label: "🇦🇪 UAE" },
          { code: "+972",label: "🇮🇱 Israel" },
          { code: "+91", label: "🇮🇳 India" },
          { code: "+86", label: "🇨🇳 China" },
          { code: "+81", label: "🇯🇵 Japan" },
          { code: "+82", label: "🇰🇷 South Korea" },
          { code: "+65", label: "🇸🇬 Singapore" },
          { code: "+55", label: "🇧🇷 Brazil" },
          { code: "+1",  label: "🇨🇦 Canada" }
        ];

        var us = COUNTRIES.find(function(c){ return c.label.includes("United States"); });
        var others = COUNTRIES
          .filter(function(c){ return !c.label.includes("United States"); })
          .sort(function(a, b){ return a.label.localeCompare(b.label); });

        var SORTED_COUNTRIES = us ? [us].concat(others) : others;

        countrySelect.innerHTML = SORTED_COUNTRIES.map(function(c){
          return '<option value="' + c.code + '" data-full="' + c.label + ' ' + c.code + '" data-short="' + c.label.split(' ')[0] + ' ' + c.code + '">' + c.label + ' ' + c.code + '</option>';
        }).join("");

        countrySelect.value = "+1";

        function updateSelectedCountryText() {
          var opt = countrySelect.options[countrySelect.selectedIndex];
          if (!opt) return;

          for(var j=0; j<countrySelect.options.length; j++){
            var o = countrySelect.options[j];
            if (o.dataset && o.dataset.full) o.text = o.dataset.full;
          }

          opt.text = opt.dataset.short;
        }

        updateSelectedCountryText();
        countrySelect.addEventListener("change", updateSelectedCountryText);

        phoneInput.addEventListener("input", function(){
          if (countrySelect.value === "+1") {
            var digits = phoneInput.value.replace(/\D/g, "").slice(0, 10);
            var out = "";
            if (digits.length > 0) out += "(" + digits.slice(0, 3);
            if (digits.length >= 4) out += ") " + digits.slice(3, 6);
            if (digits.length >= 7) out += "-" + digits.slice(6);
            phoneInput.value = out;
          }
        });
      }

      form.addEventListener("submit", function(e){
        e.preventDefault();

        var name = document.getElementById("brp-lead-name").value.trim();
        container.dataset.leadName = name;
        var rawPhone = document.getElementById("brp-lead-phone").value.trim();
        var countryCode = document.getElementById("brp-country-code").value;

        var phone = countryCode + " " + rawPhone;

        if(!name){
          alert("Please enter your name.");
          return;
        }

        var digits = phone.replace(/\D/g,'');
        if(digits.length < 10){
          alert("Please enter a valid phone number.");
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        var lockedBooking = JSON.parse(container.dataset.pendingBooking || "{}");
        var bookingType = lockedBooking.bookingType;

        // HOTEL + FLIGHT (NO PRICING)
        if (bookingType === "Hotel + Flight") {
          var roomsConfig = lockedBooking.rooms.map(function (r, i) {
            var line = "Room " + (i + 1) + ": " + r.adults + " Adult" + (r.adults > 1 ? "s" : "");
            if (r.children && r.children > 0) {
              line += ", " + r.children + " Child" + (r.children > 1 ? "ren" : "");
            }
            return line;
          }).join(" • ");

          setTimeout(function () {
            var payload = {
              name: name,
              phone: phone,
              booking_type: "Hotel + Flight",
              hotel_name: getWordPressSiteTitle(),
              departure_city: lockedBooking.departure || "",
              check_in: lockedBooking.checkIn,
              check_out: lockedBooking.checkOut,
              rooms_config: roomsConfig,
              sent_at: new Date().toISOString()
            };

            var blob = new Blob(
              [JSON.stringify(payload)],
              { type: "text/plain" }
            );

            if (!window.__BRP_ZAPIER_SENT__) {
              window.__BRP_ZAPIER_SENT__ = true;

              navigator.sendBeacon(
                "https://hooks.zapier.com/hooks/catch/3129081/uw4v30l/",
                blob
              );
            }
          }, 0);

          container.dataset.leadName = name;

          var popupRoot = document.getElementById("brp-root");
          if (!popupRoot) return;

          popupRoot.innerHTML = '<div class="brp-lead-wrap"><div class="brp-success">You\'re all set, ' + name + '.</div><div class="brp-success-sub">A ' + getWordPressSiteTitle() + ' specialist will be reaching out shortly.</div><div style="margin-top:18px;display:grid;gap:12px;max-width:440px;width:100%;"><div style="padding:14px 16px;border-radius:14px;background:#f7f3e7;border:1px solid rgba(0,0,0,.08);"><div style="font-size:12px;color:#777;font-weight:700;letter-spacing:.06em;">TRAVEL DATES</div><div style="font-size:17px;font-weight:800;margin-top:4px;">' + lockedBooking.checkIn + ' → ' + lockedBooking.checkOut + '</div></div>' + (lockedBooking.departure ? '<div style="padding:14px 16px;border-radius:14px;background:#f7f3e7;border:1px solid rgba(0,0,0,.08);"><div style="font-size:12px;color:#777;font-weight:700;letter-spacing:.06em;">DEPARTURE CITY</div><div style="font-size:17px;font-weight:800;margin-top:4px;">' + lockedBooking.departure + '</div></div>' : '') + '<div style="padding:14px 16px;border-radius:14px;background:#f7f3e7;border:1px solid rgba(0,0,0,.08);"><div style="font-size:12px;color:#777;font-weight:700;letter-spacing:.06em;">ROOMS & GUESTS</div><div style="font-size:16px;font-weight:700;margin-top:6px;line-height:1.5;">' + roomsConfig + '</div></div></div><div id="phone-confirmation-area" style="margin-top:22px;text-align:center;"><div id="confirm-phone-display" style="font-size:18px;margin-bottom:6px;">📞 <b>' + phone + '</b></div><div style="font-size:14px;color:#555;">Is this the best number to reach you?</div><div style="margin-top:12px;display:flex;gap:10px;justify-content:center;"><button id="phone-yes-btn" style="padding:8px 18px;border-radius:8px;border:none;background:#1f7a3f;color:#fff;font-weight:700;">Yes</button><button id="phone-edit-btn" style="padding:8px 18px;border-radius:8px;border:1px solid #ccc;background:#fff;font-weight:700;">Update Number</button></div><div id="phone-edit-wrap" style="display:none;margin-top:14px;"><div style="display:flex;gap:8px;justify-content:center;"><select id="confirm-country-code" class="brp-input" style="width:110px;"></select><input id="phone-edit-input" class="brp-input" type="tel" placeholder="(555) 555-5555" style="max-width:220px;"></div><div style="margin-top:10px;"><button id="phone-save-btn" style="padding:8px 18px;border-radius:8px;border:none;background:#1a73e8;color:#fff;font-weight:800;">Save</button></div></div></div><div style="margin-top:20px;"><div style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:#fff6d6;border:1px solid #f1d48a;border-radius:999px;font-size:13px;font-weight:600;color:#8a6d1d;">⏱ Average wait time: <b>Less than 1 min</b></div></div></div>';

          setTimeout(function () {
            setupPhoneConfirmation(phone, lockedBooking);
          }, 0);

          return;
        }

        // HOTEL ONLY (WITH PRICING)
        var lockedBooking = JSON.parse(container.dataset.pendingBooking || "{}");

        if (!lockedBooking.checkIn || !lockedBooking.checkOut) {
          console.error("Booking data missing", lockedBooking);
          return;
        }

        var totals = getTotalsFromRooms(lockedBooking.rooms);
        var adults = totals.adults;
        var roomsCt = totals.rooms;

        console.log("MakCorp totals being sent:", {
          adults: adults,
          rooms: roomsCt,
          rawRooms: lockedBooking.rooms
        });

        if (!ACTIVE_HOTEL_ID) {
          alert("This hotel is not yet configured for booking.");
          return;
        }

        var workerUrl =
          "https://makcorp-price-comparison.edwin-b8e.workers.dev/?" +
          "hotelid=" + ACTIVE_HOTEL_ID +
          "&checkin=" + lockedBooking.checkIn +
          "&checkout=" + lockedBooking.checkOut +
          "&adults=" + adults +
          "&rooms=" + roomsCt +
          "&cur=USD";

        clearInterval(rotateTimer);

        var popupRoot = document.getElementById("brp-root");
        if (!popupRoot) return;

        popupRoot.innerHTML = '<div class="brp-lead-wrap"><div class="brp-spinner"></div><div class="brp-rotator">Comparing the best available rates…</div></div>';

        fetchWithRetry(workerUrl, 3, 600).then(function(results){
          if (!results || !results.length) {
            if (window.__BRP_RESET__) {
              window.__BRP_RESET__();
            }

            setTimeout(function () {
              var errorBox = document.getElementById("brp-error");
              if (errorBox) {
                errorBox.style.display = "block";
                errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 50);

            return;
          }

          var resultsRoot = document.getElementById("brp-root");
          if (!resultsRoot) return;

          resultsRoot.innerHTML = '<div class="brp-lead-wrap"><div class="brp-success">Well done, ' + name + ' — you\'re officially getting the best deal.</div>' + renderComparisonResults(results, name, phone) + '</div>';

          var roomsConfig = lockedBooking.rooms.map(function (r, i) {
            var line = "Room " + (i + 1) + ": " + r.adults + " Adult" + (r.adults === 1 ? "" : "s");
            if (r.children && r.children > 0) {
              line += ", " + r.children + " Child" + (r.children === 1 ? "" : "ren");
            }
            return line;
          }).join(" • ");

          var expedia = results.find(function(r){ return r.vendor === "Expedia.com"; }) || {};
          var hotels  = results.find(function(r){ return r.vendor === "Hotels.com"; }) || {};
          var ourRate = calculateOurRate(results) || {};

          setTimeout(function () {
            var payload = {
              name: name,
              phone: phone,
              hotel_name: getWordPressSiteTitle(),
              check_in: lockedBooking.checkIn,
              check_out: lockedBooking.checkOut,
              rooms_config: roomsConfig,
              bookresorts_total: ourRate.total || "",
              expedia_total: expedia.total || "",
              hotels_total: hotels.total || "",
              sent_at: new Date().toISOString()
            };

            var blob = new Blob(
              [JSON.stringify(payload)],
              { type: "text/plain" }
            );

            navigator.sendBeacon(
              "https://hooks.zapier.com/hooks/catch/3129081/uw4v30l/",
              blob
            );
          }, 0);

          setTimeout(function () {
            setupPhoneConfirmation(phone, lockedBooking);
          }, 0);
        });
      });
    }

    function setupPhoneConfirmation(phone, lockedBooking) {
      var yesBtn = document.getElementById("phone-yes-btn");
      var editBtn = document.getElementById("phone-edit-btn");
      var editWrap = document.getElementById("phone-edit-wrap");
      var saveBtn = document.getElementById("phone-save-btn");
      var input = document.getElementById("phone-edit-input");
      var display = document.getElementById("confirm-phone-display");
      var confirmArea = document.getElementById("phone-confirmation-area");
      var countrySelect = document.getElementById("confirm-country-code");

      if (!display || !confirmArea || !input || !countrySelect) return;

      var COUNTRIES = [
        { code: "+1",  label: "🇺🇸 United States" },
        { code: "+44", label: "🇬🇧 United Kingdom" },
        { code: "+61", label: "🇦🇺 Australia" },
        { code: "+52", label: "🇲🇽 Mexico" },
        { code: "+49", label: "🇩🇪 Germany" },
        { code: "+33", label: "🇫🇷 France" },
        { code: "+39", label: "🇮🇹 Italy" },
        { code: "+34", label: "🇪🇸 Spain" },
        { code: "+31", label: "🇳🇱 Netherlands" },
        { code: "+41", label: "🇨🇭 Switzerland" },
        { code: "+43", label: "🇦🇹 Austria" },
        { code: "+45", label: "🇩🇰 Denmark" },
        { code: "+46", label: "🇸🇪 Sweden" },
        { code: "+47", label: "🇳🇴 Norway" },
        { code: "+48", label: "🇵🇱 Poland" },
        { code: "+351",label: "🇵🇹 Portugal" },
        { code: "+353",label: "🇮🇪 Ireland" },
        { code: "+32", label: "🇧🇪 Belgium" },
        { code: "+7",  label: "🇷🇺 Russia" },
        { code: "+90", label: "🇹🇷 Turkey" },
        { code: "+20", label: "🇪🇬 Egypt" },
        { code: "+27", label: "🇿🇦 South Africa" },
        { code: "+971",label: "🇦🇪 UAE" },
        { code: "+972",label: "🇮🇱 Israel" },
        { code: "+91", label: "🇮🇳 India" },
        { code: "+86", label: "🇨🇳 China" },
        { code: "+81", label: "🇯🇵 Japan" },
        { code: "+82", label: "🇰🇷 South Korea" },
        { code: "+65", label: "🇸🇬 Singapore" },
        { code: "+55", label: "🇧🇷 Brazil" },
        { code: "+1",  label: "🇨🇦 Canada" }
      ];

      var us = COUNTRIES.find(function(c){ return c.label.includes("United States"); });
      var others = COUNTRIES
        .filter(function(c){ return !c.label.includes("United States"); })
        .sort(function(a, b){ return a.label.localeCompare(b.label); });

      var SORTED = us ? [us].concat(others) : others;

      countrySelect.innerHTML = SORTED.map(function(c){
        return '<option value="' + c.code + '" data-full="' + c.label + ' ' + c.code + '" data-short="' + c.label.split(' ')[0] + ' ' + c.code + '">' + c.label + ' ' + c.code + '</option>';
      }).join("");

      countrySelect.value = "+1";

      function updateCountryDisplay() {
        var opt = countrySelect.options[countrySelect.selectedIndex];
        if (!opt) return;

        for(var j=0; j<countrySelect.options.length; j++){
          var o = countrySelect.options[j];
          if (o.dataset && o.dataset.full) o.text = o.dataset.full;
        }

        opt.text = opt.dataset.short;
      }

      updateCountryDisplay();
      countrySelect.addEventListener("change", updateCountryDisplay);

      if (editBtn && editWrap) {
        editBtn.onclick = function(){
          editWrap.style.display = "block";
          input.focus();
        };
      }

      if (yesBtn) {
        yesBtn.onclick = function(){
          confirmArea.innerHTML = '<div style="font-size:15px; font-weight:700; color:#1f7a3f;">Thanks! Our team will connect with you shortly.</div>';
          editWrap.style.display = "none";
        };
      }

      input.addEventListener("input", function(){
        if (countrySelect.value !== "+1") return;

        var digits = input.value.replace(/\D/g, "").slice(0, 10);
        var out = "";

        if (digits.length > 0) out += "(" + digits.slice(0, 3);
        if (digits.length >= 4) out += ") " + digits.slice(3, 6);
        if (digits.length >= 7) out += "-" + digits.slice(6);

        input.value = out;
      });

      if (saveBtn) {
        saveBtn.onclick = function(){
          window.__BRP_ZAPIER_SENT__ = false;

          var raw = input.value.replace(/\D/g, "");

          if (countrySelect.value === "+1" && raw.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
          }

          var formatted = "(" + raw.slice(0,3) + ") " + raw.slice(3,6) + "-" + raw.slice(6);
          var fullPhone = countrySelect.value + " " + formatted;

          display.innerHTML = "📞 <b>" + fullPhone + "</b>";
          editWrap.style.display = "none";

          setTimeout(function () {
            var payload = {
              event: "phone_updated",
              name: container.dataset.leadName || "",
              phone: fullPhone,
              booking_type: lockedBooking.bookingType || "Hotel Only",
              hotel_name: getWordPressSiteTitle(),
              departure_city: lockedBooking.departure || "",
              check_in: lockedBooking.checkIn,
              check_out: lockedBooking.checkOut,
              rooms_config: (lockedBooking.rooms || []).map(function(r, i){
                var line = "Room " + (i + 1) + ": " + r.adults + " Adult" + (r.adults === 1 ? "" : "s");
                if (r.children && r.children > 0) {
                  line += ", " + r.children + " Child" + (r.children === 1 ? "" : "ren");
                }
                return line;
              }).join(" • "),
              sent_at: new Date().toISOString()
            };

            var blob = new Blob(
              [JSON.stringify(payload)],
              { type: "text/plain" }
            );

            navigator.sendBeacon(
              "https://hooks.zapier.com/hooks/catch/3129081/uw4v30l/",
              blob
            );
          }, 0);
        };
      }
    }

    // ============================================================
    // BOOKING TYPE + DEPARTURE
    // ============================================================

    function q(sel) {
      return document.querySelector(sel);
    }

    function qa(sel) {
      return Array.prototype.slice.call(document.querySelectorAll(sel));
    }

    var pills  = qa('.brp-pill');
    var radios = qa('input[name="booking_type"]');
    var depContainer = q('#departure_city_container');
    var depInput     = q('#departure_city_field');

    function getType(){
      var checked = q('input[name="booking_type"]:checked');
      return checked ? checked.value : "Hotel Only";
    }

    function toggleDep(){
      var t = getType();
      if(t === "Hotel + Flight"){
        depContainer.style.display = "block";
        depInput.required = true;
      }else{
        depContainer.style.display = "none";
        depInput.required = false;
        depInput.value = "";
        if(depInput.dataset) depInput.dataset.iata = "";
      }
    }

    // ============================================================
    // ROOMS & GUESTS
    // ============================================================

    var shell   = q('#rg-inline');
    var summary = q('#rg-summary');
    var addBtn  = q('#rg-add');
    var collapse= q('#rg-collapse');
    var roomsWrap = q('#rg-rooms');
    var roomsCountEl  = q('#rg-rooms-count');
    var guestsCountEl = q('#rg-guests-count');

    var rooms=[{adults:2,children:0}];

    var totalGuests = function(){ 
      return rooms.reduce(function(s,r){ return s + (r.adults||0) + (r.children||0); }, 0); 
    };
    
    var refreshSummary = function(){ 
      roomsCountEl.textContent = rooms.length; 
      guestsCountEl.textContent = totalGuests(); 
    };

    function renderRooms(){
      roomsWrap.innerHTML = '';

      rooms.forEach(function(r, idx){
        var room = document.createElement('div');
        room.className = 'rg-room';

        var adultsHtml = '<div class="rg-ctrl"><div class="rg-ctrl-label">Adults (18+)</div><div class="rg-steps"><button class="rg-step" type="button" data-op="minus" data-room="' + idx + '" data-field="adults">−</button><span class="rg-count" id="count-adults-' + idx + '">' + r.adults + '</span><button class="rg-step" type="button" data-op="plus" data-room="' + idx + '" data-field="adults">＋</button></div></div>';

        var childrenHtml = '';
        if (ACTIVE_MAX_CHILDREN > 0) {
          childrenHtml = '<div class="rg-ctrl"><div class="rg-ctrl-label">Children</div><div class="rg-steps"><button class="rg-step" type="button" data-op="minus" data-room="' + idx + '" data-field="children">−</button><span class="rg-count" id="count-children-' + idx + '">' + r.children + '</span><button class="rg-step" type="button" data-op="plus" data-room="' + idx + '" data-field="children">＋</button></div></div>';
        }

        room.innerHTML = '<div class="rg-title">Room ' + (idx + 1) + '</div>' + adultsHtml + childrenHtml + (idx > 0 ? '<button class="rg-link" data-remove="' + idx + '" type="button">Remove Room</button>' : '');

        roomsWrap.appendChild(room);
      });
    }

    function updateAddRoomState(){
      if (!addBtn) return;

      if (rooms.length >= ACTIVE_MAX_ROOMS) {
        addBtn.disabled = true;
        addBtn.style.opacity = "0.5";
        addBtn.style.cursor = "not-allowed";
      } else {
        addBtn.disabled = false;
        addBtn.style.opacity = "1";
        addBtn.style.cursor = "pointer";
      }
    }

    function enforceRoomsRules(){
      if (!addBtn || !roomsWrap || !roomsCountEl || !guestsCountEl) {
        return;
      }

      if (!rooms.length) {
        rooms = [{ adults: Math.min(2, ACTIVE_MAX_ADULTS), children: 0 }];
      }

      addBtn.style.display = "inline-block";

      renderRooms();
      refreshSummary();
      updateAddRoomState();
    }

    summary.addEventListener('click', function () {
      shell.classList.toggle('is-open');
      updateAddRoomState();
    });

    collapse.addEventListener('click',function(){ shell.classList.toggle('is-open'); });

    addBtn.addEventListener('click', function () {
      if (rooms.length >= ACTIVE_MAX_ROOMS) return;

      rooms.push({
        adults: Math.min(2, ACTIVE_MAX_ADULTS),
        children: 0
      });

      renderRooms();
      refreshSummary();
      updateAddRoomState();
    });

    roomsWrap.addEventListener('click',function(e){
      var t=e.target;
      if(t.matches('[data-remove]')){
        rooms.splice(+t.getAttribute('data-remove'),1);
        renderRooms();
        refreshSummary();
        updateAddRoomState();
        return;
      }

      if (t.matches('.rg-step')) {
        var idx = +t.dataset.room;
        var field = t.dataset.field;
        var op = t.dataset.op;

        var max = (field === "adults") ? ACTIVE_MAX_ADULTS : ACTIVE_MAX_CHILDREN;
        var min = (field === "adults") ? 1 : 0;

        var val = rooms[idx][field];

        if (op === "plus" && val < max) val++;
        if (op === "minus" && val > min) val--;

        rooms[idx][field] = val;

        var counter = q("#count-" + field + "-" + idx);
        if (counter) counter.textContent = val;

        refreshSummary();
      }
    });

    renderRooms();
    refreshSummary();

    radios.forEach(function(r,i){
      r.addEventListener('change',function(){
        pills.forEach(function(l){ l.classList.remove('is-active'); });
        if(r.checked) pills[i].classList.add('is-active');
        toggleDep();
        setTimeout(function(){ enforceRoomsRules(); }, 0);
      });
    });
    
    toggleDep();
    enforceRoomsRules();

    // ============================================================
    // DATES
    // ============================================================

    var checkin = q('#checkin_field');
    var checkout = q('#checkout_field');
    var ciWrap = q('#ci-wrap');
    var coWrap = q('#co-wrap');

    var today = new Date();
    var todayISO = toLocalISO(today);

    checkin.min = todayISO;
    checkin.value = todayISO;

    var plus1 = new Date(today); plus1.setDate(plus1.getDate() + 1);
    var plus3 = new Date(today); plus3.setDate(plus3.getDate() + 3);
    checkout.min = toLocalISO(plus1);
    checkout.value = toLocalISO(plus3);

    function openPicker(el){
      try{ if(el.showPicker) el.showPicker(); }catch(_){}
      el.focus({preventScroll:true});
    }
    
    ciWrap.addEventListener('click',function(){openPicker(checkin);});
    coWrap.addEventListener('click',function(){openPicker(checkout);});
    checkin.addEventListener('click',function(){openPicker(checkin);});
    checkout.addEventListener('click',function(){openPicker(checkout);});

    checkin.addEventListener("change",function(){
      var base = parseLocalDate(checkin.value) || parseLocalDate(todayISO);
      var minCo = new Date(base); minCo.setDate(minCo.getDate() + 1);
      var auto  = new Date(base); auto.setDate(auto.getDate() + 3);

      checkout.min = toLocalISO(minCo);

      var coCurrent = parseLocalDate(checkout.value);
      if(!checkout.value || !coCurrent || coCurrent <= base){
        checkout.value = toLocalISO(auto);
      }
    });

    // ============================================================
    // AIRPORTS DROPDOWN
    // ============================================================

    var AIRPORTS_URL='https://raw.githubusercontent.com/mwgg/Airports/master/airports.json';
    depContainer.classList.add('dep-suggest-wrap');
    var dropdown = document.createElement('div');
    dropdown.className='dep-suggest';
    depContainer.appendChild(dropdown);
    depInput.setAttribute('autocomplete','off');

    var airportsIndex=[];
    fetch(AIRPORTS_URL,{cache:'force-cache'})
      .then(function(r){ return r.json(); })
      .then(function(data){
        airportsIndex=Object.values(data)
          .filter(function(a){ return a && a.iata && a.iata.length===3 && a.name; })
          .map(function(a){ return { 
            iata:(a.iata||'').toUpperCase(), 
            name:a.name, 
            city:a.city||a.town||'', 
            country:a.country||'' 
          }; });
      }).catch(function(){});

    var hide=function(){ dropdown.style.display='none'; dropdown.innerHTML=''; };
    var show=function(){ dropdown.style.display='block'; };
    
    var dedupe=function(list){ 
      var s=new Set(), out=[]; 
      for(var i=0; i<list.length; i++){ 
        var a=list[i];
        if(s.has(a.iata)) continue; 
        s.add(a.iata); 
        out.push(a);
      } 
      return out; 
    };

    function searchAirports(qv){
      if(!qv || qv.trim().length===0){ hide(); return; }
      var Q=qv.trim().toUpperCase();
      var results=airportsIndex.filter(function(a){ return a.iata.startsWith(Q); });
      if(results.length<8){
        var more=airportsIndex.filter(function(a){
          return (a.name && a.name.toUpperCase().includes(Q)) ||
                 (a.city && a.city.toUpperCase().includes(Q));
        });
        results=dedupe(results.concat(more));
      }
      renderAirports(results.slice(0,8));
    }

    function renderAirports(items){
      dropdown.innerHTML='';
      if(!items || !items.length){ hide(); return; }
      items.forEach(function(a){
        var row=document.createElement('div'); row.className='dep-s-item';
        var name=document.createElement('div'); name.className='dep-s-name'; name.textContent=a.iata + " — " + a.name;
        var meta=document.createElement('div'); meta.className='dep-s-meta'; meta.textContent=[a.city,a.country].filter(Boolean).join(', ');
        row.appendChild(name); if(meta.textContent) row.appendChild(meta);
        row.addEventListener('click', function () {
          depInput.value=a.iata + " — " + a.name;
          if(depInput.dataset) depInput.dataset.iata=a.iata;
          hide();
        });
        dropdown.appendChild(row);
      });
      show();
    }

    var tt=null;
    depInput.addEventListener('input', function(){
      clearTimeout(tt);
      var v=depInput.value;
      tt=setTimeout(function(){ searchAirports(v); },90);
    });
    depInput.addEventListener('focus', function(){ if(dropdown.innerHTML.trim()) show(); });
    
    window.document.addEventListener('click', function (e) {
      var popupRoot = document.getElementById("brp-root");
      var inside = popupRoot && popupRoot.contains(e.target) && depContainer.contains(e.target);
      if(!inside) hide();
    });

    // ============================================================
    // MAIN BUTTON
    // ============================================================

    var btn = q("#brp-check-btn");
    btn.addEventListener("click", function(e){
      e.preventDefault();

      sessionStorage.removeItem("brp_no_rates_error");
      var errorBox = document.getElementById("brp-error");
      if (errorBox) {
        errorBox.style.display = "none";
      }

      var type = getType();

      var ci = checkin.value;
      var co = checkout.value;

      var required = [checkin, checkout];
      if(type === "Hotel + Flight") required.push(depInput);

      var ok = true;
      required.forEach(function(f){
        if(!f.value){
          f.style.borderColor="red";
          ok=false;
        }else{
          f.style.borderColor="rgba(0,0,0,.15)";
        }
      });
      if(!ok) return;

      var ciDate = parseLocalDate(ci);
      var coDate = parseLocalDate(co);
      var todayDate = parseLocalDate(todayISO);

      if(ciDate < todayDate){
        checkin.style.borderColor = "red";
        alert("Check-in date cannot be in the past.");
        return;
      }
      if(coDate <= ciDate){
        checkout.style.borderColor = "red";
        alert("Check-out date must be after check-in date.");
        return;
      }

      showLoadingLeadForm({
        bookingType: type,
        dateRangeLabel: formatRange(ci,co),
        checkIn: ci,
        checkOut: co,
        departure: (type==="Hotel + Flight") ? (depInput.value || "") : "",
        rooms: rooms
      });
    });

  } // END initBookingPopup

  // ============================================================
  // WAIT FOR POPUP TO APPEAR
  // ============================================================

  var waitForPopup = setInterval(function(){
    if (document.getElementById("brp-root")) {
      clearInterval(waitForPopup);
      initBookingPopup();
    }
  }, 50);

  // ============================================================
  // RESET HOOK
  // ============================================================

  window.__BRP_RESET__ = function () {
    var root = document.getElementById("brp-root");
    var tpl = window.__BRP_TEMPLATE_HTML__;
    if (!root || !tpl) return;

    root.innerHTML = tpl;

    var errorBox = document.getElementById("brp-error");
    if (errorBox) errorBox.style.display = "none";

    setTimeout(function () {
      try {
        initBookingPopup();
      } catch (e) {
        console.warn("Popup re-init failed", e);
      }
    }, 50);
  };

  // ============================================================
  // EXTERNAL CONTROL API
  // ============================================================

  window.BRJ = window.BRJ || {};

  window.BRJ.open = function () {
    if (window.elementorProFrontend && elementorProFrontend.modules && elementorProFrontend.modules.popup) {
      try {
        elementorProFrontend.modules.popup.showPopup({ id: 2991 });
        return;
      } catch (e) {}
    }

    var btn = document.querySelector('.book-now-global');
    if (btn) btn.click();
  };

  window.BRJ.injectBooking = function (data) {
    data = data || {};
    window.__BRP_PREFILL__ = data;
    window.BRJ.open();
  };

})();
