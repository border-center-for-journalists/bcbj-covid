<script>
	import mxjson from './mx.json';
	import L from 'leaflet';
    import * as topojson from 'topojson';
	import { onMount, getContext } from 'svelte';

    let mapContainer;    
    let leafletMap;    
	
	export let center = [23.6345, -102.5528];
    export let zoom = 5;

    onMount(() => {
    	console.log(mxjson);
        leafletMap = L.map(mapContainer).setView(center, zoom);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '',
            maxZoom: 18,
            id: 'elsonny/ck90ay76y01yc1imzo80yen8t',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZWxzb25ueSIsImEiOiJjazkwYWQ2d28wMDJ4M25vNjR3b2h5bWpiIn0.iQk1NtwS-2bJafmWg5Ol9w'
        }).addTo(leafletMap);         
        resize();
        L.topoJson = function (data, options) {
            return new L.TopoJSON(data, options);
        };
      //create an empty geojson layer
      //with a style and a popup on click
        var geojson = L.topoJson(null, {
            style: function(feature){
              return {
                color: "#000",
                opacity: 1,
                weight: 1,
                fillColor: '#35495d',
                fillOpacity: 0.8
              }
            },
            onEachFeature: function(feature, layer) {
              layer.bindPopup('<p>'+feature.properties.name+'</p>')
            }
        }).addTo(leafletMap);
        geojson.addData(mxjson);
    });    
    const resize = () => {
        leafletMap.invalidateSize();
    };

     //extend Leaflet to create a GeoJSON layer from a TopoJSON file
    L.TopoJSON = L.GeoJSON.extend({
        addData: function (data) {
          var geojson, key;
          if (data.type === "Topology") {
            for (key in data.objects) {
              if (data.objects.hasOwnProperty(key)) {
                geojson = topojson.feature(data, data.objects[key]);
                L.GeoJSON.prototype.addData.call(this, geojson);
              }
            }
            return this;
          }
          L.GeoJSON.prototype.addData.call(this, data);
          return this;
        }
    });
      
    


</script>

<div class="map" bind:this="{mapContainer}"><slot></slot></div>

<style>

.map {
   height: 100%;
   width: 100%;
}
</style>