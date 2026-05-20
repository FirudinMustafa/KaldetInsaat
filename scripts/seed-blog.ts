import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Blog categories
const categories = [
  {
    slug: "insaat-teknolojileri",
    name: "İnşaat Teknolojileri",
    description: "İnşaat sektöründeki son teknolojik gelişmeler ve yenilikler",
    order: 1,
  },
  {
    slug: "malzeme-bilgisi",
    name: "Malzeme Bilgisi",
    description: "İnşaat malzemeleri, özellikleri ve kullanım alanları",
    order: 2,
  },
  {
    slug: "proje-yonetimi",
    name: "Proje Yönetimi",
    description: "İnşaat projelerinde yönetim teknikleri ve ipuçları",
    order: 3,
  },
  {
    slug: "sektor-haberleri",
    name: "Sektör Haberleri",
    description: "İnşaat sektöründen güncel haberler ve gelişmeler",
    order: 4,
  },
  {
    slug: "ipuclari",
    name: "İpuçları ve Rehberler",
    description: "Pratik bilgiler ve rehberler",
    order: 5,
  },
]

// Blog posts with enhanced content
const blogPosts = [
  {
    slug: "endustriyel-zemin-betonu-nedir-ve-nasil-uygulanir",
    title: "Endüstriyel Zemin Betonu: Eksiksiz Uygulama Rehberi",
    excerpt: "30+ yıllık tecrübemizle endüstriyel zemin betonu hakkında bilmeniz gereken her şeyi derledik. Uygulama teknikleri, malzeme seçimi ve bakım ipuçları.",
    content: `
      <p class="lead">Endüstriyel tesisler için zemin seçimi, operasyonel verimlilik ve uzun vadeli maliyet açısından kritik bir karardır. Bu kapsamlı rehberde, endüstriyel zemin betonu hakkında bilmeniz gereken tüm detayları paylaşıyoruz.</p>

      <div class="info-box">
        <strong>💡 Önemli Not:</strong> Doğru zemin seçimi, işletme maliyetlerinizi %40'a kadar düşürebilir ve iş güvenliği risklerini minimize eder.
      </div>

      <h2>Endüstriyel Zemin Betonu Nedir?</h2>

      <p>Endüstriyel zemin betonu, <strong>yüksek mukavemetli agregalar</strong>, özel katkı maddeleri ve gelişmiş beton teknolojileri kullanılarak üretilen, ağır yüklere ve zorlu koşullara dayanıklı zemin sistemidir.</p>

      <p>Standart betondan farklı olarak, endüstriyel zemin betonu:</p>

      <ul>
        <li><strong>C30-C50 sınıfı</strong> basınç dayanımına sahiptir</li>
        <li>Özel <strong>fiber takviye</strong> ile çatlama direnci artırılmıştır</li>
        <li><strong>Yüzey sertleştirici</strong> uygulaması ile aşınma direnci kazandırılmıştır</li>
        <li>Derz aralıkları minimize edilmiş, <strong>dikişsiz</strong> yüzey elde edilir</li>
      </ul>

      <h2>Hangi Tesisler İçin Uygundur?</h2>

      <div class="grid-2">
        <div class="grid-item">
          <h4>🏭 Üretim Tesisleri</h4>
          <p>Ağır makine trafiği, forklift kullanımı ve yüksek yük kapasitesi gerektiren alanlar.</p>
        </div>
        <div class="grid-item">
          <h4>📦 Lojistik Depoları</h4>
          <p>Raf sistemleri, sürekli araç trafiği ve yüksek tonajlı depolama alanları.</p>
        </div>
        <div class="grid-item">
          <h4>🚗 Oto Servis & Garajlar</h4>
          <p>Yağ ve kimyasal maddelere dayanıklı, kolay temizlenebilir zeminler.</p>
        </div>
        <div class="grid-item">
          <h4>🍽️ Gıda Tesisleri</h4>
          <p>Hijyen standartlarına uygun, antibakteriyel özellikli zeminler.</p>
        </div>
      </div>

      <h2>Uygulama Aşamaları</h2>

      <div class="step-list">
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <h4>Zemin Analizi ve Hazırlık</h4>
            <p>Mevcut zemin yapısı incelenir, gerekli kazı ve dolgu işlemleri yapılır. Alt zemin sıkıştırılarak taşıma kapasitesi kontrol edilir.</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <h4>Yalıtım ve Donatı</h4>
            <p>Su yalıtımı, buhar bariyeri ve gerekli donatı hasırları yerleştirilir. Fiber takviye tercih ediliyorsa bu aşamada eklenir.</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-content">
            <h4>Beton Dökümü</h4>
            <p>Özel formüllü beton, lazer mastar ile hassas şekilde yayılır. Kotlar milimetrik hassasiyetle kontrol edilir.</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">4</span>
          <div class="step-content">
            <h4>Yüzey Sertleştirme</h4>
            <p>Helikopterle perdahlama yapılır ve yüzey sertleştirici uygulanarak aşınma direnci 8-10 kat artırılır.</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">5</span>
          <div class="step-content">
            <h4>Kür ve Derz İşlemleri</h4>
            <p>Beton uygun koşullarda kürlenir, genleşme ve büzülme derzleri açılarak çatlama önlenir.</p>
          </div>
        </div>
      </div>

      <h2>Teknik Özellikler</h2>

      <table class="spec-table">
        <thead>
          <tr>
            <th>Özellik</th>
            <th>Standart Değer</th>
            <th>Premium Değer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Basınç Dayanımı</td>
            <td>C30 (30 MPa)</td>
            <td>C50 (50 MPa)</td>
          </tr>
          <tr>
            <td>Aşınma Direnci</td>
            <td>AR1</td>
            <td>AR0.5</td>
          </tr>
          <tr>
            <td>Düzlük Toleransı</td>
            <td>FM2 (±3mm/3m)</td>
            <td>FM1 (±2mm/3m)</td>
          </tr>
          <tr>
            <td>Yük Kapasitesi</td>
            <td>5 ton/m²</td>
            <td>15+ ton/m²</td>
          </tr>
        </tbody>
      </table>

      <div class="warning-box">
        <strong>⚠️ Dikkat:</strong> Endüstriyel zemin betonu uygulaması, uzman ekip ve profesyonel ekipman gerektirir. Yanlış uygulama, kısa sürede zemin hasarlarına ve yüksek onarım maliyetlerine neden olabilir.
      </div>

      <h2>Maliyet ve Yatırım Geri Dönüşü</h2>

      <p>Endüstriyel zemin betonu, başlangıç maliyeti açısından standart betondan daha yüksek olsa da, uzun vadede önemli avantajlar sağlar:</p>

      <ul>
        <li><strong>25-30 yıl</strong> ortalama kullanım ömrü</li>
        <li>Minimum bakım maliyeti (yıllık %1-2)</li>
        <li>Araç lastik ömrünün uzaması</li>
        <li>İş kazalarında %60'a varan azalma</li>
        <li>Temizlik maliyetlerinde %50 tasarruf</li>
      </ul>

      <div class="cta-box">
        <h3>Ücretsiz Keşif ve Teklif</h3>
        <p>30+ yıllık tecrübemizle projeniz için en uygun zemin çözümünü belirleyelim.</p>
        <a href="/teklif-hesapla" class="cta-button">Teklif Alın →</a>
      </div>
    `,
    keywords: "endüstriyel zemin, beton, zemin betonu, fabrika zemin, depo zemin, lojistik zemin",
    featured: true,
    categorySlug: "insaat-teknolojileri",
  },
  {
    slug: "epoksi-zemin-kaplama-rehberi",
    title: "Epoksi Zemin Kaplama: A'dan Z'ye Rehber",
    excerpt: "Hijyenik ve dayanıklı epoksi zemin kaplamanın tüm detayları. Avantajları, uygulama süreci, bakım ipuçları ve maliyet analizi.",
    content: `
      <p class="lead">Epoksi zemin kaplama, endüstriyel ve ticari alanlarda estetik görünüm ile yüksek performansı bir arada sunan modern zemin çözümüdür. Bu rehberde, epoksi kaplama hakkında merak ettiğiniz tüm soruları yanıtlıyoruz.</p>

      <h2>Epoksi Zemin Kaplama Nedir?</h2>

      <p>Epoksi, <strong>iki bileşenli</strong> (reçine + sertleştirici) bir polimer sistemdir. Bu iki bileşen karıştırıldığında kimyasal reaksiyona girerek son derece sert, dayanıklı ve parlak bir yüzey oluşturur.</p>

      <div class="highlight-box">
        <h4>✨ Epoksi'nin Benzersiz Özellikleri</h4>
        <ul>
          <li>Dikişsiz, gözeneksiz yüzey</li>
          <li>Kimyasal maddelere karşı mükemmel direnç</li>
          <li>Kolay temizlik ve hijyen</li>
          <li>Geniş renk ve desen seçenekleri</li>
          <li>15-20 yıl kullanım ömrü</li>
        </ul>
      </div>

      <h2>Epoksi Türleri ve Kullanım Alanları</h2>

      <div class="card-grid">
        <div class="feature-card">
          <div class="card-icon">🏥</div>
          <h4>Self-Leveling Epoksi</h4>
          <p><strong>Kullanım:</strong> Hastaneler, laboratuvarlar, ilaç fabrikaları</p>
          <p>Otomatik yayılma özelliği ile pürüzsüz, hijyenik yüzey.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🏭</div>
          <h4>Epoksi Mortar</h4>
          <p><strong>Kullanım:</strong> Ağır sanayi, oto servis, kimya tesisleri</p>
          <p>3-6mm kalınlıkta, maksimum dayanıklılık.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🅿️</div>
          <h4>Anti-Slip Epoksi</h4>
          <p><strong>Kullanım:</strong> Otoparklar, rampa alanları, ıslak zeminler</p>
          <p>Özel kuvars katkılı, kaymaz yüzey.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🎨</div>
          <h4>Dekoratif Epoksi</h4>
          <p><strong>Kullanım:</strong> Showroom, mağaza, ofis alanları</p>
          <p>Metalik, 3D efekt ve özel desen uygulamaları.</p>
        </div>
      </div>

      <h2>Uygulama Süreci</h2>

      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-marker">1. Gün</div>
          <h4>Zemin Hazırlığı</h4>
          <p>Diamond grinding veya shot blasting ile zemin yüzeyi pürüzlendirilir. Çatlaklar ve hasarlı bölgeler onarılır.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-marker">2. Gün</div>
          <h4>Astar Uygulaması</h4>
          <p>Epoksi primer uygulanarak beton ile kaplama arasında güçlü bağ sağlanır.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-marker">3-4. Gün</div>
          <h4>Ana Kaplama</h4>
          <p>Seçilen epoksi sistemi uygulanır. Kalınlık ve kat sayısı projeye göre belirlenir.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-marker">5. Gün</div>
          <h4>Son Kat ve Kür</h4>
          <p>Koruyucu son kat uygulanır. Tam kür süresi 7 gündür, hafif trafik 3. günde başlayabilir.</p>
        </div>
      </div>

      <h2>Avantajlar ve Dezavantajlar</h2>

      <div class="comparison-table">
        <div class="pros">
          <h4>✅ Avantajları</h4>
          <ul>
            <li>Hijyenik, mikroorganizma barındırmaz</li>
            <li>Kimyasal ve mekanik dayanıklılık</li>
            <li>Kolay ve hızlı temizlik</li>
            <li>Estetik görünüm</li>
            <li>Toz tutmaz, anti-statik seçenekler</li>
            <li>UV dayanımlı versiyonlar mevcut</li>
          </ul>
        </div>
        <div class="cons">
          <h4>⚠️ Dikkat Edilmesi Gerekenler</h4>
          <ul>
            <li>Profesyonel uygulama gerektirir</li>
            <li>Zemin hazırlığı kritik önemdedir</li>
            <li>Uygulama sırasında nem ve sıcaklık kontrolü şart</li>
            <li>Kür süresi boyunca alan kapalı tutulmalı</li>
            <li>Aşırı UV maruziyetinde sararma (standart tip)</li>
          </ul>
        </div>
      </div>

      <h2>Maliyet Faktörleri</h2>

      <p>Epoksi zemin kaplama maliyeti aşağıdaki faktörlere göre değişir:</p>

      <ul>
        <li><strong>Alan büyüklüğü:</strong> Büyük alanlarda birim maliyet düşer</li>
        <li><strong>Zemin durumu:</strong> Onarım gerektiren zeminlerde ek maliyet</li>
        <li><strong>Epoksi türü:</strong> Dekoratif ve özel sistemler daha yüksek</li>
        <li><strong>Kalınlık:</strong> 1mm ile 6mm arası seçenekler</li>
        <li><strong>Ek özellikler:</strong> Anti-statik, anti-bakteriyel, UV dayanım</li>
      </ul>

      <div class="info-box">
        <strong>💰 Ekonomik Analiz:</strong> Epoksi zemin kaplama, 15-20 yıllık ömrü boyunca seramik veya fayansa göre %35-50 daha ekonomiktir (bakım, temizlik ve onarım maliyetleri dahil).
      </div>

      <h2>Bakım ve Temizlik</h2>

      <div class="tip-box">
        <h4>🧹 Günlük Bakım</h4>
        <p>Kuru veya nemli mop ile toz temizliği yeterlidir. Gerektiğinde nötr pH değerli temizlik maddesi kullanın.</p>
      </div>

      <div class="tip-box">
        <h4>🔄 Periyodik Bakım</h4>
        <p>Yılda 1-2 kez cilalama ve 5-7 yılda bir koruyucu kaplama yenileme önerilir.</p>
      </div>

      <div class="cta-box">
        <h3>Projeniz İçin Doğru Epoksi Çözümü</h3>
        <p>Uzman ekibimiz, ihtiyacınıza en uygun epoksi sistemini belirlemek için ücretsiz keşif yapıyor.</p>
        <a href="/iletisim" class="cta-button">Bize Ulaşın →</a>
      </div>
    `,
    keywords: "epoksi zemin, epoksi kaplama, hijyenik zemin, self-leveling epoksi, endüstriyel zemin kaplama",
    featured: true,
    categorySlug: "malzeme-bilgisi",
  },
  {
    slug: "celik-konstruksiyon-avantajlari",
    title: "Çelik Konstrüksiyon: Neden Geleceğin Tercihi?",
    excerpt: "Çelik konstrüksiyonun modern inşaattaki yeri, avantajları ve uygulama alanları. Deprem dayanımından sürdürülebilirliğe kapsamlı analiz.",
    content: `
      <p class="lead">Dünya genelinde inşaat sektörü, hız, dayanıklılık ve sürdürülebilirlik arayışında çelik konstrüksiyona yöneliyor. Türkiye'nin deprem kuşağında yer alması, bu tercihi daha da anlamlı kılıyor.</p>

      <div class="stat-grid">
        <div class="stat-item">
          <span class="stat-number">%80</span>
          <span class="stat-label">Daha Hızlı İnşaat</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">%100</span>
          <span class="stat-label">Geri Dönüştürülebilir</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">50+</span>
          <span class="stat-label">Yıl Kullanım Ömrü</span>
        </div>
      </div>

      <h2>Çelik Konstrüksiyon Nedir?</h2>

      <p>Çelik konstrüksiyon, taşıyıcı sistemin fabrikada üretilen çelik profiller ve birleşim elemanları ile oluşturulduğu modern inşaat yöntemidir. <strong>Kolon, kiriş, makas</strong> ve diğer taşıyıcı elemanlar sahada monte edilerek yapı iskeletini oluşturur.</p>

      <h2>Betonarmeye Göre Avantajları</h2>

      <div class="comparison-grid">
        <div class="compare-item">
          <h4>⏱️ Hız</h4>
          <p><strong>Çelik:</strong> Fabrikasyon + hızlı montaj = %50-80 daha kısa süre</p>
          <p><strong>Betonarme:</strong> Kalıp, demir, döküm, kür süreci = uzun inşaat süresi</p>
        </div>
        <div class="compare-item">
          <h4>🏋️ Dayanım/Ağırlık</h4>
          <p><strong>Çelik:</strong> Yüksek mukavemet, düşük ağırlık oranı</p>
          <p><strong>Betonarme:</strong> Ağır yapı, temel maliyeti yüksek</p>
        </div>
        <div class="compare-item">
          <h4>🌍 Sürdürülebilirlik</h4>
          <p><strong>Çelik:</strong> %100 geri dönüşüm, minimum atık</p>
          <p><strong>Betonarme:</strong> Yıkım atıkları, geri dönüşüm zorluğu</p>
        </div>
        <div class="compare-item">
          <h4>🔄 Esneklik</h4>
          <p><strong>Çelik:</strong> Kolay tadilat, genişletme, söküp taşıma</p>
          <p><strong>Betonarme:</strong> Değişiklik maliyetli ve zor</p>
        </div>
      </div>

      <h2>Deprem Güvenliği</h2>

      <div class="warning-box" style="background: #e8f5e9; border-color: #4caf50;">
        <strong>🛡️ Kritik Avantaj:</strong> Çelik konstrüksiyon, sünek (ductile) davranışı sayesinde deprem enerjisini absorbe eder. Betonarme yapıların gevrek kırılmasına karşın, çelik yapılar deforme olarak enerjiyi dağıtır ve can güvenliğini maksimize eder.
      </div>

      <p>Türkiye'deki son büyük depremlerde çelik yapıların performansı, bu avantajı açıkça ortaya koymuştur. Doğru tasarım ve uygulama ile çelik yapılar:</p>

      <ul>
        <li>Deprem yüklerini elastik bölgede karşılar</li>
        <li>Moment aktaran çerçeve sistemi ile rijitlik sağlar</li>
        <li>Merkezi veya dışmerkez çaprazlar ile yanal stabilitei artırır</li>
        <li>Kolay hasar tespiti ve onarım imkanı sunar</li>
      </ul>

      <h2>Kullanım Alanları</h2>

      <div class="icon-list">
        <div class="icon-item">
          <span class="icon">🏭</span>
          <div>
            <h4>Endüstriyel Tesisler</h4>
            <p>Fabrikalar, üretim tesisleri, atölyeler - geniş açıklık ve yüksek tavan</p>
          </div>
        </div>
        <div class="icon-item">
          <span class="icon">📦</span>
          <div>
            <h4>Depo ve Lojistik</h4>
            <p>Lojistik merkezleri, soğuk depolar, dağıtım merkezleri</p>
          </div>
        </div>
        <div class="icon-item">
          <span class="icon">🏢</span>
          <div>
            <h4>Ticari Yapılar</h4>
            <p>AVM, ofis binaları, showroom, sergi alanları</p>
          </div>
        </div>
        <div class="icon-item">
          <span class="icon">🏟️</span>
          <div>
            <h4>Özel Projeler</h4>
            <p>Stadyumlar, hangarlar, fuar alanları, köprüler</p>
          </div>
        </div>
      </div>

      <h2>Uygulama Süreci</h2>

      <div class="process-flow">
        <div class="process-step">
          <span>1</span>
          <p>Mimari & Statik Proje</p>
        </div>
        <div class="process-arrow">→</div>
        <div class="process-step">
          <span>2</span>
          <p>Detay Çizimleri</p>
        </div>
        <div class="process-arrow">→</div>
        <div class="process-step">
          <span>3</span>
          <p>Fabrikasyon</p>
        </div>
        <div class="process-arrow">→</div>
        <div class="process-step">
          <span>4</span>
          <p>Montaj</p>
        </div>
        <div class="process-arrow">→</div>
        <div class="process-step">
          <span>5</span>
          <p>Kaplama & Boya</p>
        </div>
      </div>

      <h2>Kaldet İnşaat Farkı</h2>

      <p>30+ yıllık deneyimimizle çelik konstrüksiyon projelerinizde:</p>

      <ul>
        <li>TSE ve EN standartlarına uygun üretim</li>
        <li>3D modelleme ve detay mühendisliği</li>
        <li>Fabrikamızda kalite kontrollü imalat</li>
        <li>Deneyimli montaj ekipleri</li>
        <li>Yangın koruma ve anti-korozyon kaplamalar</li>
        <li>Anahtar teslim proje yönetimi</li>
      </ul>

      <div class="cta-box">
        <h3>Çelik Konstrüksiyon Projeniz İçin</h3>
        <p>Detaylı bilgi ve ücretsiz keşif için bizimle iletişime geçin.</p>
        <a href="/teklif-hesapla" class="cta-button">Teklif Hesapla →</a>
      </div>
    `,
    keywords: "çelik konstrüksiyon, çelik yapı, deprem dayanımı, prefabrik çelik, endüstriyel yapı",
    featured: false,
    categorySlug: "insaat-teknolojileri",
  },
  {
    slug: "insaat-projelerinde-zaman-yonetimi",
    title: "İnşaat Projelerinde Zaman Yönetimi: Profesyonel Yaklaşım",
    excerpt: "Projelerin zamanında tamamlanması için kritik stratejiler, planlama teknikleri ve sık yapılan hatalardan kaçınma yolları.",
    content: `
      <p class="lead">İnşaat sektöründe zaman, doğrudan maliyete dönüşür. Her geçen gün; işçilik, ekipman kirası, finansman maliyeti ve fırsat kaybı anlamına gelir. Profesyonel zaman yönetimi, proje başarısının temel taşıdır.</p>

      <div class="quote-box">
        <blockquote>
          "Zamanında tamamlanmayan bir projenin maliyeti, her geçen ay %8-12 artar."
        </blockquote>
        <cite>— İnşaat Sektörü Araştırması, 2024</cite>
      </div>

      <h2>Zaman Kaybının Gerçek Maliyeti</h2>

      <p>Bir inşaat projesinde 1 aylık gecikmenin tipik maliyetleri:</p>

      <ul>
        <li><strong>Direkt maliyetler:</strong> İşçilik, şantiye giderleri, ekipman</li>
        <li><strong>Dolaylı maliyetler:</strong> Kredi faizleri, kira kaybı, yönetim giderleri</li>
        <li><strong>Fırsat maliyeti:</strong> Gelir kaybı, pazar payı kaybı</li>
        <li><strong>İtibar maliyeti:</strong> Müşteri güveni, referans kaybı</li>
      </ul>

      <h2>Etkili Planlama Teknikleri</h2>

      <div class="method-card">
        <h3>📊 Kritik Yol Metodu (CPM)</h3>
        <p>Projedeki en uzun süren aktivite zincirini belirler. Bu yoldaki herhangi bir gecikme, tüm projeyi geciktirir.</p>
        <div class="tip">
          <strong>Uygulama:</strong> Kritik yol üzerindeki aktivitelere öncelik verin ve ekstra kaynak ayırın.
        </div>
      </div>

      <div class="method-card">
        <h3>📈 Gantt Şeması</h3>
        <p>Tüm aktiviteleri, sürelerini ve bağımlılıklarını görselleştirir. Proje ilerlemesini takip etmeyi kolaylaştırır.</p>
        <div class="tip">
          <strong>Uygulama:</strong> Haftalık güncellemelerle canlı tutun, sapmaları erken tespit edin.
        </div>
      </div>

      <div class="method-card">
        <h3>⚡ Agile Yaklaşım</h3>
        <p>Kısa döngüler (sprint) halinde planlama ve uygulama. Değişikliklere hızlı adaptasyon.</p>
        <div class="tip">
          <strong>Uygulama:</strong> 2-4 haftalık döngülerle değerlendirme ve yeniden planlama yapın.
        </div>
      </div>

      <h2>En Sık Yapılan Hatalar</h2>

      <div class="error-list">
        <div class="error-item">
          <span class="error-icon">❌</span>
          <div>
            <h4>1. Gerçekçi Olmayan Tahminler</h4>
            <p>Optimistik süre tahminleri en yaygın hata. Her zaman %15-20 tampon süre ekleyin.</p>
          </div>
        </div>
        <div class="error-item">
          <span class="error-icon">❌</span>
          <div>
            <h4>2. Tedarik Zinciri Yönetimi</h4>
            <p>Malzeme gecikmeleri proje durmasına neden olur. Kritik malzemeleri önceden sipariş edin.</p>
          </div>
        </div>
        <div class="error-item">
          <span class="error-icon">❌</span>
          <div>
            <h4>3. Hava Koşulları</h4>
            <p>Mevsimsel faktörleri plana dahil etmemek. Beton dökümü, izolasyon gibi işleri mevsime göre planlayın.</p>
          </div>
        </div>
        <div class="error-item">
          <span class="error-icon">❌</span>
          <div>
            <h4>4. İletişim Eksikliği</h4>
            <p>Taşeronlar, tedarikçiler ve müşteri ile yetersiz koordinasyon. Düzenli toplantılar şart.</p>
          </div>
        </div>
        <div class="error-item">
          <span class="error-icon">❌</span>
          <div>
            <h4>5. Değişiklik Yönetimi</h4>
            <p>Proje değişikliklerinin süreye etkisini hesaplamamak. Her değişiklik için revize plan yapın.</p>
          </div>
        </div>
      </div>

      <h2>Başarılı Proje İçin Kontrol Listesi</h2>

      <div class="checklist">
        <label><input type="checkbox" disabled> Detaylı iş kırılım yapısı (WBS) hazırlandı</label>
        <label><input type="checkbox" disabled> Kritik yol belirlendi ve önceliklendirildi</label>
        <label><input type="checkbox" disabled> Kaynak planlaması tamamlandı</label>
        <label><input type="checkbox" disabled> Tedarik siparişleri verildi</label>
        <label><input type="checkbox" disabled> Risk analizi yapıldı</label>
        <label><input type="checkbox" disabled> İletişim planı oluşturuldu</label>
        <label><input type="checkbox" disabled> Haftalık ilerleme toplantıları planlandı</label>
        <label><input type="checkbox" disabled> Tampon süreler eklendi</label>
      </div>

      <h2>Teknoloji Kullanımı</h2>

      <p>Modern proje yönetimi araçları, zaman yönetimini büyük ölçüde kolaylaştırır:</p>

      <ul>
        <li><strong>Proje Yönetim Yazılımları:</strong> Microsoft Project, Primavera, Procore</li>
        <li><strong>BIM Entegrasyonu:</strong> 4D BIM ile zaman-mekan koordinasyonu</li>
        <li><strong>Mobil Uygulamalar:</strong> Saha takibi ve anlık raporlama</li>
        <li><strong>Drone Teknolojisi:</strong> İlerleme takibi ve dokümantasyon</li>
      </ul>

      <div class="info-box">
        <strong>💡 Kaldet İnşaat Yaklaşımı:</strong> Her projemizde detaylı zaman planlaması, haftalık ilerleme raporları ve proaktif risk yönetimi uyguluyoruz. %95 üzeri zamanında teslim oranımız bunun kanıtı.
      </div>
    `,
    keywords: "proje yönetimi, zaman yönetimi, inşaat planlama, Gantt, kritik yol, CPM",
    featured: false,
    categorySlug: "proje-yonetimi",
  },
  {
    slug: "baski-beton-uygulamalari-rehberi",
    title: "Baskı Beton: Estetik ve Dayanıklılığın Buluşması",
    excerpt: "Dış mekan zeminleriniz için mükemmel çözüm. Baskı beton tasarım seçenekleri, uygulama süreci ve bakım rehberi.",
    content: `
      <p class="lead">Baskı beton, doğal taş, tuğla veya ahşap görünümünü düşük maliyetle ve üstün dayanıklılıkla sunan dekoratif beton uygulamasıdır. Bahçe, teras, yürüyüş yolu ve ticari alanlarda estetik ve fonksiyonelliği bir arada sunar.</p>

      <h2>Neden Baskı Beton?</h2>

      <div class="benefits-grid">
        <div class="benefit-item">
          <span class="benefit-icon">💰</span>
          <h4>Ekonomik</h4>
          <p>Doğal taşa göre %40-60 daha uygun fiyat</p>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">💪</span>
          <h4>Dayanıklı</h4>
          <p>25+ yıl ömür, minimum bakım</p>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">🎨</span>
          <h4>Estetik</h4>
          <p>Sınırsız desen ve renk seçeneği</p>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">⚡</span>
          <h4>Hızlı</h4>
          <p>Tek seferde büyük alanlar</p>
        </div>
      </div>

      <h2>Popüler Desen Seçenekleri</h2>

      <div class="pattern-gallery">
        <div class="pattern-item">
          <h4>🪨 Doğal Taş</h4>
          <p>Granit, mermer, kayrak taşı görünümleri. Havuz kenarı ve bahçeler için ideal.</p>
        </div>
        <div class="pattern-item">
          <h4>🧱 Tuğla & Parke</h4>
          <p>Klasik tuğla, kilitli parke desenleri. Yürüyüş yolları ve garaj girişleri.</p>
        </div>
        <div class="pattern-item">
          <h4>🪵 Ahşap Doku</h4>
          <p>Kereste, deck görünümü. Teras ve balkonlar için doğal his.</p>
        </div>
        <div class="pattern-item">
          <h4>🏛️ Antik & Rustik</h4>
          <p>Yaşlandırılmış taş, Roma tarzı. Restoranlar ve butik mekanlar.</p>
        </div>
      </div>

      <h2>Renk Seçenekleri</h2>

      <p>Baskı betonda iki tür renklendirme kullanılır:</p>

      <ul>
        <li><strong>Ana Renk (Hardener):</strong> Yüzeye serpilen, aşınmaya dayanıklı pigment</li>
        <li><strong>Antik Renk (Release):</strong> Desen derinliğini vurgulayan ikinci ton</li>
      </ul>

      <p>En popüler kombinasyonlar:</p>
      <ul>
        <li>Terracotta + Kahverengi (Akdeniz tarzı)</li>
        <li>Gri + Antrasit (Modern minimalist)</li>
        <li>Bej + Krem (Klasik şık)</li>
        <li>Yeşil-gri + Koyu gri (Doğal kayrak)</li>
      </ul>

      <h2>Uygulama Süreci</h2>

      <div class="step-visual">
        <div class="step-v">
          <div class="step-num">01</div>
          <h4>Zemin Hazırlığı</h4>
          <p>Kazı, sıkıştırma, stabilize alt tabaka hazırlanır.</p>
        </div>
        <div class="step-v">
          <div class="step-num">02</div>
          <h4>Beton Dökümü</h4>
          <p>C25-C30 sınıfı beton dökülür, vibratörle sıkıştırılır.</p>
        </div>
        <div class="step-v">
          <div class="step-num">03</div>
          <h4>Renk Uygulaması</h4>
          <p>Ana renk hardener serpilir ve mastayla yayılır.</p>
        </div>
        <div class="step-v">
          <div class="step-num">04</div>
          <h4>Kalıp Baskı</h4>
          <p>Antik release sürülür, desen kalıpları basılır.</p>
        </div>
        <div class="step-v">
          <div class="step-num">05</div>
          <h4>Yıkama & Kür</h4>
          <p>Fazla release yıkanır, beton kür sürecine girer.</p>
        </div>
        <div class="step-v">
          <div class="step-num">06</div>
          <h4>Koruyucu Lak</h4>
          <p>UV dayanımlı akrilik lak ile yüzey korunur.</p>
        </div>
      </div>

      <h2>Bakım ve Koruma</h2>

      <div class="maintenance-tips">
        <div class="tip-card">
          <h4>🧹 Düzenli Temizlik</h4>
          <p>Basınçlı su ile yılda 2-3 kez yıkama yeterlidir. Yosun ve kir birikimini önler.</p>
        </div>
        <div class="tip-card">
          <h4>🛡️ Lak Yenileme</h4>
          <p>Her 3-5 yılda koruyucu lak yenilenmelidir. Renk canlılığını ve su iticilik özelliğini korur.</p>
        </div>
        <div class="tip-card">
          <h4>🔧 Çatlak Onarımı</h4>
          <p>Küçük çatlaklar epoksi dolgu ile kolayca onarılır. Erken müdahale yayılmayı önler.</p>
        </div>
      </div>

      <div class="warning-box">
        <strong>⚠️ Önemli:</strong> Tuz, asit içeren temizlik maddeleri ve metal fırça kullanmayın. Yüzey kaplamasına zarar verebilir.
      </div>

      <h2>Fiyatlandırma</h2>

      <p>Baskı beton maliyetini etkileyen faktörler:</p>

      <ul>
        <li>Alan büyüklüğü (m²)</li>
        <li>Desen karmaşıklığı</li>
        <li>Zemin hazırlık durumu</li>
        <li>Özel renk talepleri</li>
        <li>Ulaşım mesafesi</li>
      </ul>

      <div class="cta-box">
        <h3>Projeniz İçin Fiyat Teklifi</h3>
        <p>Ücretsiz keşif ve metrekare bazlı net fiyat teklifi için hemen iletişime geçin.</p>
        <a href="/teklif-hesapla" class="cta-button">Online Teklif Al →</a>
      </div>
    `,
    keywords: "baskı beton, dekoratif beton, stamped concrete, bahçe zemin, dış mekan zemin, peyzaj",
    featured: false,
    categorySlug: "malzeme-bilgisi",
  },
  {
    slug: "2025-insaat-sektoru-trendleri",
    title: "2025 İnşaat Sektörü: Teknoloji ve Sürdürülebilirlik",
    excerpt: "Yapay zeka, 3D baskı, yeşil binalar ve dijital dönüşüm. 2025'te inşaat sektörünü şekillendirecek trendler.",
    content: `
      <p class="lead">İnşaat sektörü, tarihinin en büyük dönüşümünü yaşıyor. Dijitalleşme, sürdürülebilirlik baskısı ve yeni teknolojiler, sektörün DNA'sını değiştiriyor. 2025'te öne çıkacak trendleri analiz ediyoruz.</p>

      <div class="trend-header">
        <span class="trend-year">2025</span>
        <h2>Öne Çıkan Trendler</h2>
      </div>

      <div class="trend-card">
        <div class="trend-number">01</div>
        <div class="trend-content">
          <h3>🤖 Yapay Zeka ve Otomasyon</h3>
          <p>AI destekli tasarım optimizasyonu, risk tahmini ve proje yönetimi artık lüks değil, zorunluluk. Öne çıkan uygulamalar:</p>
          <ul>
            <li><strong>Generative Design:</strong> AI'ın binlerce tasarım alternatifi üretmesi</li>
            <li><strong>Predictive Analytics:</strong> Maliyet ve süre tahminlerinde %30+ iyileşme</li>
            <li><strong>Safety AI:</strong> Şantiye güvenlik risklerinin önceden tespiti</li>
            <li><strong>Quality Control:</strong> Görüntü işleme ile otomatik kalite kontrolü</li>
          </ul>
        </div>
      </div>

      <div class="trend-card">
        <div class="trend-number">02</div>
        <div class="trend-content">
          <h3>🏗️ 3D Baskı Teknolojisi</h3>
          <p>Beton 3D yazıcılar, özellikle prefabrik elemanlar ve özel geometrilerde devrim yaratıyor.</p>
          <div class="stat-inline">
            <span><strong>%50</strong> Malzeme tasarrufu</span>
            <span><strong>%70</strong> İşçilik azalması</span>
            <span><strong>%90</strong> Atık azalması</span>
          </div>
        </div>
      </div>

      <div class="trend-card">
        <div class="trend-number">03</div>
        <div class="trend-content">
          <h3>🌱 Yeşil ve Sürdürülebilir İnşaat</h3>
          <p>Karbon nötr hedefleri ve çevre düzenlemeleri, yeşil inşaatı zorunlu kılıyor:</p>
          <ul>
            <li>LEED, BREEAM, EDGE sertifikalı binalar</li>
            <li>Düşük karbonlu beton ve çelik alternatifleri</li>
            <li>Geri dönüştürülmüş malzeme kullanımı</li>
            <li>Sıfır atık şantiye yönetimi</li>
            <li>Enerji pozitif bina tasarımları</li>
          </ul>
        </div>
      </div>

      <div class="trend-card">
        <div class="trend-number">04</div>
        <div class="trend-content">
          <h3>🔗 Dijital İkiz (Digital Twin)</h3>
          <p>Binaların gerçek zamanlı dijital kopyaları, tüm yaşam döngüsünde değer yaratıyor:</p>
          <ul>
            <li>İnşaat sürecinde clash detection</li>
            <li>İşletme aşamasında enerji optimizasyonu</li>
            <li>Bakım-onarım planlaması</li>
            <li>Senaryo simülasyonları</li>
          </ul>
        </div>
      </div>

      <div class="trend-card">
        <div class="trend-number">05</div>
        <div class="trend-content">
          <h3>📱 Modüler ve Prefabrik Yapılar</h3>
          <p>Off-site üretim, kalite ve hız avantajıyla yükseliyor:</p>
          <div class="benefit-list">
            <span>✓ %60 daha hızlı inşaat</span>
            <span>✓ %20 maliyet avantajı</span>
            <span>✓ Tutarlı kalite</span>
            <span>✓ Minimum şantiye atığı</span>
          </div>
        </div>
      </div>

      <h2>Türkiye Perspektifi</h2>

      <p>Türkiye inşaat sektörü için 2025 öngörüleri:</p>

      <div class="insight-box">
        <h4>📈 Fırsatlar</h4>
        <ul>
          <li>Kentsel dönüşüm projeleri ivme kazanacak</li>
          <li>Deprem güvenli yapı talebi artacak</li>
          <li>Yeşil bina sertifikaları yaygınlaşacak</li>
          <li>Endüstriyel tesis yatırımları sürecek</li>
        </ul>
      </div>

      <div class="insight-box">
        <h4>⚡ Zorluklar</h4>
        <ul>
          <li>Malzeme fiyat volatilitesi</li>
          <li>Nitelikli işgücü açığı</li>
          <li>Dijital dönüşüm yatırım maliyetleri</li>
          <li>Regülasyon değişiklikleri</li>
        </ul>
      </div>

      <h2>Kaldet İnşaat'ın Yaklaşımı</h2>

      <p>30+ yıllık tecrübemizi, yeni teknolojilerle birleştiriyoruz:</p>

      <ul>
        <li>BIM tabanlı proje yönetimi</li>
        <li>Sürdürülebilir malzeme tercihleri</li>
        <li>Dijital şantiye takip sistemleri</li>
        <li>Sürekli eğitim ve gelişim programları</li>
      </ul>

      <div class="cta-box">
        <h3>Geleceğe Hazır Projeler</h3>
        <p>Modern teknolojiler ve sürdürülebilir yaklaşımla projenizi hayata geçirelim.</p>
        <a href="/iletisim" class="cta-button">İletişime Geçin →</a>
      </div>
    `,
    keywords: "inşaat trendleri, sürdürülebilir inşaat, BIM, yapay zeka, 3D baskı, yeşil bina, 2025",
    featured: true,
    categorySlug: "sektor-haberleri",
  },
  {
    slug: "zemin-hazirligi-rehberi",
    title: "Mükemmel Zemin İçin Hazırlık Rehberi",
    excerpt: "Zemin uygulamalarında başarının anahtarı doğru hazırlıktır. Adım adım hazırlık sürecini ve profesyonel ipuçlarını paylaşıyoruz.",
    content: `
      <p class="lead">Epoksi, poliüretan veya endüstriyel beton fark etmez - tüm zemin kaplamalarının başarısı, zemin hazırlığının kalitesine bağlıdır. Yetersiz hazırlık, en kaliteli malzemeyi bile kısa sürede sorunlu hale getirir.</p>

      <div class="warning-box">
        <strong>⚠️ Kritik Uyarı:</strong> Zemin kaplama başarısızlıklarının %80'i yetersiz zemin hazırlığından kaynaklanır. Bu aşamada tasarruf, uzun vadede yüksek maliyete dönüşür.
      </div>

      <h2>Zemin Analizi</h2>

      <p>Hazırlık öncesi mutlaka yapılması gereken testler:</p>

      <div class="test-grid">
        <div class="test-item">
          <h4>💧 Nem Testi</h4>
          <p>Kalsiyum klorür veya nem ölçer ile zemin nem oranı belirlenir. Epoksi için maksimum %4 nem oranı kabul edilir.</p>
          <p><strong>Yöntem:</strong> 24-72 saat polietilen film testi</p>
        </div>
        <div class="test-item">
          <h4>💪 Çekme Testi</h4>
          <p>Pull-off testi ile betonun yüzey mukavemeti ölçülür. Minimum 1.5 N/mm² gereklidir.</p>
          <p><strong>Yöntem:</strong> Çekme test cihazı ile ölçüm</p>
        </div>
        <div class="test-item">
          <h4>📐 Düzlük Kontrolü</h4>
          <p>3 metre mira ile zemin düzlüğü kontrol edilir. Self-leveling için ±3mm tolerans.</p>
          <p><strong>Yöntem:</strong> Lazer nivo ve şablon</p>
        </div>
        <div class="test-item">
          <h4>🧪 Kontaminasyon</h4>
          <p>Yağ, gres, kür malzemesi, boya kalıntıları tespit edilir.</p>
          <p><strong>Yöntem:</strong> Su damlatma ve görsel inceleme</p>
        </div>
      </div>

      <h2>Hazırlık Yöntemleri</h2>

      <h3>1. Mekanik Hazırlık</h3>

      <div class="method-comparison">
        <div class="method-item">
          <h4>Diamond Grinding</h4>
          <p>Elmas diskli taşlama makinesi ile yüzey pürüzlendirilir.</p>
          <ul>
            <li>✓ İnce kaplama öncesi ideal</li>
            <li>✓ Düşük toz</li>
            <li>✓ Hassas kontrol</li>
            <li>✗ Derin temizlik için yetersiz</li>
          </ul>
        </div>
        <div class="method-item">
          <h4>Shot Blasting</h4>
          <p>Çelik bilyeler ile yüzey temizlenir ve pürüzlendirilir.</p>
          <ul>
            <li>✓ Derin temizlik</li>
            <li>✓ Geniş alanlarda hızlı</li>
            <li>✓ Eski kaplamaları kaldırır</li>
            <li>✗ Ekipman maliyeti yüksek</li>
          </ul>
        </div>
        <div class="method-item">
          <h4>Scarifying</h4>
          <p>Döner bıçaklar ile yüzey kazınır.</p>
          <ul>
            <li>✓ Kalın kaplamaları kaldırır</li>
            <li>✓ Derin profil oluşturur</li>
            <li>✗ Agresif, zemine zarar verebilir</li>
            <li>✗ Düzleştirme gerektirir</li>
          </ul>
        </div>
      </div>

      <h3>2. Onarım İşlemleri</h3>

      <div class="repair-list">
        <div class="repair-item">
          <span class="repair-icon">🔧</span>
          <div>
            <h4>Çatlak Onarımı</h4>
            <p><strong>İnce çatlaklar (&lt;3mm):</strong> Epoksi enjeksiyon</p>
            <p><strong>Geniş çatlaklar (&gt;3mm):</strong> V kesim + epoksi mortar dolgu</p>
          </div>
        </div>
        <div class="repair-item">
          <span class="repair-icon">🕳️</span>
          <div>
            <h4>Delik ve Oyuk</h4>
            <p>Epoksi mortar veya polimer modifiye tamir harcı ile doldurma.</p>
          </div>
        </div>
        <div class="repair-item">
          <span class="repair-icon">📏</span>
          <div>
            <h4>Seviye Düzeltme</h4>
            <p>Self-leveling şap ile düzensizliklerin giderilmesi.</p>
          </div>
        </div>
      </div>

      <h2>Astar Uygulaması</h2>

      <p>Doğru astar seçimi, kaplama performansını doğrudan etkiler:</p>

      <table class="primer-table">
        <thead>
          <tr>
            <th>Zemin Durumu</th>
            <th>Önerilen Astar</th>
            <th>Özellik</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standart beton</td>
            <td>Epoksi primer</td>
            <td>Genel amaçlı, iyi penetrasyon</td>
          </tr>
          <tr>
            <td>Nemli zemin</td>
            <td>Nem toleranslı primer</td>
            <td>%6'ya kadar nem ile uygulanabilir</td>
          </tr>
          <tr>
            <td>Zayıf yüzey</td>
            <td>Konsolidasyon primer</td>
            <td>Zayıf yüzeyi güçlendirir</td>
          </tr>
          <tr>
            <td>Yağlı zemin</td>
            <td>Özel yağ blokeri</td>
            <td>Yağ migrasyonunu önler</td>
          </tr>
        </tbody>
      </table>

      <h2>Kontrol Listesi</h2>

      <div class="final-checklist">
        <h4>Uygulama Öncesi Son Kontrol</h4>
        <label><input type="checkbox" disabled> Nem ölçümü yapıldı ve uygun (%4 altı)</label>
        <label><input type="checkbox" disabled> Yüzey temiz, toz ve kir yok</label>
        <label><input type="checkbox" disabled> Çatlaklar ve hasarlar onarıldı</label>
        <label><input type="checkbox" disabled> Düzlük kontrolü yapıldı</label>
        <label><input type="checkbox" disabled> Astar uygulandı ve kürlendi</label>
        <label><input type="checkbox" disabled> Ortam sıcaklığı uygun (10-30°C)</label>
        <label><input type="checkbox" disabled> Rölatif nem %80 altında</label>
      </div>

      <div class="cta-box">
        <h3>Profesyonel Zemin Hazırlığı</h3>
        <p>Doğru ekipman ve deneyimli ekiple zemin hazırlığı için bize ulaşın.</p>
        <a href="/iletisim" class="cta-button">Ücretsiz Keşif →</a>
      </div>
    `,
    keywords: "zemin hazırlığı, beton hazırlığı, shot blasting, diamond grinding, epoksi astar",
    featured: false,
    categorySlug: "ipuclari",
  },
  {
    slug: "insaat-malzemelerinde-kalite-kontrolu",
    title: "İnşaat Malzemelerinde Kalite Kontrolü Rehberi",
    excerpt: "TSE, CE ve uluslararası standartlara uygunluk. Malzeme kabul, test ve dokümantasyon süreçleri hakkında kapsamlı bilgi.",
    content: `
      <p class="lead">İnşaat malzemelerinde kalite kontrolü, yapının güvenliği, dayanıklılığı ve uzun ömrü için temel gerekliliktir. Standartlara uygun olmayan malzemeler, ciddi güvenlik riskleri ve yasal sorunlara yol açabilir.</p>

      <div class="standards-box">
        <h3>🏛️ Temel Standart ve Sertifikalar</h3>
        <div class="standard-list">
          <div class="standard-item">
            <strong>TSE</strong>
            <p>Türk Standartları Enstitüsü - Ulusal standart belgesi</p>
          </div>
          <div class="standard-item">
            <strong>CE</strong>
            <p>Avrupa Birliği uygunluk işareti</p>
          </div>
          <div class="standard-item">
            <strong>ISO</strong>
            <p>Uluslararası kalite yönetim standartları</p>
          </div>
          <div class="standard-item">
            <strong>G İşareti</strong>
            <p>Zorunlu standartlara uygunluk belgesi</p>
          </div>
        </div>
      </div>

      <h2>Malzeme Bazlı Kalite Kontrol</h2>

      <div class="material-section">
        <h3>🏗️ Beton ve Çimento</h3>
        <div class="control-points">
          <div class="control-item">
            <h4>Kabul Kontrolleri</h4>
            <ul>
              <li>Transmikser fişi kontrolü (miktar, sınıf, katkı)</li>
              <li>Slump (çökme) testi - her 50m³'de bir</li>
              <li>Hava sıcaklığı ve beton sıcaklığı ölçümü</li>
              <li>Görsel kontrol (segregasyon, su ayrışması)</li>
            </ul>
          </div>
          <div class="control-item">
            <h4>Laboratuvar Testleri</h4>
            <ul>
              <li>7 ve 28 günlük basınç dayanımı testleri</li>
              <li>Küp numune alımı (her 100m³'de 6 adet)</li>
              <li>Su/çimento oranı kontrolü</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="material-section">
        <h3>🔩 Çelik ve Demir</h3>
        <div class="control-points">
          <div class="control-item">
            <h4>Belge Kontrolleri</h4>
            <ul>
              <li>Fabrika test sertifikası (3.1 belgesi)</li>
              <li>Isıl işlem belgesi</li>
              <li>CE uygunluk beyanı</li>
              <li>Parti numarası ve izlenebilirlik</li>
            </ul>
          </div>
          <div class="control-item">
            <h4>Fiziksel Testler</h4>
            <ul>
              <li>Çekme testi (akma, kopma dayanımı)</li>
              <li>Bükme testi</li>
              <li>Nervür geometrisi kontrolü</li>
              <li>Korozyon kontrolü</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="material-section">
        <h3>🧱 Tuğla ve Blok</h3>
        <div class="control-points">
          <div class="control-item">
            <h4>Kontrol Noktaları</h4>
            <ul>
              <li>Boyut toleransları</li>
              <li>Basınç dayanımı sınıfı</li>
              <li>Su emme oranı</li>
              <li>Donma-çözülme dayanımı</li>
              <li>Görsel kusur kontrolü (çatlak, kırık)</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="material-section">
        <h3>🎨 Boya ve Kaplamalar</h3>
        <div class="control-points">
          <div class="control-item">
            <h4>Kontrol Noktaları</h4>
            <ul>
              <li>Üretim ve son kullanma tarihi</li>
              <li>Parti numarası tutarlılığı</li>
              <li>Depolama koşulları</li>
              <li>Teknik veri sayfası (TDS) uyumu</li>
              <li>Viskozite ve yoğunluk kontrolü</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Kalite Kontrol Süreci</h2>

      <div class="process-timeline">
        <div class="process-step">
          <div class="step-icon">📋</div>
          <h4>1. Sipariş Aşaması</h4>
          <p>Teknik şartname hazırlama, onaylı tedarikçi listesi, sipariş doğrulama</p>
        </div>
        <div class="process-step">
          <div class="step-icon">🚚</div>
          <h4>2. Teslimat Kontrolü</h4>
          <p>İrsaliye-sipariş eşleştirme, görsel kontrol, miktar sayımı</p>
        </div>
        <div class="process-step">
          <div class="step-icon">🔬</div>
          <h4>3. Test ve Muayene</h4>
          <p>Numune alma, saha/laboratuvar testleri, sonuç değerlendirme</p>
        </div>
        <div class="process-step">
          <div class="step-icon">✅</div>
          <h4>4. Kabul/Red Kararı</h4>
          <p>Uygunluk değerlendirmesi, kabul veya iade işlemi</p>
        </div>
        <div class="process-step">
          <div class="step-icon">📁</div>
          <h4>5. Dokümantasyon</h4>
          <p>Test raporları, sertifikalar, izlenebilirlik kayıtları</p>
        </div>
      </div>

      <h2>Dokümantasyon</h2>

      <p>Her malzeme için tutulması gereken kayıtlar:</p>

      <div class="doc-list">
        <div class="doc-item">
          <span class="doc-icon">📄</span>
          <div>
            <strong>Uygunluk Beyanı</strong>
            <p>CE veya G işareti uygunluk dokümanı</p>
          </div>
        </div>
        <div class="doc-item">
          <span class="doc-icon">📊</span>
          <div>
            <strong>Test Raporları</strong>
            <p>Fabrika ve şantiye test sonuçları</p>
          </div>
        </div>
        <div class="doc-item">
          <span class="doc-icon">🏷️</span>
          <div>
            <strong>İzlenebilirlik</strong>
            <p>Parti numarası, tedarikçi, kullanım yeri kaydı</p>
          </div>
        </div>
        <div class="doc-item">
          <span class="doc-icon">📸</span>
          <div>
            <strong>Fotoğraf Dokümantasyonu</strong>
            <p>Teslimat, depolama ve uygulama fotoğrafları</p>
          </div>
        </div>
      </div>

      <div class="info-box">
        <strong>💡 Kaldet İnşaat Kalite Politikası:</strong> Tüm projelerimizde ISO 9001 kalite yönetim sistemine uygun malzeme kontrolü uyguluyoruz. Her malzeme grubu için giriş kontrol prosedürlerimiz ve izlenebilirlik sistemimiz mevcuttur.
      </div>
    `,
    keywords: "kalite kontrol, TSE, CE belgesi, inşaat malzemesi, beton testi, çelik testi",
    featured: false,
    categorySlug: "malzeme-bilgisi",
  },
  {
    slug: "endustriyel-tesislerde-guvenlik-onlemleri",
    title: "Endüstriyel Tesislerde Güvenlik: Kapsamlı Rehber",
    excerpt: "İş kazalarını önlemek için endüstriyel tesislerde alınması gereken güvenlik önlemleri, zemin güvenliği ve yasal yükümlülükler.",
    content: `
      <p class="lead">Endüstriyel tesislerde iş güvenliği, çalışan sağlığının korunması ve yasal uyumluluğun ötesinde, operasyonel verimliliğin de temel taşıdır. Kazalar; üretim kaybı, tazminat maliyetleri ve itibar zararına neden olur.</p>

      <div class="stat-highlight">
        <div class="stat-box">
          <span class="stat-value">%60</span>
          <span class="stat-desc">İş kazalarının önlenebilir olduğu tahmin ediliyor</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">%25</span>
          <span class="stat-desc">Kazaların kayma ve düşmeden kaynaklanıyor</span>
        </div>
      </div>

      <h2>Temel Güvenlik Alanları</h2>

      <div class="safety-grid">
        <div class="safety-card">
          <div class="safety-icon">🦺</div>
          <h4>Kişisel Koruyucu Donanım (KKD)</h4>
          <ul>
            <li>Baret / Koruyucu başlık</li>
            <li>Güvenlik gözlüğü / Yüz siperi</li>
            <li>İş eldiveni (kesik, kimyasal, ısı)</li>
            <li>Güvenlik ayakkabısı (çelik burun)</li>
            <li>Yüksek görünürlük yeleği</li>
            <li>Kulaklık / Kulak tıkacı</li>
            <li>Solunum koruyucu maske</li>
          </ul>
        </div>
        <div class="safety-card">
          <div class="safety-icon">🚧</div>
          <h4>Fiziksel Güvenlik Önlemleri</h4>
          <ul>
            <li>Makine koruyucuları</li>
            <li>Güvenlik bariyerleri</li>
            <li>Acil durdurma butonları</li>
            <li>Kilitleme/Etiketleme (LOTO)</li>
            <li>Emniyet sensörleri</li>
            <li>Uyarı işaret ve levhaları</li>
          </ul>
        </div>
      </div>

      <h2>Zemin Güvenliği</h2>

      <div class="floor-safety">
        <p>Endüstriyel tesislerde zemin güvenliği, en kritik ancak sıklıkla göz ardı edilen konulardan biridir. Doğru zemin seçimi ve bakımı, kayma/düşme kazalarını büyük ölçüde önler.</p>

        <div class="floor-types">
          <div class="floor-type">
            <h4>🔶 Anti-Slip Epoksi</h4>
            <p>Kuvars agregat katkılı, R10-R13 kaymaz sınıfı. Islak alanlarda ve rampalarda önerilir.</p>
          </div>
          <div class="floor-type">
            <h4>🔷 Poliüretan Kaplama</h4>
            <p>Elastik yapı, termal şok dayanımı. Gıda ve soğuk depo zeminlerinde ideal.</p>
          </div>
          <div class="floor-type">
            <h4>🔶 Endüstriyel Beton</h4>
            <p>Yüzey sertleştirici ile aşınma direnci. Ağır trafik alanlarında ekonomik çözüm.</p>
          </div>
        </div>

        <div class="floor-checklist">
          <h4>Zemin Güvenlik Kontrol Listesi</h4>
          <label><input type="checkbox" disabled> Kayma direnci testi yapıldı (EN 13036-4)</label>
          <label><input type="checkbox" disabled> Zemin işaretlemeleri görünür durumda</label>
          <label><input type="checkbox" disabled> Drenaj sistemi çalışıyor</label>
          <label><input type="checkbox" disabled> Çatlak ve hasar yok</label>
          <label><input type="checkbox" disabled> Yağ/kimyasal döküntüsü temizlendi</label>
          <label><input type="checkbox" disabled> Eşikler ve seviye farkları işaretli</label>
        </div>
      </div>

      <h2>Acil Durum Hazırlığı</h2>

      <div class="emergency-section">
        <div class="emergency-item">
          <h4>🚨 Acil Çıkışlar</h4>
          <ul>
            <li>Her çalışandan maks. 25m mesafede acil çıkış</li>
            <li>Aydınlatmalı ve işaretli çıkış levhaları</li>
            <li>Engelsiz kaçış yolları (min. 120cm genişlik)</li>
            <li>Panik barlı kapılar</li>
          </ul>
        </div>
        <div class="emergency-item">
          <h4>🧯 Yangın Güvenliği</h4>
          <ul>
            <li>Risk sınıfına uygun söndürücüler</li>
            <li>Sprinkler/dedektör sistemleri</li>
            <li>Yangın dolapları ve hortum makaraları</li>
            <li>Düzenli yangın tatbikatları</li>
          </ul>
        </div>
        <div class="emergency-item">
          <h4>🏥 İlk Yardım</h4>
          <ul>
            <li>Her 50 çalışana 1 ilkyardım dolabı</li>
            <li>Eğitimli ilkyardımcı personel</li>
            <li>Göz yıkama istasyonları (kimyasal alanlarda)</li>
            <li>Sedye ve acil müdahale ekipmanları</li>
          </ul>
        </div>
      </div>

      <h2>Yasal Yükümlülükler</h2>

      <div class="legal-box">
        <h4>📜 6331 Sayılı İş Sağlığı ve Güvenliği Kanunu</h4>
        <ul>
          <li>Risk değerlendirmesi zorunluluğu</li>
          <li>İş güvenliği uzmanı ve işyeri hekimi istihdamı</li>
          <li>Çalışan eğitimleri</li>
          <li>Periyodik kontrol ve muayeneler</li>
          <li>Kaza raporlama ve kayıt yükümlülüğü</li>
        </ul>
      </div>

      <h2>Güvenlik Kültürü Oluşturma</h2>

      <div class="culture-tips">
        <div class="culture-item">
          <span class="culture-icon">👥</span>
          <h4>Çalışan Katılımı</h4>
          <p>Güvenlik komiteleri, öneri sistemleri, tehlike bildirimi teşviki</p>
        </div>
        <div class="culture-item">
          <span class="culture-icon">📚</span>
          <h4>Sürekli Eğitim</h4>
          <p>Düzenli güvenlik eğitimleri, toolbox toplantıları, sertifikasyon programları</p>
        </div>
        <div class="culture-item">
          <span class="culture-icon">📊</span>
          <h4>Performans İzleme</h4>
          <p>Güvenlik KPI'ları, kaza/ramak kala istatistikleri, düzeltici faaliyetler</p>
        </div>
        <div class="culture-item">
          <span class="culture-icon">🏆</span>
          <h4>Takdir ve Ödüllendirme</h4>
          <p>Güvenli davranışların ödüllendirilmesi, başarı hikayelerinin paylaşımı</p>
        </div>
      </div>

      <div class="cta-box">
        <h3>Güvenli Zemin Çözümleri</h3>
        <p>Tesisiniz için anti-slip zemin çözümleri ve güvenlik danışmanlığı için bize ulaşın.</p>
        <a href="/iletisim" class="cta-button">İletişime Geçin →</a>
      </div>
    `,
    keywords: "iş güvenliği, endüstriyel güvenlik, zemin güvenliği, KKD, 6331 kanunu, iş kazası",
    featured: false,
    categorySlug: "ipuclari",
  },
]

async function main() {
  console.log("🌱 Blog kategorileri ve yazıları ekleniyor...\n")

  // Get admin user
  const adminUser = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  })

  if (!adminUser) {
    console.error("❌ Admin kullanıcı bulunamadı. Lütfen önce admin kullanıcı oluşturun.")
    process.exit(1)
  }

  // Create categories
  const createdCategories: { [key: string]: string } = {}

  for (const categoryData of categories) {
    const category = await prisma.blogCategory.upsert({
      where: { slug: categoryData.slug },
      update: {
        name: categoryData.name,
        description: categoryData.description,
        order: categoryData.order,
      },
      create: categoryData,
    })
    createdCategories[categoryData.slug] = category.id
    console.log(`✅ Kategori oluşturuldu: ${category.name}`)
  }

  // Create blog posts
  for (const postData of blogPosts) {
    const categoryId = createdCategories[postData.categorySlug]

    if (!categoryId) {
      console.error(`❌ Kategori bulunamadı: ${postData.categorySlug}`)
      continue
    }

    const publishedAt = new Date()
    publishedAt.setDate(publishedAt.getDate() - Math.floor(Math.random() * 90)) // Random date in last 90 days

    const post = await prisma.blogPost.upsert({
      where: { slug: postData.slug },
      update: {
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content.trim(),
        keywords: postData.keywords,
        featured: postData.featured,
        categoryId: categoryId,
        status: "PUBLISHED",
        publishedAt: publishedAt,
      },
      create: {
        slug: postData.slug,
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content.trim(),
        keywords: postData.keywords,
        featured: postData.featured,
        categoryId: categoryId,
        status: "PUBLISHED",
        publishedAt: publishedAt,
        createdById: adminUser.id,
        viewCount: Math.floor(Math.random() * 500) + 50, // Random view count
      },
    })

    console.log(`✅ Blog yazısı oluşturuldu: ${post.title}`)
  }

  console.log(`\n✅ Toplam ${categories.length} kategori ve ${blogPosts.length} blog yazısı eklendi!`)
}

main()
  .catch((e) => {
    console.error("❌ Hata:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
