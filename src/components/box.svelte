<script>
  import { onMount } from 'svelte';
  import BoxItem from "./box-item.svelte";
  import { getMunicipalities, getResourceTypes, getResources } from "../services/prismicconnect.js";

  Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});

  let allItems = []
  let resourceTypes = {};
  let search = '';
  let municipalities = {};
  $: newItems = Object.filter(allItems
    .reduce((obj, resourceRaw) => {
      const resource = resourceRaw.data
        if (!resource.municipalityid || resource.municipalityid.length === 0)
          return obj
        //const entity = resource.municipalityid[0].text;
        const entity = resource.municipality.id;
        if (obj[entity]) {
          obj[entity].resources.push(resource)
        } else {
          const m = municipalities[entity];
          obj[entity] = {
            name: `${m.name[0].text}, ${m.state[0].text}`,
            municipality: municipalities[entity],
            resources: [resource]
          }
        }
      return obj;
    }, {}), item => (
      search === ''
      || item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )
    );
    // .filter(resourceRaw => {
    //   const resource = resourceRaw.data
    //   return (
    //     search === ''
    //     || resource.title[0].text.indexOf(search) !== -1
    //   )
    // });
  $: newItemsKeys = Object.keys(newItems);

  onMount(async () => {
    const responseGetMunicipalities = await getMunicipalities();
    if( responseGetMunicipalities ){
      municipalities = transformArray(responseGetMunicipalities);
    }
    const responseGetResourceTypes = await getResourceTypes();
    if (responseGetResourceTypes) {
      resourceTypes = transformArray(responseGetResourceTypes);
    }
    const responseGetResources = await getResources();
    if (responseGetResources) {
      allItems = responseGetResources.results;
    }
  });
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
    <form>
      <input bind:value={search} type='text' placeholder="Buscar" />
    </form>
  </div>
  <div class='box-body'>
    {#each newItemsKeys as newItemKey}
      {#if newItems[newItemKey].resources.length > 0 }
        <div>
          <h3>{newItems[newItemKey].name}</h3>
          
          {#each newItems[newItemKey].resources as resource}
            <BoxItem 
              alltypes={resourceTypes} 
              item={resource}
            />
          {/each}
        </div>
      {/if}
    {/each}
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
  }
  form{
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 25px;
  }
  form input{
    width: 100%;
    box-sizing: border-box;
    border: 0 none;
    color: #000;
    font-size: 15px;
    padding: 8px 10px;
    border-radius: 5px;
  }
  h3{
    font-size: 22px;
    font-size: 1.4em;
    padding-left: 50px;
    margin: 0;
    margin-top: 10px;
  }
  .box-body{
    flex: 1;
    overflow: auto;
  }
</style>