<script>
	import mapboxgl from 'mapbox-gl';
	import { onMount, getContext } from 'svelte';
	
	onMount(() => {
		mapboxgl.accessToken = 'pk.eyJ1IjoiZWxzb25ueSIsImEiOiJjazkwYWQ2d28wMDJ4M25vNjR3b2h5bWpiIn0.iQk1NtwS-2bJafmWg5Ol9w';
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/elsonny/ck90ay76y01yc1imzo80yen8t'
		});
	});
</script>
<div id='map'></div>
<style>

#map{
   height: 100%;
   width: 100%;
}
</style>