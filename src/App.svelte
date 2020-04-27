<script>
	import Mapbox from './Mapbox.svelte';
	import LeafletMap from './LeafletMap.svelte';
  import Header from './components/header.svelte';
</script>

<div id='layout'>
  <Header />
  <main>
    <LeafletMap />
  </main>
</div>

<style>
  #layout{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
	main{
    flex-grow: 1;
		width:100%;
	}
</style>
