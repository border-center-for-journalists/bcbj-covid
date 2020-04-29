<script>
	import L from 'leaflet';
	import { onMount, getContext } from 'svelte';

  let mapContainer;    
  let leafletMap;    

	export let center = [23.6345, -102.5528];
  export let zoom = 5;

    onMount(() => {
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
    });    
    const resize = () => {
        leafletMap.invalidateSize();
    };
</script>

<div class="map" bind:this="{mapContainer}"><slot></slot></div>

<style>

.map {
   height: 100%;
   width: 100%;
}
</style>