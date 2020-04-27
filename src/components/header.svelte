<script>
  import logo from "../assets/bordercenter.jpg";
  import Social from "./social.svelte"
  import Menu from "./menu.svelte";
</script>

<header>
  <div class='container'>
    <div class='header-row'>
      <Menu />
    </div>
    <div class='header-row logo'>
      <img src={logo} alt='Borcer Center' />
    </div>
    <div class='header-row social'>
      <Social />
    </div>
  </div>
</header>

<style>
  header{
    border-bottom: 2px solid #e6e6e6;
    padding: 0 25px;
  }
  .container{
    display: flex;
    justify-content: center;
  }
  .header-row{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .logo{
    text-align:center;
  }
  .logo img{
    max-width: 280px;
    margin: 0 auto;
  }
  .social{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
