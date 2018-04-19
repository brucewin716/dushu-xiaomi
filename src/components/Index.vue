<template>
  <div class="index">
    <div class="header">
      <ul>
        <li class="left"><i class='fa fa-arrow-left'></i></li>
        <li class="middle">
          <router-link to="/bookmall"><span class="bookstore">书城</span></router-link>
          <router-link to='/bookcase'><span class="bookshelf">书架</span></router-link>  
        </li>
        <li class='right'><i class="fa fa-user-o fa-lg"></i></li>
      </ul>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index .header{
    height: 45px;
    width: 100%;
    background: #EFEFF0;
  }
  .index .header ul{
    overflow: hidden;
    width: 95%;
    margin: 0px auto;
  }
   .index .header ul li{
    float: left;
    line-height: 45px;
   }
   .index .header ul li.left{
    text-align: left;
    width:30%;
   }
   .index .header ul li.middle{
    box-sizing:border-box;
    width:40%;
    padding: 0px 10px;
   }
   .index .header ul li.middle span{
    display:block;
    width:30%;
    text-align: center;
   }
   .index .header ul li.middle span.bookstore{
    float: left;
   }
   .index .header ul li.middle span.bookshelf{
    float: right;
   }
   .index .header ul li.right{
    text-align:right;
    width:30%;
   }
</style>
