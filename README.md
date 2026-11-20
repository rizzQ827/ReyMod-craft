# ReyMod Craft

Website katalog mod **Minecraft Bedrock** karya ReyMod.
Live: https://rizzq827.github.io/reymod-craft/

## Fitur
- Katalog mod dengan filter (spin-off / saran komunitas / gratis / Pass) dan pencarian
- Halaman detail tiap mod (`mod.html?id=...`)
- **Rakit jadi 1 pack**: pilih sampai 9 mod (hotbar), website menggabungkan semuanya jadi satu file `.mcaddon` langsung di browser
- UI login, ReyMod Pass, dan papan saran/komentar/laporan bug (backend belum aktif)

## Cara menambah mod baru
1. Taruh file `.mcaddon` mod di folder `packs/`
2. Buka `data/mods.js`, copy satu blok mod, lalu ganti isinya (nama, deskripsi, file, ikon pixel 8x8)
3. Commit & push. GitHub Pages update otomatis dalam 1–2 menit

## Struktur
```
index.html        beranda + katalog
mod.html          halaman detail mod
data/mods.js      daftar mod + pengaturan (harga Pass, dll)
assets/           style.css, app.js, jszip.min.js
packs/            file .mcaddon (saat ini masih pack contoh)
```

## Catatan
- Semua mod saat ini masih **contoh/demo** (pack kosong berisi manifest + ikon).
- File di GitHub Pages bisa diakses publik. Untuk mod berbayar sungguhan, file mod Pass nanti perlu disimpan di storage privat (misalnya Supabase Storage) dan hanya dibagikan setelah pembayaran terverifikasi.
