<script>
  import BoxItem from "./box-item.svelte";
  export let listItem = {};
  export let alltypes = {};
  export let search = false;
  export let index = 0;
  let collapsed = false;// !search && index !== 0;
  function toggle(){
    collapsed = !collapsed;
  }
</script>

<h3 on:click={toggle}>
  {listItem.name} 
  <i class='material-icons'>{ collapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }</i>
</h3>
{#if !collapsed }
  {#each listItem.resources as resource}
    <BoxItem 
      alltypes={alltypes} 
      item={resource}
    />
  {/each}
{/if}

<style>
  h3{
    font-size: 22px;
    font-size: 1.4em;
    padding-left: 50px;
    margin: 0;
    margin-top: 10px;
    cursor: pointer;
  }
  i{
    font-size: 30px;
    vertical-align: top;
    color: #fdf902;
  }
</style>