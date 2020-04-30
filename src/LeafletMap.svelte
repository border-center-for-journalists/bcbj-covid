<script>
	import L from 'leaflet';
	import { onMount, getContext } from 'svelte';
  import * as utils from "utils.js";

  let mapContainer;    
  let leafletMap;    
  const corner1 = L.latLng(33.352741, -118.684017);
  const corner2 = L.latLng(15.024371, -85.169640);
  const bounds = L.latLngBounds(corner1,corner2);
  onMount(async () => {
      leafletMap = L.map(mapContainer,{
        scrollWheelZoom : false,
        maxBounds : bounds,
        maxBoundsViscosity : .8
      }).fitBounds(bounds);
      const markers = await utils.getMarkers();
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: '',
          maxZoom: 18,
          id: 'elsonny/ck9lwp2d80t8e1il970gysz4u',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiZWxzb25ueSIsImEiOiJjazkwYWQ2d28wMDJ4M25vNjR3b2h5bWpiIn0.iQk1NtwS-2bJafmWg5Ol9w',
      }).addTo(leafletMap);      
      markers[0].addTo(leafletMap);
      markers[1].addTo(leafletMap);   
      resize();
  });    
  const resize = () => {
      leafletMap.invalidateSize().fitBounds(bounds);
  };
</script>

<div class="map" bind:this="{mapContainer}"><slot></slot></div>

<style>

.map {
   height: 100%;
   width: 100%;
}
</style>