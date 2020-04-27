<script>
	import Mapbox from './Mapbox.svelte';
	import LeafletMap from './LeafletMap.svelte';
  import Header from './components/header.svelte';
  import Introduction from "./components/introduction.svelte";
  import Footer from "./components/footer.svelte";
</script>

<div id='layout'>
  <Header />
  <Introduction />
  <main>
    <LeafletMap />
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
</style>
