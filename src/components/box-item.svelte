<script>
  import moment from "moment"
  import "moment/locale/es"
  moment.locale("es")

  export let alltypes = {};
  export let item = {};
  //console.log('ITEM', item)
  $: formatedDate = moment(item.date).format('DD | MMMM');
  $: itemType = alltypes[ item.type.id ].titulo[0].text;
  $: itemIcon = alltypes[item.type.id].icon[0].text;
  $: link = (item.link.link_type === 'Document') ? (
    `https://borderhub.org/${item.link.type === 'noticias' ? 'noticias' : 'noticias-especiales'}/${item.link.uid}`
  ) : (item.link.url);
</script>

<div class='item'>
  <a href={link} target='_blank'></a>
  <div class='cat'>
    <i class='material-icons'>{itemIcon}</i>
  </div>
  <div class='info'>
    <h4>
      <span>{formatedDate}</span>
      {item.title[0].text}
    </h4>
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
    position: relative;
  }
  .item a{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .item .cat{
    width: 40px;
    color: #fdf902;
    font-size: 35px;
    display: flex;
    position: relative;
  }
  .item .cat i.material-icons{
    font-size: 28px;
  }
  .item .info{
    flex: 1;
    position: relative;
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