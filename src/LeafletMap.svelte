<script>
  import L from 'leaflet';
  import { onMount, afterUpdate } from 'svelte';
  import * as utils from "utils.js";

  export let currentDimension = 'confirmed';
  export let lastUpdate = '';

  let mapContainer;
  let leafletMap;
  let municipalities;
  let markers;

  const corner1 = L.latLng(33.352741, -118.684017);
  const corner2 = L.latLng(15.024371, -85.169640);
  const bounds = L.latLngBounds(corner1, corner2);

  onMount(async () => {
    utils.setCustomGetLayer();

    leafletMap = L.map(mapContainer, { scrollWheelZoom: false }).fitBounds(bounds);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '',
      maxZoom: 18,
      id: 'elsonny/ck9lwp2d80t8e1il970gysz4u',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZWxzb25ueSIsImEiOiJjazkwYWQ2d28wMDJ4M25vNjR3b2h5bWpiIn0.iQk1NtwS-2bJafmWg5Ol9w',
    }).addTo(leafletMap);

    const data = await utils.loadData();
    municipalities = utils.combineData(data);
    lastUpdate = utils.getLastUpdateDate(municipalities);
    addMarkers(currentDimension);
    resize();
  });
  const resize = () => {
    leafletMap.invalidateSize().fitBounds(bounds);
  };
  const addMarkers = (dimension) => {
    markers = utils.makeMarkers(municipalities, dimension);
    markers[0].addTo(leafletMap);
    markers[1].addTo(leafletMap);
  };
  afterUpdate(async () => {
    if (municipalities) {
      leafletMap.removeLayer(markers[0]);
      leafletMap.removeLayer(markers[1]);
      addMarkers(currentDimension);
    }
  })

</script>
<div class="map" bind:this="{mapContainer}">
  <slot></slot>
</div>

<style>
  .map {
    height: 100%;
    width: 100%;
  }
</style>