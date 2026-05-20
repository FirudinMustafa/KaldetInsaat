# Basari Dagitim (basaridagitim.com) - Kapsamli Site Analizi

## Genel Bakis

**Site:** https://basaridagitim.com
**Tur:** B2B Kitap Dagitim ve E-Ticaret Platformu
**Konum:** Ikitelli OSB, Basaksehir/Istanbul
**Altyapi:** ASP.NET MVC (Magento benzeri), jQuery, SQLite
**Urun Sayisi:** 285.000+
**Kurulusdan beri:** 1959 (Altin Kitaplar geleneginden)

---

## Hesap Bilgileri (Test)

| Alan | Deger |
|------|-------|
| Hesap Kodu | A03058 |
| E-posta | cankadak@gmail.com |
| Firma | Master Elt Egitim Yay.Tic.Ltd.Sti. |
| Adres | Ziya Gokalp Mah. Suleyman Demirel Blv. The Office NO:7/E Ickapi NO:136, Basaksehir/Istanbul |
| Guncel Bakiye | 11.297,56 TL |
| Bu Ay Odeme | 0,00 TL |

---

## Tum Endpoint'ler

### Public (Oturum Gerektirmeyen)

| Endpoint | HTTP | Aciklama |
|----------|------|----------|
| `/` | 200 | Ana sayfa |
| `/kategoriler` | 200 | 10 ana kategori listesi |
| `/yeni-cikanlar` | 200 | 1.240+ yeni urun (78 sayfa) |
| `/cok-satan-kitaplar` | 200 | Cok satan kitaplar (285.408 urun) |
| `/kategori-{isim}-c-{kod}` | 200 | 120+ alt kategori sayfasi |
| `/ara?q={arama}` | 200 | Arama (autocomplete destekli) |
| `/iletisim` | 200 | Iletisim formu |
| `/hakkimizda` | 200 | Hakkimizda sayfasi |
| `/gizlilik-sozlesmesi` | 200 | Gizlilik politikasi |
| `/kullanim-kosullari` | 200 | Kullanim sozlesmesi |
| `/login` | 200 | Giris formu |
| `/sifremiunuttum` | 200 | Sifre sifirlama |
| `/sepet` | 200 | Alisveris sepeti |
| `/yayinevleri/{harf}-harfi-ile-baslayan-yayinevleri` | 500 | HATALI |
| `/yazarlar/{harf}-harfi-ile-baslayan-yazarlar` | 500 | HATALI |
| `/category/quickview` | 500 | HATALI |

### Authenticated (Oturum Gerektiren) - Tedarik Paneli

| Endpoint | HTTP | Aciklama |
|----------|------|----------|
| `/customer/dashboard` | 200 | Cari hesap paneli (bakiye, faturalar, adres) |
| `/customer/payment` | 200 | Kredi karti ile odeme (Akbank, Isbank, YKB, taksit) |
| `/customer/GetPriceChange` | 200 | Fiyat degisen urunler (Excel XLS ciktisi) |
| `/tedarik` | 200 | Tedarik sepeti (stokta olmayan urunler) |
| `/onsiparislerim` | 200 | On siparisler (urun, fiyat, iskonto, net tutar) |
| `/order/orderhistory` | 200 | Siparis gecmisi (sayfali) |
| `/siparisTakip` | 200 | Siparis durumu izleme |
| `/topluSiparis` | 200 | Toplu siparis (Excel yukle: BARKOD + ADET) |
| `/hizliSiparis` | 200 | Hizli siparis (barkod/isim ile ekle) |
| `/cikis` | - | Oturumu sonlandirma |
| `/ca` | 302 | Cari hesap kisayolu (redirect) |

### API / Form Action Endpoint'leri

| Endpoint | Method | Aciklama |
|----------|--------|----------|
| `/Order/AddProductToCart` | POST | Sepete urun ekleme (ProductID, Quantity, ShoppingCartId) |
| `/Customer/SaveDiscount` | POST | Indirim ayari kaydetme (IsDiscountActive) |
| `/Order/CartHeaderTemplate/?ShoppingCartID=0` | GET | Sepet header bilgisi (AJAX) |
| `/login` | POST | Oturum acma (UserName, Password, __RequestVerificationToken) |

---

## Kategori Yapisi (10 Ana Kategori)

1. **Edebiyat** - 97.183 urun (Roman, Siir, Hikaye, Deneme, Biyografi, Polisiye, Dunya Klasikleri, Turk Klasikleri...)
2. **Cocuk Kitaplari** - 63.695 urun (Okul Oncesi, 7-12 Yas, 12+ Yas, Roman, Hikaye, Cizgi Roman...)
3. **Tarih** - Turkiye, Turk-Osmanli, Dunya, Siyasal Tarih, Sosyal Tarih, Yerel Tarih...
4. **Egitim** - Dil Egitimi, Bilgisayar, Cocuk Egitimi, Rehber Kitaplar...
5. **Sinavlar** - TYT, AYT, LGS, YOS, KPSS, DGS, DHBT, GYS, SPK-SPF, SMMM...
6. **Hobi** - Yeme-Icme, Boyama, Hayvanlar, Spor, El Sanatlari, Bahce...
7. **Sanat** - Fotograf, Resim, Sanat Tarihi, Mimari, Grafik, Heykel...
8. **Basvuru Kitaplari** - Sozluk, Atlas, Harita, Ansiklopedi, Rehber, Kronoloji...
9. **Siyaset** - Arastirma-Inceleme, Uluslararasi Siyaset, Siyasal Dusunce...
10. **Yabanci Yayinlar** - Ingilizce, Almanca, Fransizca, Italyanca, Arapca, Rusca, Ispanyolca

---

## Tedarik Paneli Ozellikleri (B2B)

### 1. Cari Hesap Yonetimi
- Guncel bakiye goruntusu
- Gecen ay bakiyesi
- Bu ay yapilan odemeler
- Cari hareketler tablosu (tarih, fatura no, vade, aciklama, borc/alacak)
- Firma ve adres bilgileri
- Sifre degistirme

### 2. Cift Sepet Sistemi
- **Normal Sepet:** Stokta olan urunler icin
- **Tedarik Sepeti:** Stokta olmayan urunler icin ayri takip

### 3. Iskonto Sistemi
- Bayilere ozel iskonto oranlari (ornek: %37)
- Brut fiyat, iskonto tutari, net fiyat gosterimi
- Indirim acma/kapama ozelligi (`/Customer/SaveDiscount`)

### 4. Toplu Siparis
- Excel dosyasi yukleme (BARKOD + ADET kolonlari)
- Otomatik olarak sepet/tedarik sepetine aktarim
- Ornek dosya indirme destegi

### 5. Hizli Siparis
- Barkod veya kitap adi ile hizli urun arama ve ekleme
- Fiyat, iskonto, stok bilgisi anlik gosterim

### 6. On Siparis
- Henuz yayinlanmamis/stokta olmayan urunler icin on siparis
- Urun adi, yayinevi, birim fiyat, adet, iskonto, net tutar

### 7. Fiyat Degisim Raporu
- Excel (XLS) formatinda indirilebilir rapor
- Yayinevi, stok kodu, urun adi, eski fiyat, yeni fiyat, KDV bilgisi

### 8. Online Odeme
- Kredi karti ile odeme
- Desteklenen bankalar: Akbank, IsBankasi, Yapi Kredi, Diger
- Kart tipleri: Master, Visa
- Taksit secenekleri
- CVC guvenlik kodu
- Kullanim kosullari onayi

### 9. Siparis Takip
- Siparis no, tarih, toplam miktar, teslim edilen, genel toplam, durum
- Sayfali listeleme

---

## Teknik Altyapi

### Backend
- ASP.NET MVC framework
- `__RequestVerificationToken` CSRF korumasi
- Session yonetimi: `ASP.NET_SessionId` + `BASARISID` cookie

### Frontend
- jQuery UI 1.10.3
- AJAX sepet sistemi (`enable_ajax_cart = 1`)
- Autocomplete arama (`jquery.auto-complete`)
- Tippy.js (tooltip)
- Popper.js (popup positioning)
- mCustomScrollbar (ozel scrollbar)
- VarienForm (form validasyon)

### Guvenlik
- SSL sertifikasi
- CSRF token korumasi
- `X-XSS-Protection: 1; mode=block`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`

### Listeleme & Filtreleme
- Kategori, yayinevi, yazar bazli filtreleme
- Siralama: Akilli siralama, fiyat (artan/azalan), populerlik, yeni-eski, A-Z/Z-A
- Sayfa basina: 16/32/64/100 urun
- Sayfalama destegi

---

## Ticari Bilgiler

| Ozellik | Deger |
|---------|-------|
| Ucretsiz Kargo | 25.000 TL ve uzeri |
| Iade Suresi | 15 gun |
| Taksit | Mevcut |
| Telefon | 0 212 655 38 88 |
| Fax | 0 212 657 38 88 |
| E-posta | info@basaridagitim.com |
| Adres | Ikitelli OSB Mah. Eski Turgut Ozal Cad. No:8 Altintac Is Merkezi D-Blok No:206, Basaksehir/Istanbul |
| Depo Alani | 4.500 m2 kapali alan |
| Urun Cesidi | 165.000+ kitap cesidi |

---

## Tespit Edilen Sorunlar

1. `/yayinevleri/` endpoint'leri **500 Internal Server Error** donuyor
2. `/yazarlar/` endpoint'leri **500 Internal Server Error** donuyor
3. `/category/quickview` endpoint'i **500** donuyor
4. Bazi kategori sayfalari (orn. `/edebiyat`) direkt erisimde **500** donuyor
   - Ancak `/kategori-edebiyat-c-A012` formatiyla calisiyor
5. Login POST'u bazen tutarsiz davranabiliyor (token eslesme sorunlari)
6. Karakter encoding sorunlari (Turkce karakterler bazi sayfalarda bozuk gorunuyor)
7. Eski jQuery ve Magento altyapisi - modern standartlara uygun degil
8. Responsive tasarim mevcut ama modern framework kullanilmiyor
9. Sayfa yuklenme hizi optimizasyonu yapilmamis (tek CSS/JS bundle)

---

## Sosyal Medya
- Facebook
- Twitter
- Google+
- Youtube
- RSS

---

*Bu analiz 01.02.2026 tarihinde yapilmistir.*
