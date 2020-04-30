<script>
  import { onMount } from 'svelte';
  import BoxList from "./box-list.svelte";
  import { getMunicipalities, getResourceTypes } from "../services/prismicconnect.js";

  let search = '';
  let dataPromise = getData();

  async function getData() {
    const responseGetMunicipalities = await getMunicipalities();
    const municipalities = responseGetMunicipalities.results;

    const responseGetResourceTypes = await getResourceTypes();
    const resourceTypes = transformArray(responseGetResourceTypes);
    return { municipalities, resourceTypes }
  };
  function transformArray( data ){
    return data.results.reduce((obj, r) => {
      const m = r.data
      obj[r.id] = m;
      return obj;
    }, {});
  }
</script>

<div class='box-container'>
  <div class='box-header'>
    <input bind:value={search} type='text' placeholder="Buscar" />
  </div>
  <div class='box-body'>
    {#await dataPromise then resultData }
      {#each resultData.municipalities as municipality ( municipality.id )}
        <BoxList 
          listItem={municipality} 
          alltypes={resultData.resourceTypes} 
          search={search}
        />
      {/each}
    {/await}
  </div>
</div>

<style>
  .box-container{
    width: 100%;
    height: 100%;
    background-color: #000;
    color: #fff;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .box-header{
    flex-shrink: 1;
    margin-bottom: 25px;
  }
  form{
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 25px;
  }
  input{
    width: 100%;
    box-sizing: border-box;
    border: 0 none;
    color: #000;
    font-size: 15px;
    padding: 8px 10px;
    border-radius: 5px;
  }
  .box-body{
    flex: 1;
    overflow: auto;
  }
</style>