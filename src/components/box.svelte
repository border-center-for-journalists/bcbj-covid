<script>
  let apiEndpoint = customkeys['PRISMIC_API_URL'];
  let api_key = customkeys['PRISMIC_API_KEY'];

  import { onMount } from 'svelte';
  import Prismic from "prismic-javascript";
  import PrismicDOM from 'prismic-dom';
  import BoxItem from "./box-item.svelte";

  let allItems = []
  let resourceTypes = {};
  let search = '';
  $: newItems = allItems
    .filter(resourceRaw => {
      const resource = resourceRaw.data
      return (
        search === ''
        || resourceRaw.type === 'covidresourcetype'
        || resource.title[0].text.indexOf(search) !== -1
      )
    }).reduce((obj, resourceRaw) => {
      const resource = resourceRaw.data
      if (resourceRaw.type === 'covidresourcetype') {
        resourceTypes[resourceRaw.id] = resource
      } else {
        if (!resource.municipalityid || resource.municipalityid.length === 0)
          return obj
        const entity = resource.municipalityid[0].text
        if (obj[entity]) {
          obj[entity].resources.push(resource)
        } else {
          obj[entity] = {
            name: 'Nogales, Sonora',
            resources: [resource]
          }
        }
      }
      return obj;
    }, {});
  $: newItemsKeys = Object.keys(newItems);

  onMount(async () => {
    // console.log(apiEndpoint)
    // console.log('API_KEY', apiEndpoint, api_key);
    if (!api_key || api_key === '') return;
    Prismic.getApi(apiEndpoint, { accessToken: api_key }).then(api =>
      api.query(
        Prismic.Predicates.any("document.type", ["covidresource", "covidresourcetype"]),
        {
          pageSize: 100,
          orderings: `[my.covidresource.date desc]`
        }
      )
    ).then(response => {
      //console.log("Documents: ", response.results);
      //const results = { ...response.results };
      const results = response.results
      allItems = results;
    }, function (err) {
      console.log("Something went wrong: ", err);
    });
  });
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
    padding-left: 50px;
    margin: 0;
    margin-top: 10px;
  }
  .box-body{
    flex: 1;
    overflow: auto;
  }
</style>