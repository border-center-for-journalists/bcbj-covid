<script>
  import BoxItem from "./box-item.svelte";
  const items = [0,1,2,3,4,5,6,7,8,9];
</script>

<div class='box-container'>
  <div class='box-header'>
    <form>
      <input type='text' placeholder="Buscar" />
    </form>
    <h3>Nogales, Sonora</h3>
  </div>
  <div class='box-body'>
    {#each items as item}
      <BoxItem />
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
    margin-bottom: 10px;
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
    font-size: 24px;
    padding-left: 50px;
    margin: 0;
  }
  .box-body{
    flex: 1;
    overflow: auto;
  }
</style>