/* ============================================================
   BookResorts Universal Booking Widget v2.1 (Production)
   Complete - 821 Lines - Ready for Deployment
   ============================================================ */

(function () {

  if (window.__BOOKRESORTS_WIDGET_LOADED__) return;
  window.__BOOKRESORTS_WIDGET_LOADED__ = true;

  var script = document.currentScript;
  var CONFIG = {
    brand: (script && script.dataset && script.dataset.brand) || "default",
    mode: (script && script.dataset && script.dataset.mode) || "hotel",
    worker: (script && script.dataset && script.dataset.worker) || ""
  };

  var container = document.getElementById("booking-popup");
  if (!container) {
    container = document.createElement("div");
    container.id = "booking-popup";
    document.body.appendChild(container);
  }

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
    styleEl.textContent = ":root{--gold:#b89b47;--gold-d:#a48a3e;--ink:#2a2a2a;--muted:#6b6b6b;--input-h:46px;--radius:12px}#brp-root{font-family:'Lora',serif!important;color:var(--ink);width:100%;padding:32px 26px}.brp-title{text-align:center;color:var(--gold);font-weight:700;font-size:30px;letter-spacing:.04em;margin:4px 0 22px}.brp-pills{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin:0 0 20px}.brp-pill{display:flex;align-items:center;gap:10px;border:1px solid rgba(0,0,0,.15);border-radius:999px;padding:10px 18px;background:#fff;cursor:pointer;font-weight:700;user-select:none;transition:background .2s,color .2s,border-color .2s,transform .02s}.brp-pill input{appearance:none;width:16px;height:16px;border-radius:999px;border:2px solid var(--gold);display:inline-block}.brp-pill.is-active{background:var(--gold);color:#fff;border-color:var(--gold)}.brp-pill.is-active input{border-color:#fff}.brp-pill:active{transform:translateY(1px)}.brp-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}.brp-field{display:flex;flex-direction:column;gap:6px}.brp-label{font-size:13px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}.brp-input{height:var(--input-h);line-height:var(--input-h);border:1px solid rgba(0,0,0,.15);background:#fff;border-radius:var(--radius);padding:0 12px;font-size:16px;font-weight:500;transition:border-color .2s,box-shadow .2s}.brp-input:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(184,155,71,.18)}.brp-row{margin-bottom:14px}#ci-wrap,#co-wrap{cursor:pointer}#brp-root #departure_city_container.dep-suggest-wrap{position:relative}#brp-root .dep-suggest{position:absolute;top:100%;left:0;right:0;z-index:1000;background:#fff!important;color:#2a2a2a;border:1px solid rgba(0,0,0,.15);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.12);margin-top:6px;max-height:280px;overflow:auto;display:none}#brp-root .dep-s-item{padding:10px 12px;cursor:pointer;display:flex;flex-direction:column;gap:2px}#brp-root .dep-s-item:hover{background:#f6f6f6}#brp-root .dep-s-name{font-weight:700}#brp-root .dep-s-meta{font-size:12px;color:#666}.datalist-note{font-size:12px;color:var(--muted);margin-top:4px}.rg-inline{border:1px solid rgba(0,0,0,.15);border-radius:var(--radius);background:#fff;margin-bottom:14px}.rg-summary{display:flex;align-items:center;justify-content:space-between;padding:0 12px;height:var(--input-h);cursor:pointer;gap:10px}.rg-badges{display:flex;gap:12px;align-items:center}.rg-badge{display:flex;align-items:center;gap:6px}.rg-badge .num{font-weight:700;font-size:18px}.rg-caret{margin-left:auto;display:flex;align-items:center;transition:transform .2s}.rg-inline.is-open .rg-caret{transform:rotate(180deg)}.rg-panel{display:none;border-top:1px solid rgba(0,0,0,.12);padding:12px}.rg-inline.is-open .rg-panel{display:block}.rg-room{padding:12px;border:1px solid rgba(0,0,0,.08);border-radius:10px;margin-bottom:10px;background:#fafafa}.rg-room:last-child{margin-bottom:0}.rg-title{font-weight:700;margin-bottom:8px}.rg-ctrl{display:flex;align-items:center;justify-content:space-between;margin:8px 0}.rg-ctrl-label{font-size:16px}.rg-steps{display:flex;align-items:center;gap:12px}.rg-step{width:36px;height:36px;border:1px solid rgba(0,0,0,.25);border-radius:999px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer}.rg-count{min-width:16px;text-align:center}.rg-actions{display:flex;justify-content:space-between;align-items:center;margin-top:10px}.rg-add{background:none;border:none;color:#1a3d5c;font-weight:700;cursor:pointer}.rg-room button[data-remove]{background:none;border:none;color:#b33;font-weight:700;cursor:pointer;font-size:15px;margin-top:8px}#rg-collapse.rg-link{background:#1a73e8;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-weight:700;cursor:pointer;font-size:15px;transition:background .2s,transform .02s}#rg-collapse.rg-link:hover{background:#1557b0}#rg-collapse.rg-link:active{transform:translateY(1px)}.check-availability-btn{width:100%;height:var(--input-h);line-height:var(--input-h);background:var(--gold);color:#fff;font-weight:800;font-size:17px;border:none;border-radius:var(--radius);cursor:pointer;transition:background .2s,transform .02s}.check-availability-btn:hover{background:var(--gold-d)}.check-availability-btn:active{transform:translateY(1px)}.brp-points{display:flex;justify-content:center;gap:24px;align-items:center;margin-top:14px;flex-wrap:wrap;font-size:15px}.brp-dot{width:8px;height:8px;background:var(--gold);border-radius:999px;display:inline-block;margin-right:8px;vertical-align:middle}#brp-root .autocomplete-suggestions,#brp-root .autocomplete-panel,#brp-root .awesomplete,#brp-root .ui-autocomplete,#brp-root #airport_suggestions{display:none!important}@media(max-width:640px){.brp-grid{grid-template-columns:1fr}.brp-title{font-size:26px}.check-availability-btn{font-size:16px}}.brp-lead-wrap{width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:10px 0 6px}.brp-spinner{width:54px;height:54px;border-radius:999px;border:5px solid rgba(0,0,0,.12);border-top-color:var(--gold);animation:brpSpin 1s linear infinite}@keyframes brpSpin{to{transform:rotate(360deg)}}.brp-rotator{font-weight:800;font-size:18px;color:var(--ink);text-align:center;min-height:28px}.brp-lead-title{text-align:center;font-weight:700;font-size:16px;color:var(--muted);margin-top:2px;max-width:520px}.brp-lead-form{width:100%;max-width:420px;display:flex;flex-direction:column;gap:12px;margin-top:6px}.brp-lead-form .brp-input{width:100%}.brp-lead-submit{width:100%;height:var(--input-h);line-height:var(--input-h);background:var(--gold);color:#fff;font-weight:800;font-size:16px;border:none;border-radius:var(--radius);cursor:pointer;transition:background .2s,transform .02s}.brp-lead-submit:hover{background:var(--gold-d)}.brp-lead-submit:active{transform:translateY(1px)}.brp-lead-note{text-align:center;font-size:12px;color:var(--muted);margin-top:2px}.brp-success{text-align:center;font-weight:800;font-size:20px;color:var(--ink);margin-top:6px}.brp-success-sub{text-align:center;font-weight:700;font-size:14px;color:var(--muted);max-width:520px}";
    document.head.appendChild(styleEl);
  }

  // ============================================================
  // HTML INJECTION (Minimal - will be replaced on prefill)
  // ============================================================

  container.innerHTML = '<div id="brp-root"><div class="brp-lead-wrap"><div class="brp-spinner"></div><div class="brp-rotator">Loading...</div></div></div>';

  if (!window.__BRP_TEMPLATE_HTML__) {
    window.__BRP_TEMPLATE_HTML__ = '<div class="brp-title">BOOK YOUR GETAWAY</div>';
  }

  // ============================================================
  // GLOBAL HOTEL CONFIG
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

    return (document.title || "").split("|")[0].split("–")[0].split("-")[0].trim();
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
        console.error("❌ Hotel config not found for:", siteTitle);
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

          if (hasExpedia && hasHotels) return normalized;
          if (n === maxAttempts && normalized.length > 0) return normalized;

          if (n < maxAttempts) {
            return new Promise(function(resolve){ 
              setTimeout(function(){ resolve(attempt(n + 1)); }, delayMs); 
            });
          }
          return [];
        })
        .catch(function(err){
          console.warn("Worker attempt " + n + " failed", err);
          if (n < maxAttempts) {
            return new Promise(function(resolve){ 
              setTimeout(function(){ resolve(attempt(n + 1)); }, delayMs); 
            });
          }
          return [];
        });
    }
    return attempt(1);
  }

  function normalizeComparisonResults(raw){
    if(!raw || !raw.comparison || !raw.comparison[0]) return [];

    var PRIORITY = ["Expedia.com", "Hotels.com"];
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
            vendors.push({ vendor: vendor, nightly: price, total: total });
          }
        }
      });
    });

    var ordered = [];
    PRIORITY.forEach(function(p){
      var match = vendors.find(function(v){ return v.vendor.toLowerCase() === p.toLowerCase(); });
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

    function fmt(n) { return n.toLocaleString("en-US"); }

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
      html += '</div><div style="display:flex;justify-content:space-between;align-items:center;">';
      html += '<div><div style="font-size:14px;color:#555;">' + ourRate.nightly + ' / night</div>';
      html += '<div style="font-size:13px;color:#1f7a3f;font-weight:800;">You save ' + ourRate.savings + '</div></div>';
      html += '<div style="text-align:right;"><div style="font-size:26px;font-weight:900;">' + ourRate.total + '</div>';
      html += '<div style="font-size:12px;color:#666;">total</div></div></div>';
      html += '<div style="margin-top:12px;font-size:13px;color:#555;">✔ No hidden fees &nbsp; ✔ Dedicated resort specialist</div></div>';
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

    html += '<div style="margin-top:18px;text-align:center;font-size:14px;color:#444;">';
    html += '<div style="font-size:15px;color:#444;">A ' + hotelName + ' specialist will be reaching out to you soon.</div>';
    html += '<div id="phone-confirmation-area" style="margin-top:12px;text-align:center;">';
    html += '<div id="confirm-phone-display" style="font-size:16px;margin-bottom:6px;">📞 <b>' + phone + '</b></div>';
    html += '<div style="font-size:14px;color:#555;">Is this the best number to reach you?</div>';
    html += '<div style="margin-top:10px;display:flex;gap:10px;justify-content:center;">';
    html += '<button id="phone-yes-btn" style="padding:8px 16px;border-radius:8px;border:none;background:#1f7a3f;color:#fff;font-weight:700;cursor:pointer;">Yes</button>';
    html += '<button id="phone-edit-btn" style="padding:8px 16px;border-radius:8px;border:1px solid #ccc;background:#fff;font-weight:700;cursor:pointer;">Update Number</button>';
    html += '</div><div id="phone-edit-wrap" style="display:none;margin-top:14px;">';
    html += '<div style="display:flex;gap:8px;justify-content:center;">';
    html += '<select id="confirm-country-code" class="brp-input" style="width:110px;text-overflow:ellipsis;"></select>';
    html += '<input id="phone-edit-input" type="tel" inputmode="tel" class="brp-input" placeholder="(555) 555-5555" style="max-width:220px;"></div>';
    html += '<div style="margin-top:10px;text-align:center;">';
    html += '<button id="phone-save-btn" style="padding:8px 18px;border-radius:8px;border:none;background:#1a73e8;color:#fff;font-weight:800;cursor:pointer;">Save</button>';
    html += '</div></div></div></div>';
    html += '<div style="margin-top:14px;text-align:center;">';
    html += '<div style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:#fff6d6;border:1px solid #f1d48a;border-radius:999px;font-size:13px;font-weight:600;color:#8a6d1d;">';
    html += '⏱ Average wait time: <b>Less than 1 min</b></div></div></div></div>';

    return html;
  }

  // ============================================================
  // ROTATING PHRASES
  // ============================================================

  var ROTATE_PHRASES = [
    "Best Rates Guaranteed",
    "30+ Years of Experience",
    "24/7 Guest Support"
  ];
  var rotateTimer = null;

  // ============================================================
  // SHOW LEAD FORM (KEY FUNCTION)
  // ============================================================

  function showLoadingLeadForm(payload){
    console.log("🔵 showLoadingLeadForm called");

    var LOCKED_BOOKING = {
      bookingType: payload.bookingType,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      departure: payload.departure || "",
      rooms: JSON.parse(JSON.stringify(payload.rooms || []))
    };

    container.dataset.pendingBooking = JSON.stringify(LOCKED_BOOKING);

    var popupRoot = document.getElementById("brp-root");
    if (!popupRoot) {
      console.error("❌ brp-root not found");
      return;
    }

    console.log("✅ Rendering lead form");

    popupRoot.innerHTML = '<div class="brp-lead-wrap"><div class="brp-spinner"></div><div class="brp-rotator" id="brp-rotator">' + ROTATE_PHRASES[0] + '</div><div class="brp-lead-title">Please enter your information to receive your exclusive offers</div><form class="brp-lead-form" id="brp-lead-form" autocomplete="on"><div class="brp-field"><div class="brp-label">Name</div><input class="brp-input" id="brp-lead-name" name="name" type="text" placeholder="Your name" required></div><div class="brp-field"><div class="brp-label">Phone Number</div><div style="display:flex;gap:8px;"><select id="brp-country-code" class="brp-input" style="width:110px;"></select><input class="brp-input" id="brp-lead-phone" name="phone" type="tel" inputmode="tel" placeholder="(555) 555-5555" required style="flex:1;"></div></div><button class="brp-lead-submit" id="brp-lead-submit" type="submit">Continue</button><div class="brp-lead-note">No spam — just your best available offers.</div></form></div>';

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
      var others = COUNTRIES.filter(function(c){ return !c.label.includes("United States"); }).sort(function(a,b){ return a.label.localeCompare(b.label); });
      var SORTED = us ? [us].concat(others) : others;

      countrySelect.innerHTML = SORTED.map(function(c){
        return '<option value="' + c.code + '" data-full="' + c.label + ' ' + c.code + '" data-short="' + c.label.split(' ')[0] + ' ' + c.code + '">' + c.label + ' ' + c.code + '</option>';
      }).join("");

      countrySelect.value = "+1";

      function updateCountryText() {
        var opt = countrySelect.options[countrySelect.selectedIndex];
        if (!opt) return;
        for(var j=0; j<countrySelect.options.length; j++){
          var o = countrySelect.options[j];
          if (o.dataset && o.dataset.full) o.text = o.dataset.full;
        }
        opt.text = opt.dataset.short;
      }

      updateCountryText();
      countrySelect.addEventListener("change", updateCountryText);

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

      if(!name){ alert("Please enter your name."); return; }

      var digits = phone.replace(/\D/g,'');
      if(digits.length < 10){ alert("Please enter a valid phone number."); return; }

      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";

      var lockedBooking = JSON.parse(container.dataset.pendingBooking || "{}");
      var bookingType = lockedBooking.bookingType;

      // HOTEL + FLIGHT (NO PRICING)
      if (bookingType === "Hotel + Flight") {
        var roomsConfig = lockedBooking.rooms.map(function (r, i) {
          var line = "Room " + (i + 1) + ": " + r.adults + " Adult" + (r.adults > 1 ? "s" : "");
          if (r.children && r.children > 0) line += ", " + r.children + " Child" + (r.children > 1 ? "ren" : "");
          return line;
        }).join(" • ");

        setTimeout(function () {
          var payload = {
            name: name, phone: phone, booking_type: "Hotel + Flight",
            hotel_name: getWordPressSiteTitle(),
            departure_city: lockedBooking.departure || "",
            check_in: lockedBooking.checkIn, check_out: lockedBooking.checkOut,
            rooms_config: roomsConfig, sent_at: new Date().toISOString()
          };

          var blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });

          if (!window.__BRP_ZAPIER_SENT__) {
            window.__BRP_ZAPIER_SENT__ = true;
            navigator.sendBeacon("https://hooks.zapier.com/hooks/catch/3129081/uw4v30l/", blob);
          }
        }, 0);

        var popupRoot = document.getElementById("brp-root");
        if (!popupRoot) return;

        popupRoot.innerHTML = '<div class="brp-lead-wrap"><div class="brp-success">You\'re all set, ' + name + '.</div><div class="brp-success-sub">A ' + getWordPressSiteTitle() + ' specialist will be reaching out shortly.</div></div>';

        return;
      }

      // HOTEL ONLY (WITH PRICING)
      if (!lockedBooking.checkIn || !lockedBooking.checkOut) {
        console.error("Booking data missing");
        return;
      }

      var totals = getTotalsFromRooms(lockedBooking.rooms);
      var adults = totals.adults;
      var roomsCt = totals.rooms;

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
          alert("Sorry, no rates found. Please try different dates.");
          return;
        }

        var resultsRoot = document.getElementById("brp-root");
        if (!resultsRoot) return;

        resultsRoot.innerHTML = '<div class="brp-lead-wrap"><div class="brp-success">Well done, ' + name + ' — you\'re officially getting the best deal.</div>' + renderComparisonResults(results, name, phone) + '</div>';

        var roomsConfig = lockedBooking.rooms.map(function (r, i) {
          var line = "Room " + (i + 1) + ": " + r.adults + " Adult" + (r.adults === 1 ? "" : "s");
          if (r.children && r.children > 0) line += ", " + r.children + " Child" + (r.children === 1 ? "" : "ren");
          return line;
        }).join(" • ");

        var expedia = results.find(function(r){ return r.vendor === "Expedia.com"; }) || {};
        var hotels  = results.find(function(r){ return r.vendor === "Hotels.com"; }) || {};
        var ourRate = calculateOurRate(results) || {};

        setTimeout(function () {
          var payload = {
            name: name, phone: phone,
            hotel_name: getWordPressSiteTitle(),
            check_in: lockedBooking.checkIn, check_out: lockedBooking.checkOut,
            rooms_config: roomsConfig,
            bookresorts_total: ourRate.total || "",
            expedia_total: expedia.total || "",
            hotels_total: hotels.total || "",
            sent_at: new Date().toISOString()
          };

          var blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
          navigator.sendBeacon("https://hooks.zapier.com/hooks/catch/3129081/uw4v30l/", blob);
        }, 0);

        setTimeout(function () { setupPhoneConfirmation(phone, lockedBooking); }, 0);
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
      { code: "+44", label: "🇬🇧 United Kingdom" }
    ];

    countrySelect.innerHTML = COUNTRIES.map(function(c){
      return '<option value="' + c.code + '">' + c.label + ' ' + c.code + '</option>';
    }).join("");

    countrySelect.value = "+1";

    if (editBtn && editWrap) {
      editBtn.onclick = function(){ editWrap.style.display = "block"; input.focus(); };
    }

    if (yesBtn) {
      yesBtn.onclick = function(){
        confirmArea.innerHTML = '<div style="font-size:15px;font-weight:700;color:#1f7a3f;">Thanks! Our team will connect with you shortly.</div>';
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
            event: "phone_updated", name: container.dataset.leadName || "", phone: fullPhone,
            booking_type: lockedBooking.bookingType || "Hotel Only",
            hotel_name: getWordPressSiteTitle(),
            departure_city: lockedBooking.departure || "",
            check_in: lockedBooking.checkIn, check_out: lockedBooking.checkOut,
            rooms_config: "", sent_at: new Date().toISOString()
          };
          var blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
          navigator.sendBeacon("https://hooks.zapier.com/hooks/catch/3129081/uw4v30l/", blob);
        }, 0);
      };
    }
  }

  // ============================================================
  // WAIT FOR POPUP + CHECK FOR PREFILL
  // ============================================================

  var checkCount = 0;
  var waitForPopup = setInterval(function(){
    checkCount++;
    
    if (document.getElementById("brp-root")) {
      clearInterval(waitForPopup);
      console.log("🟢 Popup root found");

      if (window.__BRP_PREFILL__) {
        console.log("🟢 Prefill detected:", window.__BRP_PREFILL__);
        
        var data = window.__BRP_PREFILL__;
        window.__BRP_PREFILL__ = null;

        showLoadingLeadForm({
          bookingType: data.bookingType || "Hotel Only",
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          departure: data.departure || "",
          rooms: data.rooms || [{ adults: 2, children: 0 }]
        });
      } else {
        console.log("🔵 No prefill data");
      }
    }

    if (checkCount > 100) {
      clearInterval(waitForPopup);
      console.error("❌ Timeout: Popup never appeared");
    }
  }, 50);

  // ============================================================
  // EXTERNAL API
  // ============================================================

  window.BRJ = window.BRJ || {};

  window.BRJ.open = function () {
    console.log("🔵 BRJ.open() called");
    
    if (window.elementorProFrontend && elementorProFrontend.modules && elementorProFrontend.modules.popup) {
      try {
        elementorProFrontend.modules.popup.showPopup({ id: 2991 });
        return;
      } catch (e) {
        console.warn("Elementor popup failed");
      }
    }

    var btn = document.querySelector('.book-now-global');
    if (btn) {
      console.log("✅ Clicking book-now button");
      btn.click();
    } else {
      console.error("❌ No .book-now-global button found");
    }
  };

  window.BRJ.injectBooking = function (data) {
    data = data || {};
    console.log("🔵 BRJ.injectBooking() called");
    window.__BRP_PREFILL__ = data;
    window.BRJ.open();
  };

})();
