function createOrchidImage(petal, shadow, center, rotation) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 720">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#eef4ed"/>
        <stop offset="1" stop-color="${shadow}" stop-opacity=".28"/>
      </linearGradient>
      <radialGradient id="petal" cx="42%" cy="28%" r="72%">
        <stop stop-color="#fff" stop-opacity=".72"/>
        <stop offset=".42" stop-color="${petal}"/>
        <stop offset="1" stop-color="${shadow}"/>
      </radialGradient>
    </defs>
    <rect width="960" height="720" fill="url(#bg)"/>
    <circle cx="122" cy="112" r="54" fill="#fff" opacity=".22"/>
    <circle cx="820" cy="590" r="92" fill="#fff" opacity=".16"/>
    <path d="M472 720c12-160 19-265 7-369" fill="none" stroke="#2d7055" stroke-width="18" stroke-linecap="round"/>
    <path d="M480 537c-80-63-154-64-217-16 73 19 131 55 176 108" fill="#579071" opacity=".85"/>
    <path d="M485 585c75-50 148-45 209 4-70 8-132 34-181 79" fill="#3f7d61" opacity=".82"/>
    <g transform="translate(480 322) rotate(${rotation})">
      <ellipse cx="0" cy="-126" rx="104" ry="166" fill="url(#petal)" stroke="${shadow}" stroke-width="4"/>
      <ellipse cx="142" cy="-42" rx="104" ry="166" fill="url(#petal)" stroke="${shadow}" stroke-width="4" transform="rotate(72 142 -42)"/>
      <ellipse cx="88" cy="126" rx="104" ry="166" fill="url(#petal)" stroke="${shadow}" stroke-width="4" transform="rotate(144 88 126)"/>
      <ellipse cx="-88" cy="126" rx="104" ry="166" fill="url(#petal)" stroke="${shadow}" stroke-width="4" transform="rotate(216 -88 126)"/>
      <ellipse cx="-142" cy="-42" rx="104" ry="166" fill="url(#petal)" stroke="${shadow}" stroke-width="4" transform="rotate(288 -142 -42)"/>
      <path d="M-91 48C-60 10-31 1 0 28 31 1 60 10 91 48 65 103 37 135 0 151-37 135-65 103-91 48Z" fill="${center}" stroke="${shadow}" stroke-width="5"/>
      <circle cx="0" cy="35" r="32" fill="#fff6cc" stroke="${shadow}" stroke-width="5"/>
      <circle cx="0" cy="35" r="12" fill="${shadow}"/>
    </g>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Kế thừa 16 loài lan từ Lab 1–3, bổ sung thuộc tính isNatural phục vụ route
// /naturals và description phục vụ trang chi tiết /detail/:id của Lab 5.
export const orchids = [
  { id: 1, name: 'Taichung Beauty', rating: 5, isSpecial: true, isNatural: false, image: createOrchidImage('#ef91ba', '#a94072', '#f5cc62', -8), color: 'Pink', origin: 'Taiwan', category: 'Cattleya', description: 'A prized Cattleya cultivar admired for its velvety rose-pink petals and golden lip.' },
  { id: 2, name: 'Moon Orchid', rating: 5, isSpecial: true, isNatural: true, image: createOrchidImage('#fff9ee', '#b9a9c4', '#f1c95b', 4), color: 'White', origin: 'Indonesia', category: 'Phalaenopsis', description: 'Wild tropical epiphyte native to Indonesian rainforests with luminous white blooms.' },
  { id: 3, name: "Lady's Slipper", rating: 4, isSpecial: true, isNatural: true, image: createOrchidImage('#9e71c7', '#59356f', '#e8ba55', -12), color: 'Purple', origin: 'Vietnam', category: 'Paphiopedilum', description: 'Rare limestone mountain orchid native to northern Vietnam featuring a distinctive slipper pouch.' },
  { id: 4, name: 'Dancing Lady', rating: 4, isSpecial: false, isNatural: true, image: createOrchidImage('#f2cf52', '#b77d20', '#803f31', 10), color: 'Yellow', origin: 'Brazil', category: 'Oncidium', description: 'Sun-loving Brazilian species whose ruffled labellum sways like a dancer in the breeze.' },
  { id: 5, name: 'Noble Dendrobium', rating: 4, isSpecial: false, isNatural: true, image: createOrchidImage('#fff8ef', '#d09ab8', '#9c5b90', -4), color: 'White', origin: 'China', category: 'Dendrobium', description: 'Classic highland species thriving on cool mist and bright winter light.' },
  { id: 6, name: 'Boat Orchid', rating: 5, isSpecial: true, isNatural: true, image: createOrchidImage('#a9c46f', '#597346', '#8e4f6f', 8), color: 'Green', origin: 'India', category: 'Cymbidium', description: 'Foothill Himalayan species producing long arching spikes of jade-green flowers.' },
  { id: 7, name: 'Vanda Blue Magic', rating: 5, isSpecial: true, isNatural: false, image: createOrchidImage('#668dcf', '#344f8e', '#e1b45e', -9), color: 'Blue', origin: 'Thailand', category: 'Vanda', description: 'Show-stopping Thai hybrid bred for deep indigo tessellation and aerial root vigor.' },
  { id: 8, name: 'Miltonia Sunset', rating: 4, isSpecial: false, isNatural: false, image: createOrchidImage('#ef9a59', '#b9503f', '#7d365f', 13), color: 'Orange', origin: 'Brazil', category: 'Miltonia', description: 'Pansy-faced hybrid combining warm sunset tones with a sweet morning fragrance.' },
  { id: 9, name: 'Vanilla Orchid', rating: 4, isSpecial: false, isNatural: true, image: createOrchidImage('#f5e5ae', '#ae8a48', '#d07f55', -5), color: 'Cream', origin: 'Mexico', category: 'Vanilla', description: 'Climbing vining orchid species that produces natural vanilla pods in humid forests.' },
  { id: 10, name: 'Jewel Orchid', rating: 5, isSpecial: true, isNatural: true, image: createOrchidImage('#9c365f', '#541e3a', '#e8bd61', 6), color: 'Burgundy', origin: 'Malaysia', category: 'Ludisia', description: 'Terrestrial forest-floor species grown for shimmering copper-veined velvet foliage.' },
  { id: 11, name: 'Brassia Spider', rating: 4, isSpecial: false, isNatural: true, image: createOrchidImage('#e4bd48', '#8c6921', '#6b4638', -14), color: 'Yellow', origin: 'Peru', category: 'Brassia', description: 'Andean cloud-forest species with dramatic elongated sepals and spicy scent.' },
  { id: 12, name: 'Epidendrum Flame', rating: 4, isSpecial: false, isNatural: false, image: createOrchidImage('#dc5b55', '#8b2e36', '#f0bd4f', 9), color: 'Red', origin: 'Colombia', category: 'Epidendrum', description: 'Reed-stem garden cultivar bearing clusters of fiery crimson florets year-round.' },
  { id: 13, name: 'Zygopetalum Advance', rating: 5, isSpecial: true, isNatural: false, image: createOrchidImage('#8057a7', '#432b65', '#8fb75b', -7), color: 'Purple', origin: 'Brazil', category: 'Zygopetalum', description: 'Complex hybrid noted for bold violet markings and intense hyacinth aroma.' },
  { id: 14, name: 'Masdevallia Veitchiana', rating: 5, isSpecial: true, isNatural: true, image: createOrchidImage('#e77d44', '#963e2e', '#f2cf5b', 12), color: 'Orange', origin: 'Peru', category: 'Masdevallia', description: 'High-altitude Peruvian species found near Machu Picchu with iridescent orange sepals.' },
  { id: 15, name: 'Catasetum Pileatum', rating: 4, isSpecial: false, isNatural: true, image: createOrchidImage('#87aa68', '#446945', '#9c5664', -3), color: 'Green', origin: 'Venezuela', category: 'Catasetum', description: 'Natural Neotropical species famous for its broad waxy cup-shaped flowers.' },
  { id: 16, name: 'Bletilla Striata', rating: 4, isSpecial: false, isNatural: false, image: createOrchidImage('#df83ae', '#963e72', '#f0cb65', 7), color: 'Pink', origin: 'Japan', category: 'Bletilla', description: 'Hardy garden selection with pleated foliage and delicate magenta-rose bells.' }
];
