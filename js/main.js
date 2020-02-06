const baseMapString = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

const oldWellData = {
  icon: 'http://pluspng.com/img-png/a-well-png--466.png',
  popIcon: 'https://static1.squarespace.com/static/57d17e77b8a79bfa4e31641d/t/58a22fd0bebafb516ad2404a/1487024089479/unc+well.png?format=1500w',
  popup: `UNC Well<br/><img src="${this.popIcon}" width='100px'/>`
};

const cherryIcon = 'http://www.pngmart.com/files/1/Cherry-Vector.png';

const javierIcon = 'http://www.conservationgis.org/scgis/2016/PAPERS_PIX/JavierArce-0069_AsilThurTalks.jpg';

let map;

$('document').ready(() => {
  map = L.map('main-map').setView([35.81, -79.05], 15);

  L.tileLayer(baseMapString).addTo(map);

  // create custom icon variable
  const wellIcon = L.icon({
    iconUrl: oldWellData.icon,
    iconSize: [50, 50],
    popupAnchor: [0, 0]
  });

  L.geoJSON(oldWell, {
    pointToLayer: (feature, latLng) => {
      return L.marker(latLng, {icon: wellIcon})
    }
  }).bindPopup(oldWellData.popup)
    .addTo(map);

  L.geoJSON(floweringCherries, {
    pointToLayer: (feature, latLng) => {
      return L.marker(latLng, {
        icon: L.icon({
          iconUrl: cherryIcon,
          iconSize: [40, 40],
          popupAnchor: [0, 0]
        })
      })
    }
  }).addTo(map);


  L.marker([35.911271, -79.049807])
    .addTo(map)
    .bindPopup(
      `<div style="text-align: center">
          <h2>Javier without a beard</h2>
          <div><img src="${javierIcon}" width="200px"></div></div>`
    )
    .openPopup();


  L.control.locate().addTo(map);

  // fix gray bar on bottom of map on load
  setTimeout(() => {
    setHeight();
    map.invalidateSize(true);
  }, 0)
});

$(window).on('resize', setHeight).trigger('resize');

function setHeight() {
  const map = $('#main-map');
  map.height($(window).height() - $('header').height() - 150);
}
