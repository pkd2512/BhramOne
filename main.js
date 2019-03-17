mapboxgl.accessToken = 'pk.eyJ1IjoicGtkZGFwYWNpZmljIiwiYSI6ImNqMDNnZWExdjBhNWozM3AzZGJqbWVsbnAifQ.s6XTs8U9qu8Hwbuc4Fe3zA';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/pkddapacific/cjsfnmjyr38ls1fppgaqpxlei', //hosted style id
center: [76.319,10.008], // starting position
zoom: 12 // starting zoom
})

function toggleLabels(e) {
    ids = [
        'country-label',
        'place-city-label-major copy',
        'place-city-label-major',
        'place-city-label-minor',
        'place-town-village-hamlet-label copy',
        'place-town-village-hamlet-label',
        'place-neighborhood-suburb-label'
    ]
    for (layers in ids){
        var visibility = map.getLayoutProperty(ids[layers], 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(ids[layers], 'visibility', 'none');
            this.className = '';
        } 
        else {
            this.className = 'active';
            map.setLayoutProperty(ids[layers], 'visibility', 'visible');
        }
    }
}
function toggleMetro(e) {
    ids = [
        'kmrl',
        'metro-station-label copy',
        'kmrl-stops-dl5llm',
    ]
    for (layers in ids){
        var visibility = map.getLayoutProperty(ids[layers], 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(ids[layers], 'visibility', 'none');
            this.className = '';
        } 
        else {
            this.className = 'active';
            map.setLayoutProperty(ids[layers], 'visibility', 'visible');
        }
    }
}
function toggleBus(e) {
    ids = [
        'public-transport'
    ]
    for (layers in ids){
        var visibility = map.getLayoutProperty(ids[layers], 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(ids[layers], 'visibility', 'none');
            this.className = '';
        } 
        else {
            this.className = 'active';
            map.setLayoutProperty(ids[layers], 'visibility', 'visible');
        }
    }
}
function toggleFerry(e) {
    ids = [
        'ferry',
        'ferry-line-label',
        'ferry-stop-locations-7jlb4m'
    ]
    for (layers in ids){
        var visibility = map.getLayoutProperty(ids[layers], 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(ids[layers], 'visibility', 'none');
            this.className = '';
        } 
        else {
            this.className = 'active';
            map.setLayoutProperty(ids[layers], 'visibility', 'visible');
        }
    }
}
function toggleAuto(e) {
    ids = [
        'auto-stands-927j1a'
    ]
    for (layers in ids){
        var visibility = map.getLayoutProperty(ids[layers], 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(ids[layers], 'visibility', 'none');
            this.className = '';
        } 
        else {
            this.className = 'active';
            map.setLayoutProperty(ids[layers], 'visibility', 'visible');
        }
    }
}
function toggleCycle(e) {
    ids = [
        'public-bike-sharing-stops'
    ]
    for (layers in ids){
        var visibility = map.getLayoutProperty(ids[layers], 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(ids[layers], 'visibility', 'none');
            this.className = '';
        } 
        else {
            this.className = 'active';
            map.setLayoutProperty(ids[layers], 'visibility', 'visible');
        }
    }
}

/* Isochrones */
function getIsochrones(start) {
    var url = 'https://api.mapbox.com/isochrone/v1/mapbox/walking/'+ start[0]+','+start[1]+'?contours_minutes=5,10,15&contours_colors=ffff00,ffea00,ffd600&polygons=true&access_token='+mapboxgl.accessToken;
    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload = function() {
        var data = req.response;
        data.features.forEach(d => {
            isochroneFeatures.features.push(d)
            // console.log (d)
        })
        // isochroneFeatures.features+ = (data.features)+',';
        // console.log (data)
    //   isochroneFeatures = concatGeoJSON(gj, req.response)
    
    };
    req.send();
}

// function concatGeoJSON(g1, g2){
//     console.log("concat")
//     return { 
//         "type" : "FeatureCollection",
//         "features": g1.features.push(g2.features)
//     }
// }
var isochroneFeatures = {
    "type" : "FeatureCollection",
    "features": []
}

function showMetroIsochrones() {
    if (map.getLayer('metro-isochrones')!= 'undefined') {
        map.addLayer({
            'id': 'metro-isochrones',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': isochroneFeatures
                },
            'layout': {},
            'paint' : {
                'fill-color': { type: 'identity', property: 'fill' },
                'fill-opacity': 0.1,
                'fill-outline-color': '#ffff00',
                }
            }, 'waterway');
        
        }
    
    else {
        var visibility = map.getLayoutProperty('metro-isochrones', 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty('metro-isochrones', 'visibility', 'none');
            this.className = '';
        } 
        else {
            this.className = 'active';
            map.setLayoutProperty('metro-isochrones', 'visibility', 'visible');
    }
}
}
map.on('load', function(){
    d3.csv('data/KMRL-Stops.csv')
        .then(function(data) {
            data.forEach(d => {
                getIsochrones([d.stop_lon, d.stop_lat])
            });
        })
        // .then(setTimeout(function(d) {
        //     map.addLayer({
        //         'id': 'metro-isochrones',
        //         'type': 'fill',
        //         'source': {
        //             'type': 'geojson',
        //             'data': isochroneFeatures
        //             },
        //         'layout': {},
        //         'paint' : {
        //             'fill-color': { type: 'identity', property: 'fill' },
        //             'fill-opacity': 0.1,
        //             'fill-outline-color': '#ffff00',
        //             }
        //         }, 'waterway');
        //         console.log("delay")
        // }), 1500)
    // locations.forEach(d => getIsochrones(d))
    

})


