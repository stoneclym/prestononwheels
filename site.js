/* Preston on Wheels — shared site behavior */
(function () {
  // ---- scroll reveal ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // ---- close mobile nav on link click ----
  document.querySelectorAll('#navlinks a').forEach((a) => {
    a.addEventListener('click', () => document.getElementById('navlinks')?.classList.remove('open'));
  });

  // ---- Leaflet service-area map ----
  const mapEl = document.getElementById('map');
  if (mapEl && window.L) {
    const cities = {
      Wilmington: [34.2257, -77.9447],
      Leland:     [34.2563, -78.0447],
      Burgaw:     [34.5519, -77.9264],
    };
    const map = L.map('map', { scrollWheelZoom: false, attributionControl: true }).setView([34.36, -77.97], 10);
    window.__powMap = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd', maxZoom: 19, className: 'map-tiles',
    }).addTo(map);

    const pin = (label) => L.divIcon({
      className: 'pow-pin',
      html: `<span class="pow-pin__dot"></span><span class="pow-pin__lbl">${label}</span>`,
      iconSize: [0, 0], iconAnchor: [0, 0],
    });
    const group = [];
    Object.entries(cities).forEach(([name, latlng]) => {
      L.marker(latlng, { icon: pin(name) }).addTo(map)
        .bindPopup(`<strong>${name}</strong><br>In our service area`);
      group.push(latlng);
    });
    // frame all three cities
    map.fitBounds(group, { padding: [70, 70] });

    setTimeout(() => map.invalidateSize(), 300);
  }
})();
