# Aturan i18n Numatik

Berlaku untuk seluruh konten aplikasi dalam bahasa `id`, `en`, `ms-MY`, `ja`,
`zh-CN`, dan `ru`.

## Pola terjemahan

- Untuk terjemahan baru, gunakan `Record<Language, T>` dan helper
  `pickLang`.
- Jangan menambahkan rantai ternary seperti
  `language === "en" ? ... : language === "ja" ? ...`.
- Urutan fallback:
  - `zh-CN` → `en` → `id`
  - `ru` → `en` → `id`
  - `ms-MY` → `id` → `en`
  - bahasa lain → `id`

## Konten pengguna

Semua konten yang terlihat atau diumumkan kepada pengguna wajib diterjemahkan:
paragraf, soal, pembahasan, rangkuman, `aria-label`, label SVG, teks alternatif
gambar, tombol, dan pesan kesalahan. Hanya notasi matematika murni yang tidak
diterjemahkan.

## Matematika dan format

- Jangan menaruh kata bahasa alami di dalam `\text{}` KaTeX; pindahkan teks ke
  JSX.
- Tulis satuan dalam KaTeX dengan `\,\mathrm{}`.
- Label kelas:

  | Bahasa | Kelas 7 | Kelas 8 | Kelas 9 |
  | --- | --- | --- | --- |
  | `id` | Kelas 7 | Kelas 8 | Kelas 9 |
  | `en` | Grade 7 | Grade 8 | Grade 9 |
  | `ms-MY` | Tingkatan 1 | Tingkatan 2 | Tingkatan 3 |
  | `ja` | 中学1年 | 中学2年 | 中学3年 |
  | `zh-CN` | 七年级 | 八年级 | 九年级 |
  | `ru` | 7 класс | 8 класс | 9 класс |

- Badge kesulitan:

  | Bahasa | Mudah | Sedang | Sulit |
  | --- | --- | --- | --- |
  | `en` | Easy | Medium | Hard |
  | `ja` | 基本 | 標準 | 発展 |
  | `ms-MY` | Mudah | Sederhana | Sukar |
  | `zh-CN` | 简单 | 中等 | 困难 |
  | `ru` | Лёгкий | Средний | Сложный |

- Gunakan `Rp` untuk mata uang dalam bahasa Indonesia dan `$` untuk semua
  bahasa lain.
- Format angka:

  | Bahasa | Format |
  | --- | --- |
  | `id` | `1.234,5` |
  | `en`, `ms-MY`, `ja`, `zh-CN` | `1,234.5` |
  | `ru` | `1 234,5` (spasi tipis sebagai pemisah ribuan) |

  Dalam KaTeX, format Rusia ditulis `1\,234{,}5`.
- Ganti nama tokoh lokal Indonesia dengan nama netral yang sesuai di semua
  bahasa.

## Verifikasi

Setelah mengubah file i18n atau konten:

1. Jalankan pemeriksaan TypeScript (`tsc`).
2. Cari sisa teks Indonesia yang belum diterjemahkan.
3. Ambil dan periksa screenshot Playwright untuk keenam bahasa.
