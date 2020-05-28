<script>
  import { afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import moment from "moment"
  import "moment/locale/es"
  moment.locale("es")

  export let currentDateIndex = 0;
  export let currentDateArray = [];
  export let play = false;

  $: dateArray = currentDateArray.map(d => ({
    date: d,
    el: null,
    formatDate: moment(d, 'DD-MM-YY').format('DD | MM')
  }))

  let selectedDate = "";
  let tooltipLeft = tweened(-25, {
    duration: 400,
    easing: cubicOut
  });

  function getLeft(el, i) {
    const w = el.clientWidth;
    const newLeft = (i * w) + (w / 2) - 25;
    return newLeft
  }

  function handleTickClick(e, day, i) {
    currentDateIndex = i;
  }

  afterUpdate(async () => {
    if (dateArray.length > 0) {
      const el = dateArray[currentDateIndex].el;
      $tooltipLeft = getLeft(el, currentDateIndex)
      selectedDate = dateArray[currentDateIndex].formatDate
    }
  })
</script>

<div class="black-sector">
  <div class="container">
    <p>Linea del Tiempo</p>
    <button>
      <i class='material-icons'>{ play ? "stop": "play_circle_outline" }</i>
    </button>
    <div class="timeline">
      <div class="dateTooltip" style="left:{$tooltipLeft}px;">
        <span>{selectedDate}</span>
        <span class="arrow" />
      </div>
      {#each dateArray as day,index}
        <a 
          class="square" 
          class:active={currentDateIndex === index} 
          on:click={(e) => handleTickClick(e, day, index)} 
          bind:this={day.el}
        />
      {/each}
      
    </div>
  </div>
</div>

<style>
  .timeline {
    display: flex;
    flex: 1;
    margin-left: 20px;
    position: relative;
    height: 30px;
    border-left: 2px solid #3c3c3c;
    border-right: 2px solid #3c3c3c;
    padding: 0px;
  }

  .timeline::before {
    content: "";
    position: absolute;
    width: 100%;
    top: 50%;
    top: calc(50% - 2px);
    left: 0px;
    border: 1px solid #3c3c3c;
  }

  .dateTooltip {
    position: absolute;
    bottom: 100%;
    width: 50px;
    text-align: center;
  }

  .dateTooltip span {
    color: #fff;
    width: 100%;
    display: block;
  }

  .dateTooltip .arrow {
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 6px 0 6px;
    border-color: rgb(253, 249, 3) transparent transparent transparent;
  }

  .square {
    flex: 1;
    display: flex;
    justify-content: center;
    position: relative;
    cursor: pointer;
  }

  .square::before {
    content: "";
    width: 0px;
    border-left: 1px solid #3c3c3c;
    margin: 8px 0;
    transition: border .3s;
  }
  .square.active::before,
  .square:hover::before {
    border-color: rgb(253, 249, 3);
  }

  .black-sector {
    background-color: #000;
  }

  .container {
    width: 90%;
    max-width: 700px;
    text-align: center;
    margin: 25px auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  p {
    color: #fff;
    font-size: 1.1em;
    text-align: center;
    width: 100%;
    margin: 0 0 35px 0;
    font-weight: bold;
  }

  button {
    background-color: transparent;
    font-size: 25px;
    padding: 10px;
    line-height: 20px;
    border: 0 none;
    background-color: rgb(253, 249, 3);
    color: #000;
    margin: 0;
    border-radius: 5px;
  }
</style>