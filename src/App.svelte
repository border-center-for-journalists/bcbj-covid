<script>
	import Mapbox from './Mapbox.svelte';
	import LeafletMap from './LeafletMap.svelte';
  import Header from './components/header.svelte';
  import Introduction from "./components/introduction.svelte";
  import Box from "./components/box.svelte";
  import Footer from "./components/footer.svelte";
  import MapControls from "./components/map-controls.svelte";

  let dimension = 'confirmed';
</script>

<div id='layout'>
  <Header />
  <Introduction />
  <MapControls bind:dimension />
  <main>
    <div class='rows'>
      <div class='map-wrapper'><LeafletMap currentDimension={dimension}/></div>
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
    height: 500px;
    box-sizing: border-box;
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
  @media only screen and (min-width: 1400px){
    main{
      height: 900px;
    }
  }
  @media only screen and (max-width: 860px){
    main{
      padding: 0 25px;
      height: auto;
    }
    .map-wrapper{
      height: 400px;
    }
    .rows{
      flex-direction: column;
      height: auto;
    }
    .list-wrapper{
      height: 600px;
      flex-basis: unset;
    }
  }
</style>
