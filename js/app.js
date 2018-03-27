
L.mapbox.accessToken = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw';

// var map = L.mapbox.map('map', {
//     layers: [sections, contours]
// }).setView([35.058104, -101.749877], 9);

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr})
var satellite = L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-streets-v9');

var sections = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf442uso0z3e2ss1w8jpnyp5');
var contours   = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf6xjfak3ebb2sobig2fnpzh');
var prad = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf75lnp62m612smws69qnu4o');
//var contours  = L.tileLayer(mbUrl, {id: 'mapbox.mapbox-streets-v7',   attribution: mbAttr});

var map = L.map('map', {
center: [35.058104, -101.749877],
zoom: 9,
layers: [streets, sections, contours, prad],
measureControl: true
});

// var measureControl = new L.Control.Measure(options);
// measureControl.addTo(myMap);

var baseLayers = {
"Streets": streets,
"Satellite": satellite
};

var overlays = {
"Sections": sections,
"10ft Contours": contours,
"Prad Lines": prad
};

L.control.layers(baseLayers, overlays).addTo(map);

var printer = L.easyPrint({
    // tileLayer: tiles,
    sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
    filename: 'myMap',
    exportOnly: true,
    hideControlContainer: true
}).addTo(map);
function manualPrint() {
    printer.printMap('CurrentSize', 'MyManualPrint')
}


//http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/14/4823/6160.mvt?access_token=pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw
