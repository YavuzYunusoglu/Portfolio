# yavuz. — portfolyo

Saf HTML / CSS / JS. Framework, npm, build adımı, CDN yok. Fontlar `assets/fonts/` içinde self-host.
GitHub Pages'e olduğu gibi yüklenir.

```
index.html          ana sayfa (hero + 3D </>, işler, jam pasaportu, hakkımda, sertifikalar, indirmeler, iletişim)
project.html        proje detay şablonu → project.html?id=<id>
devlog.html         devlog listesi (şu an menüde yok) → devlog.html?post=<id> tek yazı
404.html            GitHub Pages bunu otomatik kullanır
data/profile.js     isim, tanıtım, hakkımda, araçlar, e-posta, linkler
data/downloads.js   indirilebilir PDF'ler (CV, portfolyo)
data/projects.js    oyun vitrini
data/events.js      jam'ler + etkinlikler + sertifikalar
data/content.js     sitedeki TÜM arayüz yazıları (başlıklar, butonlar, menü, footer, sekme başlıkları, 404)
data/devlog.js      devlog yazıları
css/style.css       tüm stil; renkler en üstteki iki token bloğunda (day / night)
js/                 site.js (ortak), home.js, project.js, devlog.js, icons.js
assets/img/<id>/    proje görselleri (itch.io'dan alındı, 1280px JPG)
```

## İçerik eklemek — HTML'e dokunmadan

- **Yeni oyun:** `data/projects.js` dizisine bir obje ekle. Görselleri `assets/img/<id>/` altına koy.
  Kapak yoksa site otomatik bir kapak üretir; YouTube videosu varsa onun küçük resmini kullanır.
- **Yeni jam / etkinlik:** `data/events.js` → `scope: "international"` ya da `"domestic"`. Dosyanın altında şablon var.
- **Devlog yazısı:** `data/devlog.js` → dosyadaki şablonu kopyala. `draft: true` yazıyı gizler.
- **CV / portfolyo PDF'i:** dosyayı `assets/files/` içine koy (ör. `assets/files/cv.pdf`), `data/downloads.js` içinde
  ilgili kartın `file` alanına yolunu yaz. `file` boşken kart "Coming soon" olarak görünür.
- **Üst şerit:** yazısız arcade sahnesi (Tetris, Donkey Kong, Duck Hunt, Pac-Man, Mario) — `js/site.js` → `SCENE`, stiller `css/style.css`.
- **Başlık, buton, menü, footer… her yazı:** `data/content.js`. HTML dosyalarında yazı yok; `""` bırakılan yazı gizlenir.
  İstisnalar: `<head>` içindeki `<title>` / `og:` etiketleri (link önizlemeleri JS çalıştırmaz, o yüzden HTML'de de duruyor)
  ve `project.html` içindeki `<noscript>` notu (yalnızca JavaScript kapalıyken görünür).

Eksik bilgiler `TODO` yorumlarıyla işaretli. Boş bırakılan alanlar sitede görünmez.

## Yerelde bakmak

`index.html` dosyasına çift tıklamak da çalışır. Fontların doğru yüklenmesi için küçük bir sunucu daha iyi:

```bash
npx serve .            # ya da: python -m http.server
```

YouTube videoları dosyaya çift tıklayarak açınca (`file://`) oynamaz; YouTube bunu 153 hatasıyla reddediyor.
O durumda sitede "Watch on YouTube" linki çıkar. Sunucuyla ya da GitHub Pages'te videolar sayfanın içinde oynar.

## GitHub Pages

1. `YavuzYunusoglu.github.io` adında bir repo aç, bu klasörün içeriğini yükle.
2. Settings → Pages → *Deploy from a branch* → `main` / `(root)`.
3. Başka bir repo adı kullanırsan (`/portfolio/` gibi), `404.html` içindeki `SITE_ROOT` değerini `"/portfolio/"` yap.
