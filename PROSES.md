# PROSES

## 1. Persona dan masalahnya
admin himpunan, masalah yang ingin diselesaikan adalah peminjaman harus disetujui admin dulu dan ruang himpunan tidak boleh langsung terpakai. permintaan yang ditolak harus ada alasanna.

## 2. Rancangan komponen dan state
├─ types.ts
├─ api/
│  ├─ client.ts
│  └─ pinjam.ts
└─ components/
   ├─ SumberDayaForm.tsx
   ├─ SumberDayaList.tsx
   ├─ PeminjamanForm.tsx
   ├─ FilterPeminjaman.tsx
   ├─ PeminjamanList.tsx
   └─ DetailPeminjaman.tsx

state utama di App.tsx, sumberDaya, peminjaman, filter, detail. nilai filter dikirim dari App.tsx ke FilterPeminjaman.tsx dari props.

## 3. Satu keputusan desain
memisahkan pemanggilan api ke folder terpisah (src/api/).
pilihan yang dipertimbangkan, fetch langsung di komponennya.
alasan memilih memisahkan pemanggilan api agar logika tidak tersebar dan alurnya lebih mudah untuk ditelusuri.

## 4. Bug atau kendala (minimal dua)
### Bug 1
- Gejala: saat menjalankan node server-api/server.mjs --persona C, terminal menampilkan error MODULE_NOT_FOUND. 
- Cara menemukan: membaca pesan error nya
- Penyebab dan solusi: penyebabnya karena sudah masuk di folder server api tapi command nya masih masuk ke server api lagi sehingga double. solusinya hapus bagian server api di command dan jalankan node server.mjs --persona C

### Bug 2
- Gejala: data di form terkirim walau spasi saja
- Cara menemukan: coba tes dengan isi spasi
- Penyebab dan solusi: validasi hanya periksa input kosong atau tidak. solusinya pakai trim untuk memeriksa apakah nama sudah diisi

## 5. Change request
(Apa yang diminta, bagian kode mana yang kamu ubah, dan satu keputusan desain yang kamu ambil.)
loh eng