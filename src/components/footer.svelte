<script>
  import Social from "./social.svelte"
</script>

<p>@ 2020 Border center</p>
<footer>
  <Social isMobile={true} />
</footer>

<style>
  p{
    text-align: center;
    padding: 15px 25px;
    margin: 0;
    font-size: 14px;
  }
  footer {
    width: 100%;
    background-color: #cccccc;
    padding: 15px 25px;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
  }
</style>