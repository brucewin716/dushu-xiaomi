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
import axios from 'axios';
export default {
  name: 'Index',
  data () {
    return {

    }
  },
  mounted(){
    axios({
      method:"GET",
      url:'/hs/v3/channel/418',
      // url:"/mfsv2/secure/fdsc3/60009/file?nonce=6a496d3584b941ce944e264547b507cd&token=NuXIzAh93h2w99ricPIxalizAvhMjcPEvOJSTFfX7n_oCfScJnw6UtWcx7h0jHX6w2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=ZUx1aohqS2fQ09B4fkFqUntukAw",
    }).then((res)=>{
      console.log(res);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index{
    background:#F5F5F5 ;
  }
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
   .container{
    margin: 0px;
    padding: 0px;
   }
</style>
