<script>
  import L from 'leaflet';
  import { onMount, afterUpdate } from 'svelte';
  import * as utils from "utils.js";
  import moment from "moment"
  import "moment/locale/es"
  moment.locale("es")

  export let currentDimension = 'confirmed';
  export let currentDateIndex = 0;
  export let currentDateArray = [];
  export let lastUpdate = '';

  let mapContainer;
  let leafletMap;
  let municipalities;
  let markers;
  let counties;
  let usMarkers;
  let usaOffset = 0;

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
    counties = utils.formatUS(data.usa);
    lastUpdate = utils.getLastUpdateDate(municipalities);
    currentDateArray = municipalities[0].dates;
    currentDateIndex = municipalities[0].dates.length - 1;
    usaOffset = getOffset()
    addMarkers(currentDimension);
    resize();
  });
  const getOffset = () => {
    const fMxDate = municipalities[0].dates[0]
    const fUsaDate = moment(fMxDate, 'DD-MM-YY').format('M/D/YY')
    const offset = counties[0].dates.reduce((r, i, index) => (i === fUsaDate ? index : r), -1)
    return offset
  }
  const resize = () => {
    leafletMap.invalidateSize().fitBounds(bounds);
  };
  const addMarkers = (dimension) => {
    markers = utils.makeMarkers(municipalities, dimension);
    usMarkers = utils.makeMarkers(counties, dimension);

    usMarkers[0].addTo(leafletMap);
    usMarkers[1].addTo(leafletMap);

    markers[0].addTo(leafletMap);
    markers[1].addTo(leafletMap);
  };
  afterUpdate(async () => {
    if (municipalities && leafletMap) {
      const mxIndex = currentDateIndex;
      const usaInde = usaOffset + mxIndex
      utils.updateMarkers(municipalities, currentDimension, markers[0], markers[1], mxIndex);
      utils.updateMarkers(counties, currentDimension, usMarkers[0], usMarkers[1], usaInde);
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