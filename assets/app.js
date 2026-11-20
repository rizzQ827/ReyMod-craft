/* ReyMod Craft — shared logic (vanilla JS) */
(function () {
  const MODS = window.REYMOD_MODS || [];
  const CFG = window.REYMOD_CONFIG || {};
  const PACK_KEY = "reymod.pack.v1";
  const MAX_SLOTS = 9;

  /* ---------- helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const byId = (id) => MODS.find((m) => m.id === id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const originLabel = { spinoff: "Dari spin-off", komunitas: "Saran komunitas", asli: "Ide orisinal" };

  /* ---------- pixel icon (8x8 → SVG) ---------- */
  function iconSVG(mod, cls = "") {
    const rows = (mod.icon || "").split("|");
    let rects = "";
    rows.forEach((row, y) => {
      [...row].forEach((ch, x) => {
        const col = mod.palette && mod.palette[ch];
        if (col) rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${col}"/>`;
      });
    });
    return `<svg class="pixel ${cls}" viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
  }
  function artBg(mod) {
    const p = mod.palette || {};
    const a = p.a || "#333", b = p.b || "#555";
    return `background:
      linear-gradient(160deg, ${a}cc, ${b}55),
      repeating-linear-gradient(0deg, rgba(0,0,0,.08) 0 8px, transparent 8px 16px),
      repeating-linear-gradient(90deg, rgba(0,0,0,.08) 0 8px, transparent 8px 16px), #1c1914;`;
  }
  function tags(mod) {
    const acc = mod.access === "free"
      ? `<span class="tag tag--free">Gratis</span>`
      : `<span class="tag tag--pass">${esc(CFG.passName || "Pass")}</span>`;
    const demo = mod.status === "demo" ? `<span class="tag tag--demo">Contoh</span>` : "";
    return acc + `<span class="tag">${esc(originLabel[mod.origin] || mod.origin)}</span>` + demo;
  }

  /* ---------- toast ---------- */
  let toastT;
  function toast(msg) {
    let el = $(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("is-show");
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove("is-show"), 2200);
  }

  /* ---------- pack state ---------- */
  let pack = store.get(PACK_KEY, []).filter(byId);
  const listeners = [];
  function savePack() { store.set(PACK_KEY, pack); listeners.forEach((f) => f(pack)); renderTray(); }
  function inPack(id) { return pack.includes(id); }
  function togglePack(id) {
    if (inPack(id)) { pack = pack.filter((x) => x !== id); toast("Dikeluarkan dari pack"); }
    else {
      if (pack.length >= MAX_SLOTS) { toast("Hotbar penuh! Maksimal 9 mod per pack"); return; }
      pack.push(id); toast(`${byId(id).name} masuk ke pack`);
    }
    savePack();
  }
  function clearPack() { pack = []; savePack(); }
  function onPack(fn) { listeners.push(fn); }

  /* ---------- tray (hotbar) ---------- */
  function renderTray() {
    let tray = $(".tray");
    if (!tray) {
      tray = document.createElement("div");
      tray.className = "tray";
      tray.innerHTML = `
        <div class="tray__in" role="region" aria-label="Pack pilihanmu">
          <div class="hotbar"></div>
          <div class="tray__info">
            <strong></strong>
            <span>Klik slot untuk mengeluarkan mod</span>
            <button class="tray__clear" type="button">Kosongkan</button>
          </div>
          <button class="btn btn--grass btn--sm" type="button" data-build>Rakit jadi 1 pack</button>
        </div>`;
      document.body.appendChild(tray);
      $(".tray__clear", tray).addEventListener("click", clearPack);
      $("[data-build]", tray).addEventListener("click", openBuild);
    }
    const bar = $(".hotbar", tray);
    let html = "";
    for (let i = 0; i < MAX_SLOTS; i++) {
      const m = byId(pack[i]);
      html += m
        ? `<button class="slot is-filled" type="button" data-remove="${m.id}" title="Keluarkan ${esc(m.name)}">${iconSVG(m)}</button>`
        : `<div class="slot"></div>`;
    }
    bar.innerHTML = html;
    $$("[data-remove]", bar).forEach((b) => b.addEventListener("click", () => togglePack(b.dataset.remove)));
    $("strong", tray).textContent = `${pack.length} mod dipilih`;
    tray.classList.toggle("is-show", pack.length > 0);
  }

  /* ---------- modal ---------- */
  function modal(html) {
    let m = $("#modal");
    if (!m) {
      m = document.createElement("div");
      m.id = "modal"; m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
      m.innerHTML = `<div class="modal__box"><button class="modal__x" type="button" aria-label="Tutup">×</button><div class="modal__c"></div></div>`;
      document.body.appendChild(m);
      m.addEventListener("click", (e) => { if (e.target === m || e.target.closest(".modal__x")) closeModal(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
    }
    $(".modal__c", m).innerHTML = html;
    m.classList.add("is-open");
    return m;
  }
  function closeModal() { const m = $("#modal"); if (m) m.classList.remove("is-open"); }

  /* ---------- account / pass (UI only for now) ---------- */
  function hasPass() { return false; } // nanti diisi dari Supabase setelah login + pembayaran aktif
  function openLogin() {
    modal(`
      <h3>Masuk ke ReyMod</h3>
      <p>Login dipakai untuk menyimpan ${esc(CFG.passName)}, menulis komentar, dan melaporkan bug.</p>
      <div class="stack">
        <button class="btn btn--grass" type="button" disabled>Masuk dengan Google</button>
        <button class="btn" type="button" disabled>Masuk dengan Email</button>
      </div>
      <p class="note" style="color:#555;margin-top:14px">Fitur login sedang dirakit. Untuk sekarang semua mod gratis tetap bisa diunduh tanpa akun.</p>`);
  }
  function openPass() {
    const price = CFG.passPrice ? "Rp" + Number(CFG.passPrice).toLocaleString("id-ID") : "Segera diumumkan";
    modal(`
      <h3>${esc(CFG.passName)}</h3>
      <p>Sekali bayar, semua mod ReyMod terbuka, termasuk mod yang rilis nanti.</p>
      <p style="font-family:var(--font-pixel);font-size:28px;color:#2e2e2e;margin:0 0 14px">${price}</p>
      <button class="btn btn--gold" type="button" disabled>Pembayaran segera dibuka</button>
      <p class="note" style="color:#555;margin-top:14px">Pembayaran belum aktif. Ikuti terus update-nya di website ini.</p>`);
  }

  /* ---------- batch build: merge many .mcaddon into ONE ---------- */
  function openBuild() {
    if (!pack.length) return;
    const mods = pack.map(byId);
    const locked = mods.filter((m) => m.access === "pass" && !hasPass());
    const ok = mods.filter((m) => !locked.includes(m));
    const list = mods.map((m) => `<li style="display:flex;gap:10px;align-items:center;margin:6px 0">
        <span style="width:26px;height:26px;display:inline-block">${iconSVG(m)}</span>
        <span>${esc(m.name)}${locked.includes(m) ? ` <em style="color:#8a6200;font-style:normal">(butuh ${esc(CFG.passName)})</em>` : ""}</span></li>`).join("");
    modal(`
      <h3>Rakit pack</h3>
      <p>Mod di bawah akan digabung jadi <b>satu file .mcaddon</b>. Sekali buka, semuanya langsung terpasang di Minecraft.</p>
      <ul style="list-style:none;padding:0;margin:0 0 14px">${list}</ul>
      ${locked.length ? `<p style="background:#e7d6a1;border:2px solid #8a6200;padding:8px 10px;font-size:14px">${locked.length} mod butuh ${esc(CFG.passName)} dan akan dilewati.</p>` : ""}
      <div class="progress" hidden><i></i></div>
      <p class="build-status" style="font-size:14px;min-height:1.4em"></p>
      <button class="btn btn--grass" type="button" data-go ${ok.length ? "" : "disabled"}>Unduh ${ok.length} mod sebagai 1 pack</button>`);
    $("[data-go]").addEventListener("click", () => buildPack(ok));
  }

  async function buildPack(mods) {
    const btn = $("[data-go]"), bar = $(".progress"), fill = $(".progress i"), st = $(".build-status");
    if (typeof JSZip === "undefined") { st.textContent = "Library ZIP gagal dimuat. Cek koneksi lalu coba lagi."; return; }
    btn.disabled = true; bar.hidden = false;
    const out = new JSZip();
    const used = new Set();
    try {
      for (let i = 0; i < mods.length; i++) {
        const m = mods[i];
        st.textContent = `Mengambil ${m.name}...`;
        const res = await fetch(m.file, { cache: "no-cache" });
        if (!res.ok) throw new Error(`File ${m.name} tidak ditemukan`);
        const zip = await JSZip.loadAsync(await res.arrayBuffer());
        // Setiap top-level folder/file diberi awalan id mod agar tidak bentrok antar mod.
        const files = Object.values(zip.files).filter((f) => !f.dir);
        for (const f of files) {
          const parts = f.name.split("/");
          parts[0] = `${m.id}__${parts[0]}`;
          let name = parts.join("/");
          while (used.has(name)) name = name.replace(/(\.[^./]+)?$/, "_dup$1");
          used.add(name);
          out.file(name, await f.async("uint8array"));
        }
        fill.style.width = `${Math.round(((i + 1) / mods.length) * 80)}%`;
      }
      st.textContent = "Menggabungkan jadi satu pack...";
      const blob = await out.generateAsync({ type: "blob", compression: "DEFLATE" }, (meta) => {
        fill.style.width = `${80 + Math.round(meta.percent * 0.2)}%`;
      });
      const stamp = new Date().toISOString().slice(0, 10);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `ReyMod-Pack-${mods.length}mod-${stamp}.mcaddon`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      fill.style.width = "100%";
      st.textContent = "Selesai! Buka file .mcaddon-nya, Minecraft akan memasang semua mod sekaligus.";
    } catch (e) {
      st.textContent = "Gagal: " + e.message;
    } finally { btn.disabled = false; }
  }

  /* ---------- single download ---------- */
  function downloadOne(id) {
    const m = byId(id);
    if (!m) return;
    if (m.access === "pass" && !hasPass()) { openPass(); return; }
    const a = document.createElement("a");
    a.href = m.file; a.download = m.file.split("/").pop();
    document.body.appendChild(a); a.click(); a.remove();
    toast("Mengunduh " + m.name);
  }

  /* ---------- nav ---------- */
  function initNav() {
    const nav = $(".nav");
    if (!nav) return;
    const burger = $(".nav__burger", nav);
    burger && burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open);
    });
    $$(".nav__links a", nav).forEach((a) => a.addEventListener("click", () => nav.classList.remove("is-open")));
    $$("[data-login]").forEach((b) => b.addEventListener("click", openLogin));
    $$("[data-pass]").forEach((b) => b.addEventListener("click", openPass));

    // scrollspy
    const links = $$('.nav__links a[href^="#"]');
    const secs = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    if (secs.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-on", a.getAttribute("href") === "#" + en.target.id));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      secs.forEach((s) => io.observe(s));
    }
  }

  window.ReyMod = { MODS, CFG, $, $$, byId, esc, iconSVG, artBg, tags, originLabel, toast,
    inPack, togglePack, onPack, downloadOne, openLogin, openPass, openBuild, modal, closeModal, hasPass };

  document.addEventListener("DOMContentLoaded", () => { initNav(); renderTray(); });
})();
