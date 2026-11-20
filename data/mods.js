/*
  DATA MOD REYMOD CRAFT
  ---------------------------------------------------------------
  Cara menambah mod baru:
  1. Taruh file .mcaddon di folder /packs
  2. Copy salah satu blok { ... } di bawah, ganti isinya
  3. "access": "free" = gratis, "pass" = butuh ReyMod Pass
  4. "origin": "spinoff" | "komunitas" | "asli"
  5. "icon": gambar pixel 8x8. Tiap huruf = 1 warna dari "palette".
     Titik (.) = transparan.
  ---------------------------------------------------------------
  CATATAN: Semua mod di bawah masih CONTOH (demo) untuk mengisi
  tampilan. Ganti dengan mod asli kamu saat sudah jadi.
*/
window.REYMOD_MODS = [
  {
    id: "tappable-harvest",
    name: "Tappable Harvest",
    tagline: "Ketuk bongkahan sumber daya yang muncul di sekitarmu.",
    origin: "spinoff",
    originNote: "Terinspirasi game AR spin-off Minecraft",
    access: "free",
    status: "demo",
    version: "0.1.0",
    mc: "1.21.40+",
    size: "2 KB",
    released: "2026-11-20",
    file: "packs/tappable-harvest.mcaddon",
    tags: ["Eksplorasi", "Survival"],
    desc: "Sesekali, di dekat pemain muncul gumpalan kecil berisi kayu, batu, atau bunga. Ketuk untuk mengambil isinya, lengkap dengan animasi pecah dan suara yang terasa vanilla. Cocok buat yang kangen sensasi jalan-jalan sambil 'ngumpulin tappable'.",
    features: [
      "Tappable muncul acak di radius 12 blok",
      "Isi menyesuaikan biome tempat kamu berdiri",
      "Tidak mengubah world generation, aman dipasang di world lama"
    ],
    changelog: [{ v: "0.1.0", note: "Rilis demo pertama." }],
    palette: { a: "#3f7d2c", b: "#6fbf4a", c: "#8a5a2b", d: "#c58b4c", e: "#f2e3a0" },
    icon: "..bbbb..|.babbab.|bbaebbab|babbbbab|.bbabbb.|..cddc..|..cddc..|...cc..."
  },
  {
    id: "artifact-hotbar",
    name: "Artifact Hotbar",
    tagline: "Slot artefak dengan cooldown, ala petualangan dungeon.",
    origin: "spinoff",
    originNote: "Terinspirasi game dungeon-crawler spin-off Minecraft",
    access: "pass",
    status: "demo",
    version: "0.1.0",
    mc: "1.21.40+",
    size: "2 KB",
    released: "2026-11-18",
    file: "packs/artifact-hotbar.mcaddon",
    tags: ["Combat", "Item baru"],
    desc: "Tambahan tiga slot artefak yang bisa diaktifkan dengan tombol cepat. Setiap artefak punya cooldown dan efek yang tetap seimbang dengan combat vanilla, jadi tidak terasa seperti game lain yang ditempel.",
    features: [
      "3 slot artefak terpisah dari hotbar utama",
      "Cooldown ditampilkan seperti bar XP",
      "Resep crafting memakai bahan vanilla"
    ],
    changelog: [{ v: "0.1.0", note: "Rilis demo pertama." }],
    palette: { a: "#2a2440", b: "#7b5cd6", c: "#c9b8ff", d: "#f2c14e", e: "#ffffff" },
    icon: "...dd...|..dbbd..|.dbccbd.|dbcecbbd|dbccbbbd|.dbbbbd.|..dbbd..|...dd..."
  },
  {
    id: "rally-banner",
    name: "Rally Banner",
    tagline: "Tancapkan banner, golem dan serigala berkumpul ke situ.",
    origin: "spinoff",
    originNote: "Terinspirasi game strategi spin-off Minecraft",
    access: "pass",
    status: "demo",
    version: "0.1.0",
    mc: "1.21.40+",
    size: "2 KB",
    released: "2026-11-15",
    file: "packs/rally-banner.mcaddon",
    tags: ["Mob", "Strategi"],
    desc: "Banner khusus yang bisa ditancapkan untuk memanggil mob jinak milikmu berkumpul. Berguna saat raid atau saat mau memindahkan pasukan serigala tanpa tali satu per satu.",
    features: [
      "Bekerja untuk serigala, kucing, dan iron golem buatan pemain",
      "Radius panggil 24 blok",
      "Bisa dicabut kembali, tanpa item hilang"
    ],
    changelog: [{ v: "0.1.0", note: "Rilis demo pertama." }],
    palette: { a: "#5b3a1e", b: "#b03a2e", c: "#e8d9b0", d: "#f2c14e", e: "#2b2b2b" },
    icon: "bbbbbb..|bbccbb..|bcddcb..|bbccbb..|bbbbbb..|a.......|a.......|a......."
  },
  {
    id: "bundle-sorter",
    name: "Bundle Sorter",
    tagline: "Bundle yang otomatis menyortir isinya per jenis.",
    origin: "komunitas",
    originNote: "Saran komunitas",
    access: "free",
    status: "demo",
    version: "0.1.0",
    mc: "1.21.40+",
    size: "2 KB",
    released: "2026-11-12",
    file: "packs/bundle-sorter.mcaddon",
    tags: ["Inventory", "QoL"],
    desc: "Satu klik di bundle untuk mengurutkan isinya: blok, alat, makanan. Tampilan tooltip tetap memakai gaya vanilla, hanya jadi lebih rapi.",
    features: [
      "Urutkan isi bundle dengan sneak + klik",
      "Tidak menambah item baru",
      "Kompatibel dengan resource pack lain"
    ],
    changelog: [{ v: "0.1.0", note: "Rilis demo pertama." }],
    palette: { a: "#6b4423", b: "#a86b3c", c: "#d9a066", d: "#3c2a1a", e: "#f2e3a0" },
    icon: "..dddd..|.d....d.|dbbbbbbd|bccbbccb|bbbbbbbb|bccccccb|.bbbbbb.|..aaaa.."
  },
  {
    id: "campfire-waypoints",
    name: "Campfire Waypoints",
    tagline: "Api unggun jadi titik pulang yang terlihat dari jauh.",
    origin: "komunitas",
    originNote: "Saran komunitas",
    access: "pass",
    status: "demo",
    version: "0.1.0",
    mc: "1.21.40+",
    size: "2 KB",
    released: "2026-11-08",
    file: "packs/campfire-waypoints.mcaddon",
    tags: ["Eksplorasi", "QoL"],
    desc: "Beri nama api unggunmu dengan name tag, dan asapnya akan muncul sebagai penanda arah di kompas. Cara paling 'Minecraft' untuk bikin waypoint tanpa minimap.",
    features: [
      "Maksimal 8 waypoint per pemain",
      "Penanda tampil di kompas, bukan di HUD",
      "Waypoint ikut hilang saat api unggun dipadamkan"
    ],
    changelog: [{ v: "0.1.0", note: "Rilis demo pertama." }],
    palette: { a: "#5b3a1e", b: "#8a5a2b", c: "#f28c28", d: "#ffd25a", e: "#9a9a9a" },
    icon: "...e....|..e.e...|...dd...|..dcd...|.dccd...|.dccdd..|abababab|babababa"
  },
  {
    id: "quiet-nights",
    name: "Quiet Nights",
    tagline: "Malam yang lebih hidup: kunang-kunang, jangkrik, langit lebih dalam.",
    origin: "asli",
    originNote: "Ide orisinal ReyMod",
    access: "free",
    status: "demo",
    version: "0.1.0",
    mc: "1.21.40+",
    size: "2 KB",
    released: "2026-11-02",
    file: "packs/quiet-nights.mcaddon",
    tags: ["Atmosfer", "Visual"],
    desc: "Partikel kunang-kunang di dekat air dan rumput tinggi, suara ambient malam yang halus, dan warna langit yang sedikit lebih gelap. Semuanya dibuat supaya tidak terasa seperti shader berat.",
    features: [
      "Partikel ringan, aman untuk HP kentang",
      "Ambient sound bisa dimatikan lewat pengaturan musik",
      "Tidak mengubah gameplay sama sekali"
    ],
    changelog: [{ v: "0.1.0", note: "Rilis demo pertama." }],
    palette: { a: "#101a33", b: "#1f2f5c", c: "#ffe680", d: "#2f5c2f", e: "#ffffff" },
    icon: "aaaaaaaa|aaeaaaca|abaaaaaa|aaaacaab|abaaaaaa|aacaaaba|dddddddd|dbdddbdd"
  }
];

/* Pengaturan umum website */
window.REYMOD_CONFIG = {
  passName: "ReyMod Pass",
  passPrice: null,            // isi angka (contoh: 15000) saat harga sudah fix. null = "segera diumumkan"
  waNumber: null,             // opsional: nomor WhatsApp untuk kontak
  authReady: false,           // true kalau login (Supabase) sudah dipasang
  paymentReady: false         // true kalau payment gateway sudah dipasang
};
