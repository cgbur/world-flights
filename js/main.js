const baseMapString = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const darkBaseMapString = 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

const oldWellData = {
  icon: 'http://pluspng.com/img-png/a-well-png--466.png',
  popIcon: 'https://static1.squarespace.com/static/57d17e77b8a79bfa4e31641d/t/58a22fd0bebafb516ad2404a/1487024089479/unc+well.png?format=1500w',
  popup: `UNC Well<br/><img src="${this.popIcon}" width='100px'/>`
};

const cherryIcon = 'http://www.pngmart.com/files/1/Cherry-Vector.png';

const javierIcon = 'http://www.conservationgis.org/scgis/2016/PAPERS_PIX/JavierArce-0069_AsilThurTalks.jpg';

let map;

let options =
  ['American Airlines',
    'Southwest Airlines',
    'Delta Air Lines',
    'JetBlue Airways',
    'United Airlines',
    'all others'];
let selected = [options[0], options[1], options[2]];

$('document').ready(() => {
  $('body').on('click', '.airline-names', handleClick);
  options.forEach(name => {
    $('#select-box').append(`<p class="caps airline-names ${selected.includes(name) ? 'selected' : ''}">
      ${name}
    </p>`)
  });

  loadMap();
});

$(window).on('resize', setHeight).trigger('resize');

function setHeight() {
  const map = $('#main-map');
  map.height($(window).height());
}


let airlinesLayer;

function loadMap() {
  map = L.map('main-map').setView([38.246900, -96.203408], 5);

  L.tileLayer(darkBaseMapString).addTo(map);

  addFlights();

  L.control.locate().addTo(map);

  // fix gray bar on bottom of map on load
  setTimeout(() => {
    setHeight();
    map.invalidateSize(true);
  }, 0)
}

function refreshMap() {
  map.removeLayer(airlinesLayer);
  addFlights();
}

function addFlights() {
  airlinesLayer = L.geoJSON(worldFlights, {
    style: {
      weight: .2,
      opacity: .75,
      color: "#e9e9e9",
    },
    filter: function (feature) {
      if (selected.includes('all others')) {
        return true;
      } else {
        return selected.includes(feature.properties.airline)
      }
    }
  }).addTo(map);

}

function handleClick() {
  let name = $(this).html().trim();
  if (selected.includes(name)) {
    selected.splice(selected.indexOf(name), 1);
    $(this).toggleClass('selected');
  } else {
    selected.push(name);
    $(this).toggleClass('selected');
  }
  refreshMap();
}
