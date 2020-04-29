<script>
  import moment from "moment"
  import "moment/locale/es"
  moment.locale("es")

  export let alltypes = {};
  export let item = {};
  //console.log('ITEM', item, alltypes)
  $: formatedDate = moment(item.date).format('DD | MMMM');
  $: itemType = alltypes[ item.type.id ].titulo[0].text;
  $: itemIcon = alltypes[item.type.id].icon[0].text;
</script>

<div class='item'>
  <div class='cat'>
    <i class='material-icons'>{itemIcon}</i>
  </div>
  <div class='info'>
    <h4><a href='/'>
      <span>{formatedDate}</span>
      {item.title[0].text}
    </a></h4>
    <p>{itemType}</p>
  </div>
</div>

<style>
  .item{
    border-bottom: 1px solid #fff;
    padding: 10px;
    box-sizing: border-box;
    color: #fff;
    display: flex;
  }
  .item .cat{
    width: 40px;
    color: #fdf902;
    font-size: 35px;
    display: flex;
  }
  .item .cat i.material-icons{
    font-size: 28px;
  }
  .item .info{
    flex: 1;
  }
  h4{
    font-size: 12px;
    font-size: 1.2em;
    margin: 0;
    margin-bottom: 5px;
  }
  h4 a{
    color: #fff;
    text-decoration: none;
  }
  h4 span{
    color: #fdf902;
    font-weight: normal;
  }
  p{
    font-size: 12px;
    font-size: 1em;
    margin: 0;
  }
</style>