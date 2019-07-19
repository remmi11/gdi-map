
L.mapbox.accessToken = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw';

// tiles
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }),
    streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr })


    //http://13.82.41.95:8080/geoserver/furmanrecords/wms?service=WMS&version=1.1.0&request=GetMap&layers=furmanrecords%3Asection_lines_wgs84&bbox=-105.388671875%2C31.6156005859375%2C-98.3876876831055%2C38.736743927002&width=755&height=768&srs=EPSG%3A4326&format=image%2Fpng
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// var wmsLayer = L.tileLayer.wms('https://gs.furmanrecords.com/geoserver/furmanrecords/wms?', {
//     layers: 'furmanrecords:section_lines_wgs84'
// });
var wmsLayer = L.tileLayer.wms('https://gs.furmanrecords.com/geoserver/furmanrecords/wms?', {
    layers: 'furmanrecords:section_lines_wgs84',
    transparent: true,
    format: 'image/png'
});

var layer = 'furmanrecords:section_lines_wgs84';
var projection_epsg_no = '4326';
var url = 'https://gs.furmanrecords.com/geoserver/gwc/demo/furmanrecords:section_lines_wgs84?gridSet=EPSG:4326&format=image/png';
//"http://13.82.41.95:8080/geoserver/gwc/service/tms/1.0.0/furmanrecords%3Asection_lines_wgs84@EPSG%3A4326@png"
// var url = 'http://13.82.41.95:8080/geoserver/gwc/service/tms/1.0.0/' + layer + '@EPSG%3A' + projection_epsg_no + '@pbf/{z}/{x}/{-y}.pbf'
//var url = 'https://gs.furmanrecords.com/geoserver/gwc/service/tms/1.0.0/furmanrecords%3Asection_lines_wgs84@EPSG%3A4326@png'

//var mapboxUrl = "https://{s}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token={token}";

var mapboxVectorTileOptions = {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://www.mapbox.com/about/maps/">MapBox</a>'
};

var sectionTilelayer = L.tileLayer(url, mapboxVectorTileOptions);


// styles
var satellite = L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-streets-v9');
var sections = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf442uso0z3e2ss1w8jpnyp5');
// var contours = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf6xjfak3ebb2sobig2fnpzh');
var prad = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf75lnp62m612smws69qnu4o');
var floods = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjf9riogz4z8n2rmk4eawkc6o');
var places = L.mapbox.styleLayer('mapbox://styles/wtgeographer/cjftuokfx8ime2sqpyhj88q67');

var map = L.map('map', {
    center: [35.058104, -101.749877],
    zoom: 9,
    layers: [streets] //, contours, prad, floods]
});

var measureControl = L.control.measure({
    activeColor: '#ABE67E',
    completedColor: '#C8F2BE'
});
measureControl.addTo(map);

var baseLayers = {
    "Streets": streets,
    "Satellite": satellite,
};

var overlays = {
    //"Sections": sections,
    // "10ft Contours": contours,
    "Prad Lines": prad,
    "Flood Hazards": floods,
    "City Limits": places,
    "Sections": wmsLayer
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