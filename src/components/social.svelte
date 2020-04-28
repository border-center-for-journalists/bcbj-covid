<script>
  export let isMobile = false;
  console.log('MOBILE', isMobile);
  $: isMobileClass = isMobile ? 'isMobile' : ''
</script>

<span class={isMobileClass}>
  <a href='/'><i class='icon-facebook' /></a>
  <a href='/'><i class='icon-twitter' /></a>
  <a href='/'><i class='icon-youtube' /></a>
</span>

<style>
  a {
    color: #fff;
    background-color: #000;
    border-radius: 50%;
    text-decoration: none;
    font-size: 13px;
    padding: 5px;
    width: 26px;
    height: 26px;
    margin: 0 10px;
    box-sizing: border-box;
    text-align: center;
    display: inline-block;
  }

  .middle {
    vertical-align: middle;
  }
  @media only screen and (max-width: 660px){
    span:not(.isMobile) a{
      display: none;
    }
  }
</style>