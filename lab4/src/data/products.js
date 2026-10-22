// Tạo ảnh SVG data URI độc lập mạng cho từng chậu lan trong cửa hàng.
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

// Danh mục sản phẩm hoa lan dùng cho giỏ hàng và cửa hàng ở Lab 4.
export const products = [
  { id: 1, name: 'Taichung Beauty', price: 45, category: 'Cattleya', origin: 'Taiwan', color: 'Pink', image: createOrchidImage('#ef91ba', '#a94072', '#f5cc62', -8) },
  { id: 2, name: 'Moon Orchid', price: 38, category: 'Phalaenopsis', origin: 'Indonesia', color: 'White', image: createOrchidImage('#fff9ee', '#b9a9c4', '#f1c95b', 4) },
  { id: 3, name: "Lady's Slipper", price: 52, category: 'Paphiopedilum', origin: 'Vietnam', color: 'Purple', image: createOrchidImage('#9e71c7', '#59356f', '#e8ba55', -12) },
  { id: 4, name: 'Dancing Lady', price: 34, category: 'Oncidium', origin: 'Brazil', color: 'Yellow', image: createOrchidImage('#f2cf52', '#b77d20', '#803f31', 10) },
  { id: 5, name: 'Boat Orchid', price: 49, category: 'Cymbidium', origin: 'India', color: 'Green', image: createOrchidImage('#a9c46f', '#597346', '#8e4f6f', 8) },
  { id: 6, name: 'Vanda Blue Magic', price: 58, category: 'Vanda', origin: 'Thailand', color: 'Blue', image: createOrchidImage('#668dcf', '#344f8e', '#e1b45e', -9) }
];
