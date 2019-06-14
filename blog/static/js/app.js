
L.mapbox.accessToken = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw';


// var map = L.mapbox.map('map', {
//     layers: [sections, contours]
// }).setView([35.058104, -101.749877], 9);

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }),
    streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr })
var satellite = L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-streets-v9');

var sections = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf442uso0z3e2ss1w8jpnyp5');
var contours = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf6xjfak3ebb2sobig2fnpzh');
var prad = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf75lnp62m612smws69qnu4o');
var floods = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf9riogz4z8n2rmk4eawkc6o');
var places = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjftuokfx8ime2sqpyhj88q67');

var map = L.map('map', {
    center: [35.058104, -101.749877],
    zoom: 9,
    layers: [streets, sections] //, contours, prad, floods]
});

var measureControl = L.control.measure({
    activeColor: '#ABE67E',
    completedColor: '#C8F2BE'
});
measureControl.addTo(map);

var baseLayers = {
    "Streets": streets,
    "Satellite": satellite
};

var overlays = {
    "Sections": sections,
    "10ft Contours": contours,
    "Prad Lines": prad,
    "Flood Hazards": floods,
    "City Limits": places
};

L.control.layers(baseLayers, overlays).addTo(map);

var printer = L.easyPrint({
    sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
    filename: 'myMap',
    exportOnly: true,
    hideControlContainer: true
}).addTo(map);

function manualPrint() {
    printer.printMap('CurrentSize', 'MyManualPrint')
}

// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        marker: false,
        polyline: false,
        circle: false
    },
    edit: {
        featureGroup: drawnItems
    }
}).addTo(map);

map.addControl(drawControl);