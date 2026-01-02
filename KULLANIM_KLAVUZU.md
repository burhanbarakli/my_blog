
# 📓 Modern Minimalist Günlük - Kullanım Kılavuzu

Bu uygulama, standart blog yapısını **Obsidian** ve **Logseq** gibi modern not tutma araçlarının sunduğu **İlişkisel Bilgi Ağı (Knowledge Graph)** mantığıyla birleştirir. Bu kılavuz, sistemi nasıl özelleştireceğinizi ve içeriklerinizi nasıl yöneteceğinizi açıklar.

---

## 🏗️ 1. Veri Yönetimi (`data.ts`)

Tüm içerik ve yazar bilgileri `data.ts` dosyası üzerinden yönetilir. Veritabanı gerektirmeden, statik bir yapıyla çalışır.

### Yazar Bilgileri (`authorData`)
`authorData` objesi içindeki alanları güncelleyerek kimliğinizi yansıtabilirsiniz:
- **`name`**: Sidebar ve footer'da görünen isminiz.
- **`bio`**: Kısa biyografiniz.
- **`avatar`**: Profil fotoğrafı linki.
- **`aboutContent`**: "Hakkımda" sayfasında görünecek Markdown formatındaki detaylı metin.

---

## 🏷️ 2. Hiyerarşik Etiket Sistemi

Bu günlüğün en güçlü özelliği **slash (`/`)** ile ayrılan etiket yapısıdır.

- **Mantık**: `#yazılım/python/flask` şeklinde bir etiket kullandığınızda, sistem otomatik olarak "yazılım" -> "python" -> "flask" hiyerarşisini kurar.
- **Grafik Etkisi**: "Bilgi Ağı" görünümünde bu parçalar birbirine düğümlerle bağlanır.
- **Filtreleme**: Grafikte veya listede "python" düğümüne tıkladığınızda, içinde "python" geçen tüm üst ve alt hiyerarşiler listelenir.

---

## ✍️ 3. İçerik Yazımı (Markdown, Formül & Kod)

Yazı içeriklerinde gelişmiş özellikler desteklenir:

### 📐 Matematiksel Formüller (KaTeX)
- **Satır içi**: `$E=mc^2$`
- **Blok**: `$$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$`

### 💻 Kod Blokları (Syntax Highlighting)
Yazılarınıza kod eklerken dil belirterek renklendirme yapabilirsiniz. Örnek:
```markdown
 \`\`\`python
 print("Merhaba Dünya")
 \`\`\`
```
Desteklenen bazı diller: `javascript`, `typescript`, `python`, `css`, `html`, `bash`, `sql`.

---

## 🕸️ 4. Bilgi Ağı (Knowledge Graph) Görünümü

Sağ taraftaki grafik etkileşimlidir:
- **Düğümler**: Her bir etiket parçasını temsil eder.
- **Etkileşim**: 
    - Mouse ile sürükleyerek ağı dağıtabilirsiniz.
    - Tek tıkla ilgili etikete sahip yazıları listeleyebilirsiniz.
    - Orta tekerlek ile yakınlaşıp uzaklaşabilirsiniz.

---
*Keyifli yazmalar!*
