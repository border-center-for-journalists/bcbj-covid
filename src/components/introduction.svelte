<script>
  import moment from "moment"
  import "moment/locale/es"
  moment.locale("es")

  export let lastUpdate = '';
  $: formatDate = lastUpdate !== "" ? moment(lastUpdate, 'DD-MM-YY').format('DD [de] MMMM YYYY') : ""
</script>

<div class='container'>
  <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
  <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation
    ullamco laboris nisi ut aliquip ex ea commodo</p>
  <br />
  <p class='author'><strong>Por Border Center</strong>. Última actualización: {formatDate}</p>
  <p class='author'>Datos se actualizan alrededor de las 7pm diario conforme se libera reporte de secretaria de salud
  </p>
</div>

<style>
  .container {
    width: 80%;
    max-width: 730px;
    text-align: center;
    margin: 60px auto 40px;
  }

  h1 {
    font-size: 27px;
    font-size: 1.7em;
  }

  p {
    font-size: 18px;
    font-size: 1.15em;
  }

  .author {
    font-size: 15px;
    font-size: 1em;
  }

  @media only screen and (min-width: 860px) {
    .container {
      width: 90%;
    }
  }
</style>