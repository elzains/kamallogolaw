// START JSON DATA STRUCTURE FOR PRICING CARD
const pricingData = [
  {
    title: "Basic",
    price: "100rb",
    features: [
      "Batas revisi 6x",
      "File PNG, CDR & PDF"
    ],
    wa: "Halo%2C%20saya%20tertarik%20dengan%20Paket%20Basic%20Desain%20Logo%20100rb.%20Mohon%20info%20lebih%20lanjut.",
    pixel: { name: "Basic", value: 100000 }
  },
  {
    title: "Standar",
    price: "150rb",
    features: [
      "Batas revisi 10x",
      "File PNG, CDR & PDF",
      "Bonus desain kop surat"
    ],
    wa: "Halo%2C%20saya%20tertarik%20dengan%20Paket%20Standar.%20Mohon%20info%20lebih%20lanjut.",
    pixel: { name: "Standar", value: 150000 }
  },
  {
    title: "Premium",
    price: "250rb",
    features: [
      "Batas revisi 15x",
      "File PNG, CDR & PDF",
      "Bonus desain kop surat, kartu nama, desain stempel"
    ],
    wa: "Halo%2C%20saya%20tertarik%20dengan%20Paket%20Premium.%20Mohon%20info%20lebih%20lanjut.",
    pixel: { name: "Premium", value: 250000 }
  },
  {
    title: "Extra Premium",
    price: "350rb",
    features: [
      "Revisi Unlimited",
      "File PNG, CDR & PDF",
      "Bonus desain kop surat, kartu nama, desain stempel, filosofi logo"
    ],
    wa: "Halo%2C%20saya%20tertarik%20dengan%20Paket%20Extra%20Premium.%20Mohon%20info%20lebih%20lanjut.",
    pixel: { name: "Extra Premium", value: 350000 }
  }
];
// START JSON DATA STRUCTURE FOR PRICING CARD

// START GET DATA IMAGE PORTFOLIO FROM GITHUBHOST
const images = Array.from({ length: 29 }, (_, i) => ({
  src: `https://raw.githubusercontent.com/mkamal03031991/portfolio-logo/main/${i + 1}.png`,
  alt: `Logo Kantor Hukum Profesional ${i + 1}`
}));
const container = document.getElementById("portfolioContainer");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
// Load images
autoLoad();
function autoLoad() {
  images.forEach(img => {
    const el = document.createElement("div");
    el.className = "bg-white rounded-xl shadow flex items-center justify-center";
    el.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="w-full h-auto object-contain rounded-xl">`;
    container.appendChild(el);
  });
}
// END GET DATA IMAGE PORTFOLIO FROM GITHUBHOST

// START DYNAMIC LOOP FOR CARD PRICING
function renderPricingCards() {
  const wrapper = document.getElementById("pricing-wrapper");

  wrapper.innerHTML = pricingData.map(item => {
    const featureList = item.features
      .map(f => `<li>${f}</li>`)
      .join("");

    return `
      <div class="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center border border-gray-200 flex flex-col">
        <h3 class="text-xl font-semibold text-gray-800 mb-1">${item.title}</h3>
        <p class="text-3xl font-bold text-gray-900 mb-4">${item.price}</p>
        <ul class="text-gray-600 text-sm leading-relaxed mb-6 text-left list-disc list-inside">
          ${featureList}
        </ul>

        <a
          href="https://wa.me/6281131122225?text=${item.wa}"
          target="_blank"
          rel="noopener"
          onclick="fbq('track', 'AddToCart', {content_name: '${item.pixel.name}', value: ${item.pixel.value}});"
          class="mt-auto inline-block w-full bg-gray-800 text-white py-2 rounded-xl font-medium hover:bg-gray-900 transition"
        >
          Ngobrol Sekarang <span style="font-style:italic;">!</span>
        </a>
      </div>
    `;
  }).join("");
}
renderPricingCards();
lucide.createIcons();
// END DYNAMIC LOOP FOR CARD PRICING

// START CS
const waBtn = document.getElementById('waBtn');
    const card = document.getElementById('card');
    const closeCard = document.getElementById('closeCard');
    const csItems = document.querySelectorAll('.cs-item');

    function openPanel() {
      card.classList.remove('hidden');
      waBtn.setAttribute('aria-expanded', 'true');
      card.classList.add('panel-enter-active');
      setTimeout(()=> card.classList.remove('panel-enter-active'), 220);
    }
    function closePanel() {
      card.classList.add('panel-leave-active');
      setTimeout(()=>{
        card.classList.remove('panel-leave-active');
        card.classList.add('hidden');
      }, 140);
      waBtn.setAttribute('aria-expanded', 'false');
    }

    // STOP PROPAGATION agar document click tidak menutup panel saat kita klik tombol atau isi panel
    waBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // <<< penting
      e.preventDefault();
      if (card.classList.contains('hidden')) openPanel();
      else closePanel();
    });

    // Jangan biarkan klik di dalam card merembes ke document
    card.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    closeCard.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      closePanel();
    });

    // Klik di luar panel akan menutup
    document.addEventListener('click', (e) => {
      // jika klik bukan di dalam #waPanel, tutup
      if (!e.target.closest('#waPanel') && !card.classList.contains('hidden')) {
        closePanel();
      }
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !card.classList.contains('hidden')) closePanel();
    });

    // CS item: stopPropagation lalu buka wa link
    csItems.forEach(item => {
      item.addEventListener('click', (ev) => {
        ev.stopPropagation(); // <<< cegah bubbling
        ev.preventDefault();
        const number = item.getAttribute('data-number');
        const name = item.getAttribute('data-name') || 'CS';
        const message = encodeURIComponent(`Halo ${name}, saya mau tanya tentang...`);
        const url = `https://wa.me/${number}?text=${message}`;
        window.open(url, '_blank');
        // Optional: tutup panel setelah klik
        closePanel();
      });
    });

    // Accessibility helper (enter/space)
    waBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        waBtn.click();
      }
    });

    // adapt small screens
    function adaptToViewport() {
      if (window.innerWidth < 420) {
        waBtn.classList.add('w-full', 'justify-center');
        waBtn.querySelector('span')?.classList.remove('hidden');
      } else {
        waBtn.classList.remove('w-full', 'justify-center');
      }
    }
    window.addEventListener('resize', adaptToViewport);
    adaptToViewport();
// END CS