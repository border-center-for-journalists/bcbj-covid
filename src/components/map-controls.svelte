<script>
  export let dimension = 'confirmed';  
</script>

<div class="gray-sector">
  <div class='container'>
    <h2>Casos confirmados en ...</h2>
    <div class='rows'>
      <button class:active={dimension==='confirmed' } on:click={()=> dimension = 'confirmed'} >Casos totales</button>
      <button class:active={dimension==='deaths' } on:click={()=> dimension = 'deaths'} >Muertes</button>
    </div>
    <div class='rows'>
      <span>100</span>
      <span class="circle"></span>
      <span class="circle medium"></span>
      <span class="circle large"></span>
      <span>2,000</span>
    </div>
    <p>Doble click en el mapa para hacer zoom.</p>
  </div>
</div>

<style>
  .gray-sector {
    background-color: #3c3c3c;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #fff;
  }

  .container {
    width: 90%;
    max-width: 500px;
    text-align: center;
    margin: 0 auto 15px;
  }

  h2 {
    font-size: 1.1em;
  }

  p {
    font-size: .9em;
    color: #989898;
    margin: 5px 0;
  }

  .rows {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }

  button {
    flex: 1;
    cursor: pointer;
    color: #000;
    background-color: #e6e6e6;
    border: 1px solid #cccccc;
    transition: background .4s;
    border-radius: 0;
    margin: 0;
    font-size: .9em;
  }

  button.active,
  button:hover {
    background-color: #fff;
  }

  button:nth-child(1) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 0;
  }

  button:nth-child(2) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: 0;
  }

  .circle {
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: rgba(253, 249, 3, .2);
    border: 1px solid rgb(253, 249, 3);
    border-radius: 50%;
  }

  .circle.medium {
    width: 20px;
    height: 20px;
  }

  .circle.large {
    width: 40px;
    height: 40px;
  }

  span {
    margin: 5px 5px;
  }
</style>