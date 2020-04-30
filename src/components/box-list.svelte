<script>
  import BoxItem from "./box-item.svelte";
  import { getResources } from "../services/prismicconnect.js";
  import { slide } from 'svelte/transition';

  export let listItem = {};
  export let alltypes = {};
  export let search;
  
  let collapsed = true;
  $: listName = `${listItem.data.name[0].text}, ${listItem.data.state[0].text}`;
  $: visible = (
      search === ''
      || listItem.data.name[0].text.toLowerCase().indexOf(search.toLowerCase()) !== -1
      || listItem.data.state[0].text.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )
  let promise;

  async function getResoucesList(){
    const responseGetResources = await getResources(listItem.id);
    return responseGetResources.results;
  }
  function toggle() {
    collapsed = !collapsed;
    if( !collapsed && !promise ){
      promise = getResoucesList();
    }
  }
</script>

{#if visible}
<div class='box-list' transition:slide>
  <h3 on:click={toggle}>
    <i class='material-icons'>{ collapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }</i>
    {listName} 
  </h3>
  {#await promise then resources}
    {#if !collapsed}
      <div transition:slide>
        {#each resources as resource}
          <BoxItem 
            alltypes={alltypes} 
            item={resource.data}
          />
        {/each}
      </div>
    {/if}
  {/await}
</div>
{/if}

<style>
  h3{
    font-size: 22px;
    font-size: 1.4em;
    padding-left: 50px;
    margin: 0;
    margin-top: 10px;
    cursor: pointer;
    position: relative;
  }
  i{
    font-size: 30px;
    vertical-align: top;
    color: #fdf902;
    position: absolute;
    left: 0px;
    top: 0;
  }
</style>