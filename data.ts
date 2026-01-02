
import { BlogPost, Author } from './types';

export const authorData: Author = {
  name: "Yazılımcı Günlüğü",
  bio: "Bilgi ağımı ve dijital bahçemi burada slash'lı hiyerarşik etiketlerle örüyorum. Her şey birbirine bağlı.",
  avatar: "https://picsum.photos/seed/avatar1/200/200",
  aboutContent: `
# Merhaba, Ben Bir Yazılımcı.

Bu blog, sadece kod yazmakla ilgili değil; aynı zamanda öğrenme sürecimi, keşfettiğim yeni teknolojileri ve karmaşık konulardaki düşüncelerimi bir "bilgi ağı" (knowledge graph) şeklinde organize ettiğim bir dijital bahçe.

### Neler Yapıyorum?
- **Yazılım Mimarisi:** Ölçeklenebilir ve sürdürülebilir sistemler kurmaya odaklanıyorum.
- **Düşünce Modelleri:** Bilgiyi sadece tüketmek değil, parçaları birleştirerek yeni ağlar kurmayı seviyorum.
- **Sürekli Öğrenme:** #yazılım, #matematik ve #bilim kesişim kümeleri her zaman ilgimi çekiyor.

Bu platformda gördüğünüz grafik yapısı, etiketlerin birbiriyle olan hiyerarşik bağlarını temsil ediyor. Her yazı, bu büyük ağın bir parçası.
  `,
  socials: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com"
  }
};

export const postsData: BlogPost[] = [
  {
    id: "1",
    title: "Python ile Veri Bilimi: Regresyon Analizi",
    date: "2024-05-20",
    tags: ["yazılım/python", "matematik/istatistik", "bilim/veri-bilimi"],
    excerpt: "Veri setleri üzerinde doğrusal regresyonun matematiksel temelleri ve Python kütüphaneleri ile uygulanışı.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    content: `
Günümüzde veri, yeni "petrol" olarak adlandırılsa da, onu işleyecek matematiksel modeller olmadan pek bir anlam ifade etmiyor. Bu yazıda, veriler arasındaki ilişkiyi anlamanın en temel yolu olan **Doğrusal Regresyon** modelini inceleyeceğiz.

## Matematiksel Temeller

Bir doğrusal regresyon modeli, bağımlı bir değişken ile bir veya daha fazla bağımsız değişken arasındaki ilişkiyi şu formül ile açıklar:

$$y = \beta_0 + \beta_1x_1 + \beta_2x_2 + \dots + \beta_nx_n + \epsilon$$

Burada:
- $y$: Hedef değişken (bağımlı)
- $x$: Öznitelikler (bağımsız değişkenler)
- $\beta$: Model parametreleri (katsayılar)
- $\epsilon$: Hata terimi

## Python ile Uygulama

Peki bu teoriyi koda nasıl döküyoruz? İşte popüler \`scikit-learn\` kütüphanesi ile basit bir örnek:

\`\`\`python
import numpy as np
from sklearn.linear_model import LinearRegression

# Örnek veri seti oluşturma
X = np.array([[1, 1], [1, 2], [2, 2], [2, 3]])
# y = 1 * x_0 + 2 * x_1 + 3
y = np.dot(X, np.array([1, 2])) + 3

# Modelin eğitilmesi
reg = LinearRegression().fit(X, y)

print(f"Model Skoru: {reg.score(X, y)}")
print(f"Katsayılar: {reg.coef_}")
print(f"Sabit Terim: {reg.intercept_}")
\`\`\`

### Neden Bu Yapı?
Bu modelin en büyük avantajı, sonuçların kolayca yorumlanabilir olmasıdır. Her bir $\beta$ katsayısı, ilgili özniteliğin hedef üzerindeki etkisini net bir şekilde gösterir.

#yazılım/python #matematik/istatistik #bilim/veri-bilimi
    `
  },
  {
    id: "2",
    title: "Modern Web Mimarileri: Neden React?",
    date: "2024-02-10",
    tags: ["yazılım/frontend/react", "yazılım/mimari"],
    excerpt: "Bileşen tabanlı mimarinin avantajları ve sanal DOM mekanizması.",
    imageUrl: "https://picsum.photos/seed/web/800/400",
    content: `React ve modern web üzerine düşünceler... #yazılım/frontend/react #yazılım/mimari`
  },
  {
    id: "3",
    title: "Python ile Fonksiyonel Programlama",
    date: "2024-01-05",
    tags: ["yazılım/python/decorator", "yazılım/mimari"],
    excerpt: "Python'da decorator yapısı ve kod okunabilirliği.",
    content: `Python dünyasında decorator kullanımı... #yazılım/python/decorator`
  },
  {
    id: "4",
    title: "Veri Analizi ve İstatistik",
    date: "2023-08-05",
    tags: ["matematik/istatistik", "bilim/veri-bilimi"],
    excerpt: "Büyük veri setlerinde anlamlı çıkarımlar yapmak için kullanılan yöntemler.",
    content: `Veri ve istatistik üzerine notlar... #matematik/istatistik #bilim/veri-bilimi`
  }
];
