<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BookResorts Booking Widget</title>
  
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700;800&display=swap" rel="stylesheet">

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --gold: #b89b47;
      --gold-d: #a48a3e;
      --ink: #2a2a2a;
      --muted: #6b6b6b;
      --input-h: 46px;
      --radius: 12px;
    }

    body {
      font-family: 'Lora', serif;
      color: var(--ink);
      background: transparent;
      overflow-x: hidden;
    }

    #booking-popup {
      font-family: 'Lora', serif !important;
      color: var(--ink);
      width: 100%;
      padding: 32px 26px;
      max-width: 680px;
      margin: 0 auto;
    }

    .brp-title {
      text-align: center;
      color: var(--gold);
      font-weight: 700;
      font-size: 30px;
      letter-spacing: .04em;
      margin: 4px 0 22px;
    }

    /* Pills */
    .brp-pills {
      display: flex;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
      margin: 0 0 20px;
    }

    .brp-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid rgba(0, 0, 0, .15);
      border-radius: 999px;
      padding: 10px 18px;
      background: #fff;
      cursor: pointer;
      font-weight: 700;
      user-select: none;
      transition: background .2s, color .2s, border-color .2s, transform .02s;
    }

    .brp-pill input {
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 999px;
      border: 2px solid var(--gold);
      display: inline-block;
    }

    .brp-pill.is-active {
      background: var(--gold);
      color: #fff;
      border-color: var(--gold);
    }

    .brp-pill.is-active input {
      border-color: #fff;
    }

    .brp-pill:active {
      transform: translateY(1px)
    }

    /* Grid */
    .brp-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 16px;
    }

    .brp-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .brp-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: .08em
    }

    /* Inputs */
    .brp-input {
      height: var(--input-h);
      line-height: var(--input-h);
      border: 1px solid rgba(0, 0, 0, .15);
      background: #fff;
      border-radius: var(--radius);
      padding: 0 12px;
      font-size: 16px;
      font-weight: 500;
      transition: border-color .2s, box-shadow .2s;
    }

    .brp-input:focus {
      outline: none;
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(184, 155, 71, .18)
    }

    .brp-row {
      margin-bottom: 14px;
    }

    #ci-wrap,
    #co-wrap {
      cursor: pointer;
    }

    #booking-popup #departure_city_container.dep-suggest-wrap {
      position: relative;
    }

    #booking-popup .dep-suggest {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      background: #fff !important;
      color: #2a2a2a;
      border: 1px solid rgba(0, 0, 0, .15);
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, .12);
      margin-top: 6px;
      max-height: 280px;
      overflow: auto;
      display: none;
    }

    #booking-popup .dep-s-item {
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    #booking-popup .dep-s-item:hover {
      background: #f6f6f6;
    }

    #booking-popup .dep-s-name {
      font-weight: 700;
    }

    #booking-popup .dep-s-meta {
      font-size: 12px;
      color: #666;
    }

    .datalist-note {
      font-size: 12px;
      color: var(--muted);
      margin-top: 4px
    }

    /* Inline Rooms & Guests */
    .rg-inline {
      border: 1px solid rgba(0, 0, 0, .15);
      border-radius: var(--radius);
      background: #fff;
      margin-bottom: 14px;
    }

    .rg-summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      height: var(--input-h);
      cursor: pointer;
      gap: 10px;
    }

    .rg-badges {
      display: flex;
      gap: 12px;
      align-items: center
    }

    .rg-badge {
      display: flex;
      align-items: center;
      gap: 6px
    }

    .rg-badge .num {
      font-weight: 700;
      font-size: 18px
    }

    .rg-caret {
      margin-left: auto;
      display: flex;
      align-items: center;
      transition: transform .2s
    }

    .rg-inline.is-open .rg-caret {
      transform: rotate(180deg)
    }

    .rg-panel {
      display: none;
      border-top: 1px solid rgba(0, 0, 0, .12);
      padding: 12px;
    }

    .rg-inline.is-open .rg-panel {
      display: block
    }

    .rg-room {
      padding: 12px;
      border: 1px solid rgba(0, 0, 0, .08);
      border-radius: 10px;
      margin-bottom: 10px;
      background: #fafafa
    }

    .rg-room:last-child {
      margin-bottom: 0
    }

    .rg-title {
      font-weight: 700;
      margin-bottom: 8px
    }

    .rg-ctrl {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 8px 0
    }

    .rg-ctrl-label {
      font-size: 16px
    }

    .rg-steps {
      display: flex;
      align-items: center;
      gap: 12px
    }

    .rg-step {
      width: 36px;
      height: 36px;
      border: 1px solid rgba(0, 0, 0, .25);
      border-radius: 999px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
    }

    .rg-count {
      min-width: 16px;
      text-align: center
    }

    .rg-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px
    }

    .rg-add {
      background: none;
      border: none;
      color: #1a3d5c;
      font-weight: 700;
      cursor: pointer
    }

    .rg-room button[data-remove] {
      background: none;
      border: none;
      color: #b33;
      font-weight: 700;
      cursor: pointer;
      font-size: 15px;
      margin-top: 8px
    }

    #rg-collapse.rg-link {
      background: #1a73e8;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-weight: 700;
      cursor: pointer;
      font-size: 15px;
      transition: background .2s, transform .02s;
    }

    #rg-collapse.rg-link:hover {
      background: #1557b0;
    }

    #rg-collapse.rg-link:active {
      transform: translateY(1px)
    }

    /* CTA & callouts */
    .check-availability-btn {
      width: 100%;
      height: var(--input-h);
      line-height: var(--input-h);
      background: var(--gold);
      color: #fff;
      font-weight: 800;
      font-size: 17px;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      transition: background .2s, transform .02s;
    }

    .check-availability-btn:hover {
      background: var(--gold-d)
    }

    .check-availability-btn:active {
      transform: translateY(1px)
    }

    .brp-points {
      display: flex;
      justify-content: center;
      gap: 24px;
      align-items: center;
      margin-top: 14px;
      flex-wrap: wrap;
      font-size: 15px;
    }

    .brp-dot {
      width: 8px;
      height: 8px;
      background: var(--gold);
      border-radius: 999px;
      display: inline-block;
      margin-right: 8px;
      vertical-align: middle
    }

    #booking-popup .autocomplete-suggestions,
    #booking-popup .autocomplete-panel,
    #booking-popup .awesomplete,
    #booking-popup .ui-autocomplete,
    #booking-popup #airport_suggestions {
      display: none !important;
    }

    @media(max-width:640px) {
      .brp-grid {
        grid-template-columns: 1fr
      }

      .brp-title {
        font-size: 26px
      }

      .check-availability-btn {
        font-size: 16px
      }
    }

    /* Loading + Lead Form */
    .brp-lead-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 10px 0 6px;
    }

    .brp-spinner {
      width: 54px;
      height: 54px;
      border-radius: 999px;
      border: 5px solid rgba(0, 0, 0, .12);
      border-top-color: var(--gold);
      animation: brpSpin 1s linear infinite;
    }

    @keyframes brpSpin {
      to {
        transform: rotate(360deg);
      }
    }

    .brp-rotator {
      font-weight: 800;
      font-size: 18px;
      color: var(--ink);
      text-align: center;
      min-height: 28px;
    }

    .brp-lead-title {
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      color: var(--muted);
      margin-top: 2px;
      max-width: 520px;
    }

    .brp-lead-form {
      width: 100%;
      max-width: 420px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 6px;
    }

    .brp-lead-form .brp-input {
      width: 100%;
    }

    .brp-lead-submit {
      width: 100%;
      height: var(--input-h);
      line-height: var(--input-h);
      background: var(--gold);
      color: #fff;
      font-weight: 800;
      font-size: 16px;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      transition: background .2s, transform .02s;
    }

    .brp-lead-submit:hover {
      background: var(--gold-d);
    }

    .brp-lead-submit:active {
      transform: translateY(1px);
    }

    .brp-lead-note {
      text-align: center;
      font-size: 12px;
      color: var(--muted);
      margin-top: 2px;
    }

    .brp-success {
      text-align: center;
      font-weight: 800;
      font-size: 20px;
      color: var(--ink);
      margin-top: 6px;
    }

    .brp-success-sub {
      text-align: center;
      font-weight: 700;
      font-size: 14px;
      color: var(--muted);
      max-width: 520px;
    }

    /* Error Box */
    #brp-error {
      display: none;
      margin: 16px auto 8px;
      max-width: 420px;
      padding: 10px 14px;
      border-radius: 8px;
      background: #fff3f3;
      border: 1px solid #f0c2c2;
      color: #8f2d2d;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      position: relative;
      box-sizing: border-box;
    }
  </style>
</head>
<body>

<div id="brp-error">
  <span>Whoops! We didn't find availability on your selected dates.</span>
</div>

<div id="booking-popup">
  <h3 class="brp-title">BOOK YOUR GETAWAY</h3>

  <!-- Booking Type -->
  <div class="brp-pills">
    <label class="brp-pill is-active">
      <input type="radio" name="booking_type" value="Hotel Only" checked required> Hotel Only
    </label>
    <label class="brp-pill">
      <input type="radio" name="booking_type" value="Hotel + Flight" required> Hotel + Flight
    </label>
  </div>

  <!-- Dates -->
  <div class="brp-grid">
    <div class="brp-field" id="ci-wrap">
      <div class="brp-label">Check In</div>
      <input id="checkin_field" type="date" required class="brp-input">
    </div>
    <div class="brp-field" id="co-wrap">
      <div class="brp-label">Check Out</div>
      <input id="checkout_field" type="date" required class="brp-input">
    </div>
  </div>

  <!-- Departure City -->
  <div id="departure_city_container" class="brp-field" style="display:none;">
    <div class="brp-label">Departure City</div>
    <input id="departure_city_field" type="text" placeholder="Type city or IATA (e.g., LAX, JFK, MIA)" class="brp-input" autocomplete="off">
    <div class="datalist-note"></div>
  </div>

  <!-- Rooms & Guests -->
  <div class="brp-field">
    <div class="brp-label">Rooms & Guests</div>
    <div class="rg-inline" id="rg-inline">
      <div class="rg-summary" id="rg-summary">
        <div class="rg-badges">
          <span class="rg-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="10" width="18" height="8" rx="1.5"></rect><path d="M7 10V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3"></path></svg>
            <span id="rg-rooms-count" class="num">1</span>
          </span>
          <span class="rg-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"></path><path d="M4 20a8 8 0 0 1 16 0"></path></svg>
            <span id="rg-guests-count" class="num">2</span>
          </span>
        </div>
        <span class="rg-caret" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
      </div>

      <div class="rg-panel" id="rg-panel">
        <div id="rg-rooms"></div>
        <div class="rg-actions">
          <button id="rg-add" class="rg-add" type="button">＋ Add Room</button>
          <button id="rg-collapse" class="rg-link" type="button">Done</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Submit -->
  <button class="check-availability-btn" id="brp-check-btn">Check Availability</button>

  <!-- Callouts -->
  <div class="brp-points">
    <span><i class="brp-dot"></i><b>Lowest Price Guaranteed</b></span>
    <span><i class="brp-dot"></i><b>Complimentary Perks & Upgrades</b></span>
  </div>
</div>

<script>

// CRITICAL FIX: Define openBookingWidget globally
window.openBookingWidget = function() {
  console.log('✅ openBookingWidget called');
  
  const root = document.getElementById('booking-popup');
  if (!root) {
    console.error('❌ booking-popup element not found');
    return;
  }

  // Reset any error states
  sessionStorage.removeItem("brp_no_rates_error");
  const errorBox = document.getElementById("brp-error");
  if (errorBox) {
    errorBox.style.display = "none";
  }

  // If popup already has content, reinit it
  if (window.__BRP_RESET__) {
    window.__BRP_RESET__();
  }

  // Trigger the init
  if (typeof initBookingPopup === 'function') {
    initBookingPopup();
  }
};

// Make BRJ globally accessible
window.BRJ = {
  open: window.openBookingWidget
};
    
(function(){

// ========================================
// WAIT FOR DOM TO BE FULLY READY
// ========================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}

function initWidget() {

// ========================================
// CORE VARIABLES
// ========================================

let __BRP_TEMPLATE_HTML__ = null;
let ACTIVE_HOTEL_ID = null;
let ACTIVE_MAX_ADULTS = 2;
let ACTIVE_MAX_CHILDREN = 0;
let ACTIVE_MAX_ROOMS = 1;

const ROTATE_PHRASES = [
  "Best Rates Guaranteed",
  "30+ Years of Experience",
  "24/7 Guest Support"
];

const VENDOR_LOGOS = {
  "BookResorts": "https://img-cdn-prod.travelapi.ai/68e5a3b8124af727db1c6ea9-logo-mobile.png",
  "Expedia.com": "https://www.expedia.com/favicon.ico",
  "Hotels.com": "https://www.hotels.com/favicon.ico"
};

const COUNTRIES = [
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

let rotateTimer = null;

// ========================================
// HELPER FUNCTIONS
// ========================================

function toLocalISO(date){
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}

function parseLocalDate(str){
  if(!str) return null;
  const [y,m,d] = str.split('-').map(Number);
  return new Date(y, m-1, d);
}

function getWordPressSiteTitle() {
  const ogSite = document.querySelector('meta[property="og:site_name"]');
  if (ogSite?.content) return ogSite.content.trim();
  if (window._wpSiteName) return window._wpSiteName.trim();
  const headerTitle = document.querySelector('.site-title, .logo-text, header h1');
  if (headerTitle?.textContent) return headerTitle.textContent.trim();
  return (document.title || "").split("|")[0].split("–")[0].split("-")[0].trim();
}

async function getHotelIdFromSheet(siteTitle) {
  const SHEET_ID = "1_RQTyhOsvhlRLQV7xPJ4Jdukd9umtUYEKRhAoJmr2NA";
  const SHEET_NAME = "Hotel Info";

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(SHEET_NAME)}&tq=${encodeURIComponent("SELECT A, B, C, D, E")}`;

  const res = await fetch(url);
  const text = await res.text();
  const json = JSON.parse(text.substring(47).slice(0, -2));
  const rows = json.table.rows || [];
  const target = siteTitle.toLowerCase();

  for (const row of rows) {
    const hotelName = row.c[0]?.v;
    const hotelId   = row.c[1]?.v;
    if (!hotelName || !hotelId) continue;

    if (target.includes(hotelName.toLowerCase())) {
      return {
        hotelId: String(hotelId),
        maxAdults: Number(row.c[2]?.v || 2),
        maxChildren: Number(row.c[3]?.v || 0),
        maxRooms: Number(row.c[4]?.v || 1)
      };
    }
  }

  return null;
}

async function fetchWithRetry(url, maxAttempts = 3, delayMs = 500) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const normalized = normalizeComparisonResults(data);

      const hasExpedia = normalized.some(r => r.vendor === "Expedia.com");
      const hasHotels  = normalized.some(r => r.vendor === "Hotels.com");

      if (hasExpedia && hasHotels) {
        return normalized;
      }

      if (attempt === maxAttempts && normalized.length > 0) {
        return normalized;
      }

    } catch (err) {
      console.warn(`Worker attempt ${attempt} failed`, err);
    }

    if (attempt < maxAttempts) {
      await new Promise(r => setTimeout(r, delayMs));
    }
  }

  return [];
}

function normalizeComparisonResults(raw){
  if(!raw || !raw.comparison || !raw.comparison[0]) return [];

  const PRIORITY = ["Expedia.com", "Hotels.com"];
  const rows = raw.comparison[0];
  let vendors = [];

  rows.forEach(obj=>{
    Object.keys(obj).forEach(key=>{
      if(key.startsWith("vendor") && obj[key]){
        const idx = key.replace("vendor","");
        const vendor = obj[key];
        const price = obj["price"+idx];
        const total = obj["Totalprice"+idx];

        if(price && total){
          vendors.push({ vendor, nightly: price, total });
        }
      }
    });
  });

  const ordered = [];
  PRIORITY.forEach(p=>{
    const match = vendors.find(v => v.vendor.toLowerCase() === p.toLowerCase());
    if(match) ordered.push(match);
  });

  return ordered.slice(0,4);
}

function calculateOurRate(results, discountPct = 2.5) {
  if (!results || !results.length) return null;

  const eligible = results.filter(r => ["Expedia.com", "Hotels.com"].includes(r.vendor));
  if (!eligible.length) return null;

  const parseMoney = v => Number(v.replace(/[^0-9.]/g, ""));
  const cheapest = eligible.reduce((a, b) => parseMoney(a.total) <= parseMoney(b.total) ? a : b);

  const baseTotal = parseMoney(cheapest.total);
  const baseNight = parseMoney(cheapest.nightly);

  const discountedTotal = baseTotal * (1 - discountPct / 100);
  const discountedNight = baseNight * (1 - discountPct / 100);
  const savings = baseTotal - discountedTotal;

  const fmt = n => n.toLocaleString("en-US");

  return {
    vendor: "BookResorts",
    nightly: `$${fmt(Math.round(discountedNight))}`,
    total: `$${fmt(Math.round(discountedTotal))}`,
    savings: `$${fmt(Math.round(savings))}`,
    source: cheapest.vendor
  };
}

function getTotalsFromRooms(rooms = []) {
  return {
    adults: rooms.reduce((sum, r) => sum + (r.adults || 0), 0),
    rooms: rooms.length
  };
}

// ========================================
// RENDER COMPARISON UI
// ========================================

function renderComparisonResults(results, name, phone){
  const ourRate = calculateOurRate(results);
  const hotelName = getWordPressSiteTitle();

  return `
    <div style="width:100%;max-width:600px;">

      ${ourRate ? `
      <div style="border:2px solid #b89b47;border-radius:18px;padding:20px;margin-bottom:22px;background:linear-gradient(135deg,#fff8e6,#ffffff);box-shadow:0 10px 30px rgba(184,155,71,.25);">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:8px;">
          <img src="${VENDOR_LOGOS.BookResorts}" style="height:28px">
          <div style="font-weight:900;font-size:18px;">Lowest Price</div>
          <span style="background:#1f7a3f;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">Best Rate Guaranteed</span>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:14px;color:#555;">${ourRate.nightly} / night</div>
            <div style="font-size:13px;color:#1f7a3f;font-weight:800;">You save ${ourRate.savings}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:26px;font-weight:900;">${ourRate.total}</div>
            <div style="font-size:12px;color:#666;">total</div>
          </div>
        </div>

        <div style="margin-top:12px;font-size:13px;color:#555;">✔ No hidden fees &nbsp; ✔ Dedicated resort specialist</div>
      </div>

      <div style="font-weight:800;margin:6px 0 14px;color:#555;">Other Booking Sites</div>
      ` : ``}

      ${results.map(r=>`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border:1px solid rgba(0,0,0,.15);border-radius:14px;margin-bottom:12px;background:#fff;">
          <div style="display:flex;align-items:center;gap:14px;">
            <img src="${VENDOR_LOGOS[r.vendor] || ''}" style="height:22px;max-width:110px;object-fit:contain">
            <div>
              <div style="font-weight:800">${r.vendor}</div>
              <div style="font-size:13px;color:#666">${r.nightly} / night</div>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:800;font-size:18px">${r.total}</div>
            <div style="font-size:12px;color:#666">total</div>
          </div>
        </div>
      `).join("")}

      <div style="margin-top:18px;text-align:center;font-size:14px;color:#444;">
        <div style="font-size:15px;color:#444;">A ${hotelName} specialist will be reaching out to you soon.</div>
        <div id="phone-confirmation-area" style="margin-top:12px;text-align:center;">
          <div id="confirm-phone-display" style="font-size:16px;margin-bottom:6px;">📞 <b>${phone}</b></div>
          <div style="font-size:14px;color:#555;">Is this the best number to reach you?</div>
          <div style="margin-top:10px;display:flex;gap:10px;justify-content:center;">
            <button id="phone-yes-btn" style="padding:8px 16px;border-radius:8px;border:none;background:#1f7a3f;color:#fff;font-weight:700;cursor:pointer;">Yes</button>
            <button id="phone-edit-btn" style="padding:8px 16px;border-radius:8px;border:1px solid #ccc;background:#fff;font-weight:700;cursor:pointer;">Update Number</button>
          </div>
          <div id="phone-edit-wrap" style="display:none;margin-top:14px;">
            <div style="display:flex;gap:8px;justify-content:center;">
              <select id="confirm-country-code" class="brp-input" style="width:110px;text-overflow:ellipsis;"></select>
              <input id="phone-edit-input" type="tel" inputmode="tel" class="brp-input" placeholder="(555) 555-5555" style="max-width:220px;">
            </div>
            <div style="margin-top:10px;text-align:center;">
              <button id="phone-save-btn" style="padding:8px 18px;border-radius:8px;border:none;background:#1a73e8;color:#fff;font-weight:800;cursor:pointer;">Save</button>
            </div>
          </div>
        </div>
        <div style="margin-top:14px;text-align:center;">
          <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:#fff6d6;border:1px solid #f1d48a;border-radius:999px;font-size:13px;font-weight:600;color:#8a6d1d;">⏱ Average wait time: <b>Less than 1 min</b></div>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// LOADING + LEAD FORM STATE
// ========================================

function showLoadingLeadForm(payload){
  const root = document.getElementById('booking-popup');
  if(!root) return;

  const LOCKED_BOOKING = {
    bookingType: payload.bookingType,
    checkIn: payload.checkIn,
    checkOut: payload.checkOut,
    departure: payload.departure || "",
    rooms: JSON.parse(JSON.stringify(payload.rooms || []))
  };

  root.dataset.pendingBooking = JSON.stringify(LOCKED_BOOKING);

  root.innerHTML = `
    <div class="brp-lead-wrap">
      <div class="brp-spinner" aria-label="Loading"></div>
      <div class="brp-rotator" id="brp-rotator">${ROTATE_PHRASES[0]}</div>
      <div class="brp-lead-title">Please enter your information to receive your exclusive offers</div>
      <form class="brp-lead-form" id="brp-lead-form" autocomplete="on">
        <div class="brp-field">
          <div class="brp-label">Name</div>
          <input class="brp-input" id="brp-lead-name" name="name" type="text" placeholder="Your name" required>
        </div>
        <div class="brp-field">
          <div class="brp-label">Phone Number</div>
          <div style="display:flex;gap:8px;">
            <select id="brp-country-code" class="brp-input" style="width:110px;text-overflow:ellipsis;"></select>
            <input class="brp-input" id="brp-lead-phone" name="phone" type="tel" inputmode="tel" placeholder="(555) 555-5555" required style="flex:1;">
          </div>
        </div>
        <button class="brp-lead-submit" id="brp-lead-submit" type="submit">Continue</button>
        <div class="brp-lead-note">No spam — just your best available offers.</div>
      </form>
    </div>
  `;

  let i = 0;
  clearInterval(rotateTimer);
  rotateTimer = setInterval(()=>{
    i = (i + 1) % ROTATE_PHRASES.length;
    const el = document.getElementById("brp-rotator");
    if(el) el.textContent = ROTATE_PHRASES[i];
  }, 2500);

  const form = document.getElementById("brp-lead-form");
  const submitBtn = document.getElementById("brp-lead-submit");
  const countrySelect = document.getElementById("brp-country-code");
  const phoneInput = document.getElementById("brp-lead-phone");

  if (countrySelect && phoneInput) {
    const us = COUNTRIES.find(c => c.label.includes("United States"));
    const others = COUNTRIES.filter(c => !c.label.includes("United States")).sort((a, b) => a.label.localeCompare(b.label));
    const SORTED_COUNTRIES = us ? [us, ...others] : others;

    countrySelect.innerHTML = SORTED_COUNTRIES.map(c =>
      `<option value="${c.code}" data-full="${c.label} ${c.code}" data-short="${c.label.split(' ')[0]} ${c.code}">${c.label} ${c.code}</option>`
    ).join("");

    countrySelect.value = "+1";

    function updateSelectedCountryText() {
      const opt = countrySelect.options[countrySelect.selectedIndex];
      if (!opt) return;
      [...countrySelect.options].forEach(o => {
        if (o.dataset.full) o.text = o.dataset.full;
      });
      opt.text = opt.dataset.short;
    }

    updateSelectedCountryText();
    countrySelect.addEventListener("change", updateSelectedCountryText);

    phoneInput.addEventListener("input", () => {
      if (countrySelect.value === "+1") {
        const digits = phoneInput.value.replace(/\D/g, "").slice(0, 10);
        let out = "";
        if (digits.length > 0) out += "(" + digits.slice(0, 3);
        if (digits.length >= 4) out += ") " + digits.slice(3, 6);
        if (digits.length >= 7) out += "-" + digits.slice(6);
        phoneInput.value = out;
      }
    });
  }

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const name = document.getElementById("brp-lead-name").value.trim();
    root.dataset.leadName = name;
    const rawPhone = document.getElementById("brp-lead-phone").value.trim();
    const countryCode = document.getElementById("brp-country-code").value;
    const phone = `${countryCode} ${rawPhone}`;

    if(!name){
      alert("Please enter your name.");
      return;
    }

    const digits = phone.replace(/\D/g,'');
    if(digits.length < 10){
      alert("Please enter a valid phone number.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const lockedBooking = JSON.parse(root.dataset.pendingBooking || "{}");
    const bookingType = lockedBooking.bookingType;

    // ========================================
    // HOTEL + FLIGHT PATH (NO PRICING)
    // ========================================

    if (bookingType === "Hotel + Flight") {
      const roomsConfig = lockedBooking.rooms.map((r, i) => {
        let line = `Room ${i + 1}: ${r.adults} Adult${r.adults > 1 ? "s" : ""}`;
        if (r.children && r.children > 0) {
          line += `, ${r.children} Child${r.children > 1 ? "ren" : ""}`;
        }
        return line;
      }).join(" • ");

      setTimeout(() => {
        const payload = {
          name,
          phone,
          booking_type: "Hotel + Flight",
          hotel_name: getWordPressSiteTitle(),
          departure_city: lockedBooking.departure || "",
          check_in: lockedBooking.checkIn,
          check_out: lockedBooking.checkOut,
          rooms_config: roomsConfig,
          sent_at: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });

        if (!window.__BRP_ZAPIER_SENT__) {
          window.__BRP_ZAPIER_SENT__ = true;
          navigator.sendBeacon("https://hooks.zapier.com/hooks/catch/3129081/uw4v30l/", blob);
        }
      }, 0);

      root.dataset.leadName = name;

      root.innerHTML = `
        <div class="brp-lead-wrap">
          <div class="brp-success">You're all set, ${name}.</div>
          <div class="brp-success-sub">A ${getWordPressSiteTitle()} specialist will be reaching out shortly.</div>

          <div style="margin-top:18px;display:grid;gap:12px;max-width:440px;width:100%;">
            <div style="padding:14px 16px;border-radius:14px;background:#f7f3e7;border:1px solid rgba(0,0,0,.08);">
              <div style="font-size:12px;color:#777;font-weight:700;letter-spacing:.06em;">TRAVEL DATES</div>
              <div style="font-size:17px;font-weight:800;margin-top:4px;">${lockedBooking.checkIn} → ${lockedBooking.checkOut}</div>
            </div>
            ${lockedBooking.departure ? `
            <div style="padding:14px 16px;border-radius:14px;background:#f7f3e7;border:1px solid rgba(0,0,0,.08);">
              <div style="font-size:12px;color:#777;font-weight:700;letter-spacing:.06em;">DEPARTURE CITY</div>
              <div style="font-size:17px;font-weight:800;margin-top:4px;">${lockedBooking.departure}</div>
            </div>
            ` : ``}
            <div style="padding:14px 16px;border-radius:14px;background:#f7f3e7;border:1px solid rgba(0,0,0,.08);">
              <div style="font-size:12px;color:#777;font-weight:700;letter-spacing:.06em;">ROOMS & GUESTS</div>
              <div style="font-size:16px;font-weight:700;margin-top:6px;line-height:1.5;">${roomsConfig}</div>
            </div>
          </div>

          <div id="phone-confirmation-area" style="margin-top:22px;text-align:center;">
            <div id="confirm-phone-display" style="font-size:18px;margin-bottom:6px;">📞 <b>${phone}</b></div>
            <div style="font-size:14px;color:#555;">Is this the best number to reach you?</div>
            <div style="margin-top:12px;display:flex;gap:10px;justify-content:center;">
              <button id="phone-yes-btn" style="padding:8px 18px;border-radius:8px;border:none;background:#1f7a3f;color:#fff;font-weight:700;">Yes</button>
              <button id="phone-edit-btn" style="padding:8px 18px;border-radius:8px;border:1px solid #ccc;background:#fff;font-weight:700;">Update Number</button>
            </div>
            <div id="phone-edit-wrap" style="display:none;margin-top:14px;">
              <div style="display:flex;gap:8px;justify-content:center;">
                <select id="confirm-country-code" class="brp-input" style="width:110px;"></select>
                <input id="phone-edit-input" class="brp-input" type="tel" placeholder="(555) 555-5555" style="max-width:220px;">
              </div>
              <div style="margin-top:10px;">
                <button id="phone-save-btn" style="padding:8px 18px;border-radius:8px;border:none;background:#1a73e8;color:#fff;font-weight:800;">Save</button>
              </div>
            </div>
          </div>

          <div style="margin-top:20px;">
            <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:#fff6d6;border:1px solid #f1d48a;border-radius:999px;font-size:13px;font-weight:600;color:#8a6d1d;">⏱ Average wait time: <b>Less than 1 min</b></div>
          </div>
        </div>
      `;

      setTimeout(() => {
        setupPhoneConfirmation(phone, lockedBooking);
      }, 0);

      return;
    }

    // ========================================
    // HOTEL ONLY PATH (WITH PRICING)
    // ========================================

    if(!lockedBooking.checkIn || !lockedBooking.checkOut){
      console.error("Booking data missing", lockedBooking);
      return;
    }

    const { adults, rooms: roomsCt } = getTotalsFromRooms(lockedBooking.rooms);

    if (!ACTIVE_HOTEL_ID) {
      alert("This hotel is not yet configured for booking.");
      return;
    }

    const workerUrl = "https://makcorp-price-comparison.edwin-b8e.workers.dev/?" + new URLSearchParams({
      hotelid: ACTIVE_HOTEL_ID,
      checkin: lockedBooking.checkIn,
      checkout: lockedBooking.checkOut,
      adults,
      rooms: roomsCt,
      cur: "USD"
    });

    clearInterval(rotateTimer);

    root.innerHTML = `
      <div class="brp-lead-wrap">
        <div class="brp-spinner"></div>
        <div class="brp-rotator">Comparing the best available rates…</div>
      </div>
    `;

    const results = await fetchWithRetry(workerUrl, 3, 600);

    if (!results || !results.length) {
      if (window.__BRP_RESET__) {
        window.__BRP_RESET__();
      }

      setTimeout(() => {
        const errorBox = document.getElementById("brp-error");
        if (errorBox) {
          errorBox.style.display = "block";
          errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);

      return;
    }

    root.innerHTML = `
      <div class="brp-lead-wrap">
        <div class="brp-success">Well done, ${name} — you're officially getting the best deal.</div>
        ${renderComparisonResults(results, name, phone)}
      </div>
    `;

    const roomsConfig = lockedBooking.rooms.map((r, i) => {
      let line = `Room ${i + 1}: ${r.adults} Adult${r.adults === 1 ? "" : "s"}`;
      if (r.children && r.children > 0) {
        line += `, ${r.children} Child${r.children === 1 ? "" : "ren"}`;
      }
      return line;
    }).join(" • ");

    const expedia = results.find(r => r.vendor === "Expedia.com") || {};
    const hotels  = results.find(r => r.vendor === "Hotels.com") || {};
    const ourRate = calculateOurRate(results) || {};

    setTimeout(() => {
      const payload = {
        name,
        phone,
        hotel_name: getWordPressSiteTitle(),
        check_in: lockedBooking.checkIn,
        check_out: lockedBooking.checkOut,
        rooms_config: roomsConfig,
        bookresorts_total: ourRate.total || "",
        expedia_total: expedia.total || "",
        hotels_total: hotels.total || "",
        sent_at: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
      navigator.sendBeacon("https://hooks.zapier.com/hooks/catch/3129081/uw4v30l/", blob);
    }, 0);

    setTimeout(() => {
      setupPhoneConfirmation(phone, lockedBooking);
    }, 0);
  });
}

// ========================================
// PHONE CONFIRMATION HELPER
// ========================================

function setupPhoneConfirmation(phone, lockedBooking) {
  const root = document.getElementById('booking-popup');
  if (!root) return;

  const yesBtn = document.getElementById("phone-yes-btn");
  const editBtn = document.getElementById("phone-edit-btn");
  const editWrap = document.getElementById("phone-edit-wrap");
  const saveBtn = document.getElementById("phone-save-btn");
  const input = document.getElementById("phone-edit-input");
  const display = document.getElementById("confirm-phone-display");
  const confirmArea = document.getElementById("phone-confirmation-area");
  const countrySelect = document.getElementById("confirm-country-code");

  if (!display || !confirmArea || !input || !countrySelect) return;

  const us = COUNTRIES.find(c => c.label.includes("United States"));
  const others = COUNTRIES.filter(c => !c.label.includes("United States")).sort((a, b) => a.label.localeCompare(b.label));
  const SORTED = us ? [us, ...others] : others;

  countrySelect.innerHTML = SORTED.map(c =>
    `<option value="${c.code}" data-full="${c.label} ${c.code}" data-short="${c.label.split(' ')[0]} ${c.code}">${c.label} ${c.code}</option>`
  ).join("");

  countrySelect.value = "+1";

  function updateCountryDisplay() {
    const opt = countrySelect.options[countrySelect.selectedIndex];
    if (!opt) return;
    [...countrySelect.options].forEach(o => {
      if (o.dataset.full) o.text = o.dataset.full;
    });
    opt.text = opt.dataset.short;
  }

  updateCountryDisplay();
  countrySelect.addEventListener("change", updateCountryDisplay);

  if (editBtn && editWrap) {
    editBtn.onclick = () => {
      editWrap.style.display = "block";
      input.focus();
    };
  }

  if (yesBtn) {
    yesBtn.onclick = () => {
      confirmArea.innerHTML = `<div style="font-size:15px; font-weight:700; color:#1f7a3f;">Thanks! Our team will connect with you shortly.</div>`;
      editWrap.style.display = "none";
    };
  }

  input.addEventListener("input", () => {
    if (countrySelect.value !== "+1") return;
    const digits = input.value.replace(/\D/g, "").slice(0, 10);
    let out = "";
    if (digits.length > 0) out += "(" + digits.slice(0, 3);
    if (digits.length >= 4) out += ") " + digits.slice(3, 6);
    if (digits.length >= 7) out += "-" + digits.slice(6);
    input.value = out;
  });

  if (saveBtn) {
    saveBtn.onclick = () => {
      window.__BRP_ZAPIER_SENT__ = false;

      const raw = input.value.replace(/\D/g, "");
      if (countrySelect.value === "+1" && raw.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }

      const formatted = `(${raw.slice(0,3)}) ${raw.slice(3,6)}-${raw.slice(6)}`;
      const fullPhone = `${countrySelect.value} ${formatted}`;

      display.innerHTML = `📞 <b>${fullPhone}</b>`;
      editWrap.style.display = "none";

      setTimeout(() => {
        const payload = {
          event: "phone_updated",
          name: root.dataset.leadName || "",
          phone: fullPhone,
          booking_type: lockedBooking.bookingType || "Hotel Only",
          hotel_name: getWordPressSiteTitle(),
          departure_city: lockedBooking.departure || "",
          check_in: lockedBooking.checkIn,
          check_out: lockedBooking.checkOut,
          rooms_config: (lockedBooking.rooms || []).map((r, i) => {
            let line = `Room ${i + 1}: ${r.adults} Adult${r.adults === 1 ? "" : "s"}`;
            if (r.children && r.children > 0) {
              line += `, ${r.children} Child${r.children === 1 ? "" : "ren"}`;
            }
            return line;
          }).join(" • "),
          sent_at: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
        navigator.sendBeacon("https://hooks.zapier.com/hooks/catch/3129081/uw4v30l/", blob);
      }, 0);
    };
  }
}

// ========================================
// MAIN INIT FUNCTION
// ========================================

function initBookingPopup() {
  const root = document.getElementById('booking-popup');
  if (!root) {
    console.warn("⚠️ #booking-popup not found — delaying init");
    return;
  }

  if (!__BRP_TEMPLATE_HTML__) {
    __BRP_TEMPLATE_HTML__ = root.innerHTML;
  }

  const q  = sel => root.querySelector(sel);
  const qa = sel => [...root.querySelectorAll(sel)];

  const pills  = qa('.brp-pill');
  const radios = qa('input[name="booking_type"]');
  const depContainer = q('#departure_city_container');
  const depInput     = q('#departure_city_field');

  if (!depContainer || !depInput) {
    console.error("❌ Critical elements missing in popup");
    return;
  }

  function getType(){
    return q('input[name="booking_type"]:checked')?.value || "Hotel Only";
  }

  function toggleDep(){
    const t = getType();
    if(t === "Hotel + Flight"){
      depContainer.style.display = "block";
      depInput.required = true;
    }else{
      depContainer.style.display = "none";
      depInput.required = false;
      depInput.value = "";
      depInput.dataset.iata = "";
    }
  }

  const shell   = q('#rg-inline');
  const summary = q('#rg-summary');
  const addBtn  = q('#rg-add');
  const collapse= q('#rg-collapse');
  const roomsWrap = q('#rg-rooms');
  const roomsCountEl  = q('#rg-rooms-count');
  const guestsCountEl = q('#rg-guests-count');

  if (!shell || !summary || !addBtn || !collapse || !roomsWrap || !roomsCountEl || !guestsCountEl) {
    console.error("❌ Rooms/Guests UI elements missing");
    return;
  }

  let rooms=[{adults:2,children:0}];

  const totalGuests = ()=> rooms.reduce((s,r)=>s + (r.adults||0) + (r.children||0), 0);
  const refreshSummary = ()=>{ roomsCountEl.textContent = rooms.length; guestsCountEl.textContent = totalGuests(); };

  function updateAddRoomState(){
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

  function renderRooms(){
    roomsWrap.innerHTML = '';

    rooms.forEach((r, idx) => {
      const room = document.createElement('div');
      room.className = 'rg-room';

      let adultsHtml = `
        <div class="rg-ctrl">
          <div class="rg-ctrl-label">Adults (18+)</div>
          <div class="rg-steps">
            <button class="rg-step" type="button" data-op="minus" data-room="${idx}" data-field="adults">−</button>
            <span class="rg-count" id="count-adults-${idx}">${r.adults}</span>
            <button class="rg-step" type="button" data-op="plus" data-room="${idx}" data-field="adults">＋</button>
          </div>
        </div>
      `;

      let childrenHtml = '';
      if (ACTIVE_MAX_CHILDREN > 0) {
        childrenHtml = `
          <div class="rg-ctrl">
            <div class="rg-ctrl-label">Children</div>
            <div class="rg-steps">
              <button class="rg-step" type="button" data-op="minus" data-room="${idx}" data-field="children">−</button>
              <span class="rg-count" id="count-children-${idx}">${r.children}</span>
              <button class="rg-step" type="button" data-op="plus" data-room="${idx}" data-field="children">＋</button>
            </div>
          </div>
        `;
      }

      room.innerHTML = `
        <div class="rg-title">Room ${idx + 1}</div>
        ${adultsHtml}
        ${childrenHtml}
        ${idx > 0 ? `<button class="rg-link" data-remove="${idx}" type="button">Remove Room</button>` : ''}
      `;

      roomsWrap.appendChild(room);
    });
  }

  function enforceRoomsRules(){
    if (!rooms.length) {
      rooms = [{ adults: Math.min(2, ACTIVE_MAX_ADULTS), children: 0 }];
    }

    if (addBtn) addBtn.style.display = "inline-block";
    renderRooms();
    refreshSummary();
    updateAddRoomState();
  }

  summary.addEventListener('click',()=>{
    shell.classList.toggle('is-open');
    updateAddRoomState();
  });
  collapse.addEventListener('click',()=> shell.classList.toggle('is-open'));

  addBtn.addEventListener('click',()=>{
    if (rooms.length >= ACTIVE_MAX_ROOMS) return;

    rooms.push({
      adults: Math.min(2, ACTIVE_MAX_ADULTS),
      children: 0
    });

    renderRooms();
    refreshSummary();
    updateAddRoomState();
  });

  roomsWrap.addEventListener('click',e=>{
    const t=e.target;
    if(t.matches('[data-remove]')){
      rooms.splice(+t.getAttribute('data-remove'),1);
      renderRooms();
      refreshSummary();
      updateAddRoomState();
      return;
    }

    if (t.matches('.rg-step')) {
      const idx = +t.dataset.room;
      const field = t.dataset.field;
      const op = t.dataset.op;

      const max = field === "adults" ? ACTIVE_MAX_ADULTS : ACTIVE_MAX_CHILDREN;
      const min = field === "adults" ? 1 : 0;

      let val = rooms[idx][field];

      if (op === "plus" && val < max) val++;
      if (op === "minus" && val > min) val--;

      rooms[idx][field] = val;

      const counter = q(`#count-${field}-${idx}`);
      if (counter) counter.textContent = val;

      refreshSummary();
    }
  });

  renderRooms();
  refreshSummary();

  radios.forEach((r,i)=>r.addEventListener('change',()=>{
    pills.forEach(l=>l.classList.remove('is-active'));
    if(r.checked) pills[i].classList.add('is-active');
    toggleDep();
    enforceRoomsRules();
  }));
  toggleDep();
  enforceRoomsRules();

  const checkin = q('#checkin_field');
  const checkout = q('#checkout_field');
  const ciWrap = q('#ci-wrap');
  const coWrap = q('#co-wrap');

  if (!checkin || !checkout) {
    console.error("❌ Date fields missing");
    return;
  }

  const today = new Date();
  const todayISO = toLocalISO(today);

  checkin.min = todayISO;
  checkin.value = todayISO;

  const plus1 = new Date(today); plus1.setDate(plus1.getDate() + 1);
  const plus3 = new Date(today); plus3.setDate(plus3.getDate() + 3);
  checkout.min = toLocalISO(plus1);
  checkout.value = toLocalISO(plus3);

  function openPicker(el){
    try{ if(el.showPicker) el.showPicker(); }catch(_){}
    el.focus({preventScroll:true});
  }

  if (ciWrap) ciWrap.addEventListener('click',()=>openPicker(checkin));
  if (coWrap) coWrap.addEventListener('click',()=>openPicker(checkout));
  checkin.addEventListener('click',()=>openPicker(checkin));
  checkout.addEventListener('click',()=>openPicker(checkout));

  checkin.addEventListener("change",()=>{
    const base = parseLocalDate(checkin.value) || parseLocalDate(todayISO);
    const minCo = new Date(base); minCo.setDate(minCo.getDate() + 1);
    const auto  = new Date(base); auto.setDate(auto.getDate() + 3);

    checkout.min = toLocalISO(minCo);

    const coCurrent = parseLocalDate(checkout.value);
    if(!checkout.value || !coCurrent || coCurrent <= base){
      checkout.value = toLocalISO(auto);
    }
  });

  const AIRPORTS_URL='https://raw.githubusercontent.com/mwgg/Airports/master/airports.json';
  depContainer.classList.add('dep-suggest-wrap');
  const dropdown = document.createElement('div');
  dropdown.className='dep-suggest';
  depContainer.appendChild(dropdown);
  depInput.setAttribute('autocomplete','off');

  let airportsIndex=[];
  fetch(AIRPORTS_URL,{cache:'force-cache'})
    .then(r=>r.json())
    .then(data=>{
      airportsIndex=Object.values(data)
        .filter(a=>a && a.iata && a.iata.length===3 && a.name)
        .map(a=>({ iata:(a.iata||'').toUpperCase(), name:a.name, city:a.city||a.town||'', country:a.country||'' }));
    }).catch(()=>{});

  const hide=()=>{ dropdown.style.display='none'; dropdown.innerHTML=''; };
  const show=()=>{ dropdown.style.display='block'; };
  const dedupe=list=>{ const s=new Set(), out=[]; for(const a of list){ if(s.has(a.iata)) continue; s.add(a.iata); out.push(a);} return out; };

  function searchAirports(qv){
    if(!qv || qv.trim().length===0){ hide(); return; }
    const Q=qv.trim().toUpperCase();
    let results=airportsIndex.filter(a=>a.iata.startsWith(Q));
    if(results.length<8){
      const more=airportsIndex.filter(a =>
        (a.name && a.name.toUpperCase().includes(Q)) ||
        (a.city && a.city.toUpperCase().includes(Q))
      );
      results=dedupe(results.concat(more));
    }
    renderAirports(results.slice(0,8));
  }

  function renderAirports(items){
    dropdown.innerHTML='';
    if(!items || !items.length){ hide(); return; }
    items.forEach(a=>{
      const row=document.createElement('div'); row.className='dep-s-item';
      const name=document.createElement('div'); name.className='dep-s-name'; name.textContent=`${a.iata} — ${a.name}`;
      const meta=document.createElement('div'); meta.className='dep-s-meta'; meta.textContent=[a.city,a.country].filter(Boolean).join(', ');
      row.appendChild(name); if(meta.textContent) row.appendChild(meta);
      row.addEventListener('click',()=>{
        depInput.value=`${a.iata} — ${a.name}`;
        depInput.dataset.iata=a.iata;
        hide();
      });
      dropdown.appendChild(row);
    });
    show();
  }

  let tt=null;
  depInput.addEventListener('input', ()=>{
    clearTimeout(tt);
    const v=depInput.value;
    tt=setTimeout(()=>searchAirports(v),90);
  });
  depInput.addEventListener('focus', ()=>{ if(dropdown.innerHTML.trim()) show(); });
  document.addEventListener('click', (e)=>{
    const inside = root.contains(e.target) && depContainer.contains(e.target);
    if(!inside) hide();
  });

  const btn = q("#brp-check-btn");
  if (!btn) {
    console.error("❌ Check availability button missing");
    return;
  }

  btn.addEventListener("click", (e)=>{
    e.preventDefault();

    sessionStorage.removeItem("brp_no_rates_error");
    const errorBox = document.getElementById("brp-error");
    if (errorBox) {
      errorBox.style.display = "none";
    }

    const type = getType();
    const ci = checkin.value;
    const co = checkout.value;

    const required = [checkin, checkout];
    if(type === "Hotel + Flight") required.push(depInput);

    let ok = true;
    required.forEach(f=>{
      if(!f.value){
        f.style.borderColor="red";
        ok=false;
      }else{
        f.style.borderColor="rgba(0,0,0,.15)";
      }
    });
    if(!ok) return;

    const ciDate = parseLocalDate(ci);
    const coDate = parseLocalDate(co);
    const todayDate = parseLocalDate(todayISO);

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
      checkIn: ci,
      checkOut: co,
      departure: (type==="Hotel + Flight") ? (depInput.value || "") : "",
      rooms: rooms
    });
  });

  // ========================================
  // CHECK FOR BOOKING BAR PREFILL DATA
  // ========================================

  if (window.__BRP_PREFILL__ && window.__BRP_PREFILL__.source === "booking-bar") {
    const prefill = window.__BRP_PREFILL__;

    if (prefill.bookingType === "Hotel + Flight") {
      radios.forEach((r, i) => {
        if (r.value === "Hotel + Flight") {
          r.checked = true;
          pills[i].classList.add('is-active');
        } else {
          pills[i].classList.remove('is-active');
        }
      });
    }

    if (prefill.checkIn) checkin.value = prefill.checkIn;
    if (prefill.checkOut) checkout.value = prefill.checkOut;
    if (prefill.departure) depInput.value = prefill.departure;

    if (Array.isArray(prefill.rooms) && prefill.rooms.length) {
      rooms = prefill.rooms.map(r => ({
        adults: r.adults || 2,
        children: r.children || 0
      }));
    }

    toggleDep();
    renderRooms();
    refreshSummary();
    updateAddRoomState();

    window.__BRP_PREFILL__ = null;

    setTimeout(() => {
      btn.click();
    }, 100);
  }
}

// ========================================
// HOTEL CONFIG INIT
// ========================================

(async function initHotelId() {
  const siteTitle = getWordPressSiteTitle();
  const hotelConfig = await getHotelIdFromSheet(siteTitle);

  if (!hotelConfig || !hotelConfig.hotelId) {
    console.error("❌ MakCorp Hotel config not found for site:", siteTitle);
    return;
  }

  ACTIVE_HOTEL_ID = hotelConfig.hotelId;
  ACTIVE_MAX_ADULTS = hotelConfig.maxAdults;
  ACTIVE_MAX_CHILDREN = hotelConfig.maxChildren;
  ACTIVE_MAX_ROOMS = hotelConfig.maxRooms;

  console.log("✅ Hotel config loaded", {
    ACTIVE_HOTEL_ID,
    ACTIVE_MAX_ADULTS,
    ACTIVE_MAX_CHILDREN,
    ACTIVE_MAX_ROOMS
  });

  // Re-init popup after limits are loaded
  initBookingPopup();
})();

// ========================================
// RUN INIT & EXPOSE RESET
// ========================================

initBookingPopup();

window.__BRP_RESET__ = function () {
  const root = document.getElementById("booking-popup");
  if (!root || !__BRP_TEMPLATE_HTML__) return;

  root.innerHTML = __BRP_TEMPLATE_HTML__;
  initBookingPopup();
};

} // ⬅️ END initWidget wrapper

})();
</script>

</body>
</html>
