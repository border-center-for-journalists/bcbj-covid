<script>
	import Mapbox from './Mapbox.svelte';
	import LeafletMap from './LeafletMap.svelte';
  import Header from './components/header.svelte';
  import Introduction from "./components/introduction.svelte";
  import Box from "./components/box.svelte";
  import Footer from "./components/footer.svelte";
</script>

<div id='layout'>
  <Header />
  <Introduction />
  <main>
    <div class='rows'>
      <div class='map-wrapper'><LeafletMap /></div>
      <div class='list-wrapper'>
        <Box />
      </div>
    </div>
  </main>
  <Footer />
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
    width: 100%;
    min-height: 500px;
  }
  .rows{
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .map-wrapper{
    flex-grow: 1;
  }
  .list-wrapper{
    flex-basis: 400px;
  }
</style>
