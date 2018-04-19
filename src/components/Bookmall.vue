<template>
  <div class="bookMall">
    <div class="bookMallTop">
     <mt-search v-model="value" cancel-text="" placeholder='输入书名/作者/关键字' ></mt-search>
     <mt-swipe :auto="2000">
      <mt-swipe-item><img src="../image/1.jpg"></mt-swipe-item>
      <mt-swipe-item><img src="../image/2.jpg"></mt-swipe-item>
     </mt-swipe>
     <!-- <ul>
       <li>
         <img src="../image/free.png" alt="">
         <p>限免</p>
       </li>
       <li>
         <img src="../image/female.png" alt="">
         <p>女生</p>
       </li>
       <li>
         <img src="../image/male.png" alt="">
         <p>男生</p>
       </li>
       <li>
         <img src="../image/classify.png" alt="">
         <p>分类</p>
       </li>
       <li>
         <img src="../image/fanking.png" alt="">
         <p>排行</p>
       </li>
     </ul> -->
    </div>  
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  name: 'Bookmall',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bookMall .mint-search{
    height: auto;
  }
</style>
