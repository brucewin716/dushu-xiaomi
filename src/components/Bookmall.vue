<template>
  <div class="bookMall">
    <div class="header">
      <ul>
        <li class="left" @click='back()'><img src="../image/1.png" alt="" style='width:25px;height:25px;vertical-align:middle;'></li>
        <li class="middle">
          <router-link to="/"><span class="bookstore">书城</span></router-link>
          <router-link to='/bookcase'><span class="bookshelf">书架</span></router-link>  
        </li>
        <li class='right'></li>
      </ul>
    </div>
    <div class="bookMallTop">
        <div class="search" @click='jumpTo()'>输入书名/作者/关键字</div>
        <mt-swipe :auto="2000">
          <mt-swipe-item><img src="../image/1.jpg"></mt-swipe-item>
          <mt-swipe-item><img src="../image/2.jpg"></mt-swipe-item>
        </mt-swipe>
        <ul class='subItem'>
           <li v-for="subItem1 in subItems">
             <img :src="subItem1.ad_copy.split('|')[2].split(';')[0]" alt="">
             <p>{{subItem1.ad_name}}</p>
           </li>
        </ul>
    </div> 
    <div class="wrap">
      <section class='channel-group main-card'>
        <div class="channel-group_header">
          <h2>{{items[1].ad_name}}</h2>
        </div>
        <ul class="book-table">
          <li v-for="item in items[1].data.data" @click="goTo(item)">
            <div class="u-book">
              <div class="pic"><img :src="item.cover" alt=""></div>
              <div class="bookname">
                <h3>{{item.title}}</h3>
              </div>
            </div>
          </li>
        </ul>
        <a href="" class="channel-group_footer">查看更多</a>
      </section>
      <section class='channel-h5 channel-h5_tab' id='Tag_10'>
        <div class="channel-h5_header">
          <p class='channel-h5_title channel-group_title_left'>
            {{items[2].ad_name}}
            <i>推</i>
          </p>
          <div class="tab">
            <a href="javascript:;" @click="toggle(1)" :class="{tab_on:nowIndex==1}">男</a>
            <a href="javascript:;" @click="toggle(2)" :class="{tab_on:nowIndex==2}">女</a>
          </div>
        </div>
        <div class="tab_bd" >
          <male-rec v-show="nowIndex==1"></male-rec>
          <female-rec v-show="nowIndex==2"></female-rec>
        </div>
     </section> 
     <female-love></female-love>
     <male-love></male-love>
     <free-spec></free-spec>
     <water-fall></water-fall>
    </div>
  </div>
</template>

<script>
import { Swipe,SwipeItem,Indicator,Toast } from 'mint-ui';
import axios from 'axios';
import MaleRec from '@/components/MaleRec';
import FemaleRec from '@/components/FemaleRec';
import MaleLove from '@/components/MaleLove';
import FemaleLove from '@/components/FemaleLove';
import FreeSpec from '@/components/FreeSpec';
import WaterFall from '@/components/WaterFall';
export default {
  name: 'Bookmall',
  data () {
    return {
        nowIndex:1,
        items:[],
        subItems:[],
        fiction_id:0,
    }
  },
  components:{
    MaleRec,
    FemaleRec,
    MaleLove,
    FemaleLove,
    FreeSpec,
    WaterFall
  },
  mounted(){
      Indicator.open({
        text: '正在加载...',
        spinnerType: 'fading-circle'
      });
      axios({
      method:"GET",
      url:'/hs/v3/channel/418',
    }).then((res)=>{
      Indicator.close();
      var result=res.data;
      if(result.ad_setting_id==418){
          this.items=result.items;
          console.log(this.items);
          this.subItems=result.items[0].data.data.slice(2);
          console.log(this.subItems);
      }else{
        Toast({
          message: '数据请求失败',
          iconClass:'mint-toast-icon mintui mintui-field-error' 
        });
      }
    }).catch((e)=>{
      Toast({
          message:e.message,
          iconClass:'mint-toast-icon mintui mintui-field-error' 
        });
    });
  },
  methods:{
       toggle(val){
        this.nowIndex=val;
       },
       back(){
        history.go(-1);
       },
       jumpTo(){
        this.$router.push({
          path:'search',
        });
       },
       goTo(val){
          var self=this;
          this.$router.push({
          path:'/detail',
          query:{
           fiction_id:val.fiction_id,
          }
        });
       }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bookMall{
    background: #fff;
  }
   .bookMall .header{
    height: 45px;
    width: 100%;
    background: #EFEFF0;
  }
  .bookMall .header ul{
    overflow: hidden;
    width: 95%;
    margin: 0px auto;
  }
   .bookMall .header ul li{
    float: left;
    line-height: 45px;
    vertical-align:middle;
   }
   .bookMall .header ul li.left{
    text-align: left;
    width:30%;
   }
   .bookMall .header ul li.middle{
    box-sizing:border-box;
    width:40%;
    padding: 0px 10px;
   }
   .bookMall .header ul li.middle span{
    display:block;
    width:30%;
    text-align: center;
   }
   .bookMall .header ul li.middle span.bookstore{
    float: left;
   }

   .bookMall .header ul li.middle .router-link-active span.bookstore{
     color:#ff6600;
     border-bottom: 2px solid #777;
   }
   .bookMall .header ul li.middle span.bookshelf{
    float: right;
   }
   .bookMall .header ul li.right{
    text-align:right;
    width:30%;
    height: 47px;
    background: url('../image/boug2ejlvetomc.png') no-repeat 80px 15px;
    background-size: 18px;
   }
  .bookMall .bookMallTop{
    padding-top: 10px;
    border-bottom: 10px solid #f5f5f5;
  } 
  .bookMall .bookMallTop .search{
    box-sizing: border-box;
    width: 349px;
    height: 36px;
    margin: 0px 13px 10px 13px;
    border: 1px solid #f5f5f5;
    padding:1px 0px 0px 30px;
    text-align:left;
    font: 11px/33px a;
    color: rgba(0,0,0,0.4);
    border-radius: 2px;
    background: url("../image/76vuoz@b.png") no-repeat 8px center;
    background-size:14px ;
  }
  .bookMall .bookMallTop .subItem{
    width: 100%;
    margin: 14px 0px 4px;
    display: -webkit-box;
  }
  .bookMall .bookMallTop .subItem li{
    font-size: 12px;
    text-align: center;
    line-height: 2.4;
    -webkit-box-flex:1;
  }
  .bookMall .bookMallTop .subItem li img{
    display: block;
    margin: 0px auto;
    width: 22px;
    height: 22px;
  }
   .wrap .channel-group{
    border-bottom: 10px solid #f5f5f5;
  }
 .wrap .channel-group .channel-group_header{
   position: relative;
   padding: 12px 14px;
   border: 1px solid #f0f0f0;
   border-left: 6px solid #ffab18;
 }
 .wrap .channel-group .channel-group_header h2{
    text-align: left;
    font-size:16px;
    font-weight:normal;
    color: #333; 
 }
 .wrap .channel-group .book-table{
    padding: 13px 14px 5px;
    font-size: 0px;
 }
 .wrap .channel-group .book-table li{
  width: 33.3%;
  display: inline-block;
  vertical-align: top;
  line-height: 1;
  margin-bottom: 8px;
 }
 .wrap .channel-group .book-table li:nth-child(3n+1){
    text-align: left;
 }
 .wrap .channel-group .book-table li:nth-child(3n+2)>div{
    margin:0px auto;
 }
 .wrap .channel-group .book-table li:nth-child(3n+3)>div{
    float: right;
 }
 .wrap .channel-group .book-table li .u-book{
    width: 86px;
 }
 .wrap .channel-group .book-table li .u-book .pic{
    float: none;
    width:86px;
    height:113px;
 }
 .wrap .channel-group .book-table li .u-book .pic img{
    width: 100%;
    height: 100%;
 }
 .wrap .channel-group .book-table li .u-book .bookname h3{
  text-align: left;
  font-size: 13px;
  line-height: 1.4em;
  max-height: 2.8em;
  overflow: hidden;
  color: #8d8d8d;
  margin-top: 8px;
 }
 .channel-group_footer{
  display: block;
  border-top: 1px solid #f0f0f0;
  text-align: center;
  font-size: 14px;
  padding: 10px 0px;
 }


.channel-h5{
  position: relative;
  border-bottom: 10px solid #f5f5f5;
  background: #fff;
}
.channel-h5_header{
  padding: 15px 13px 14px 13px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}
.channel-h5_title{
  position: relative;
  font: bold 13px/13px a;
  color: rgba(0,0,0,0.9);
}
.channel-h5_title>i{
  position: absolute;
  margin: -1px 0 0 5px;
  padding: 3px 5px 0px 5px;
  font: 9px/9px a;
  color: #fff;
  background: #53ac7d;
  border-radius: 1px;
}
.channel-group_title_left{
  text-align: left;
}
.tab{
  position: absolute;
  top: 9px;
  right: 13px;
}
.tab a{
  position: relative;
  padding: 16px 7px;
  font: 12px/12px a;
  color: #999;
}
.tab a:last-child{
  padding-right: 0;
}
.tab_on{
  color: #528ac8 !important;
}

.tab_bd{
  overflow: hidden;
}
</style>
