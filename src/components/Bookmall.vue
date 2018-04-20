<template>
  <div class="bookMall">
    <div class="bookMallTop">
        <div class="search">输入书名/作者/关键字</div>
        <mt-swipe :auto="2000">
        <mt-swipe-item><img src="../image/1.jpg"></mt-swipe-item>
        <mt-swipe-item><img src="../image/2.jpg"></mt-swipe-item>
        </mt-swipe>
        <ul class='subItem'>
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
           <img src="../image/ranking.png" alt="">
           <p>排行</p>
         </li>
        </ul>
    </div> 
    <div class="wrap">
      <section class='channel-group main-card'>
        <div class="channel-group_header">
          <h2>{{this.items[1].ad_name}}</h2>
        </div>
        <ul class="book-table">
          <li v-for="item in items[1].data.data">
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
          <p class='channer-h5_title channel-group_title_left'>
            重磅推荐
            <i>推</i>
          </p>
          <div class="tab">
            <a href="javascript:;" class='tab_on'>男</a><a href="javascript:;">女</a>
          </div>
        </div>
        <div class="tab_bd">
          <div class='tab_wrap'>
            <div class='Fade list-h5_wrap data-dom-uid="6"'>
              <div>
                <ul class='list-h5'>
                  <li>
                    <div class="book-h5">
                      <div class='book-h5_cover Lazy_loading Lazy_loaded'>
                        <img src="" alt="" alt='我的绝美女神老婆'>
                        <div class="u-tagRT"></div>
                        <p class='book-h5_finish'>完结</p>
                        <div class="book-h5_order">1</div>
                      </div>
                      <div class='book-h5_info'>
                        <p class='book-h5_title'>我的绝美女神老婆</p>
                        <p class="book-h5_author">血色红泪</p>
                        <p class="book-h5_summary">身怀绝技的方少阳，带着对大都市的美好憧憬，本想投靠师娘，却当上了医院妇科的男医生，泡了个美女医生，误...</p>
                        <div class="book-h5_wrap">
                          <div class='book-h5_tag'>都市情缘</div>
                          <div class='book-h5_tag'>热血都市</div>
                          <div class='book-h5_tag'>506万字</div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="book-h5 book-h5_no-img">
                      <span class='book-h5_no-img_order'>02</span>
                      <div class="book-h5_no-img_info">
                        <p class='book-h5_no-img_title'>超级姐夫 <i class='book-h5_no-img_author'><span class='author'>酒天</span></i></p>
                      </div>
                    </div>
                  </li>
<!--                   <li></li>
                  <li></li>
                  <li></li> -->
                </ul>
              </div>
              <!-- <div></div> -->
              <div style='visibility:visible'></div>
            </div>
            <div class='channel-h5_footer_next' id='Tag_14'>
              <a href="javascript:;" class='btn-h5_next'>换一换</a><a href="javascript:;" class='btn-h5_more'>查看全部</a>
            </div>
          </div>
          <div class='tab_wrap' style="display:none;"></div>
        </div>
      </section>
    </div> 
  </div>
</template>

<script>
import { Swipe, SwipeItem, Indicator,Toast } from 'mint-ui';
import axios from 'axios';
export default {
  name: 'Bookmall',
  data () {
    return {
        items:[]
    }
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bookMall{
    background: #fff;
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
    /* -webkit-box-flex:1; */
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
.channel-group_title_left{
  text-align: left;
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
.tab_wrap{
  float: left;
  position: relative;
  width: 100%;
  margin-right: -100%;
  z-index: 1;
}
.Fade{
  overflow: hidden;
}
.Fade>div{
  float: left;
  position: relative;
  width: 100%;
  margin-right: -100%;
  visibility: hidden;
  z-index: 1;
  -webkit-transition: opacity 400s ease-in-out;
}
.list-h5,.list-more_wrap{
  padding: 0px 13px;
}
.list-h5 li ,.list-more_wrap li{
  padding: 17px 0px;
  border-bottom: 1px solid #f0f0f0;
}
.book-h5{
  overflow: hidden;
}
.book-h5_cover{
  float: left;
  position: relative;
  width: 85px;
  height: 113px;
  background-color: #eeece9;
  border: 1px solid #f0f0f0;
  border-radius: 1px;
  overflow: hidden;
}
.book-h5 img{
  opacity: 1;
}
.book-h5_finish{
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  font: 10px/10px a;
  padding: 25px 7px 6px;
  color: #fff;
  background: -webkit-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.3));
}
.book-h5_order{
  position: absolute;
  left: 3px;
  top: 0px;
  padding: 5px 3px 0px 4px;
  height: 17px;
  width: 12px;
  font: 8px/0.8em a;
  color: #fff;
  background: url('V3CAzyZh.png') no-repeat;
  background-size: 12px 17px;
}
.book-h5 .book-h5_info{
  margin-left: 100px;
  padding-top: 6px;
  background: #fff;
}
.book-h5_title{
  margin-bottom: 4px;
  font: 16px/17px a;
  color: rgba(0,0,0,0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
}
.book-h5_author{
  margin-top: 8px;
  font: 12px/12px a;
  color: rgba(0,0,0,0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.book-h5_summary{
  display: -webkit-box;
  margin: 8px 0 0;
  height: 2.8em;
  font: 12px/1.4em a;
  color: rgba(0,0,0,0.6);
  overflow: hidden;
  text-overflow: ellipsis;
 /*  -webkit-line-clamp:2;
  -webkit-box-orient:vertical; */
}
.book-h5_wrap{
  margin-top: 10px;
  padding-top: 3px;
  overflow: hidden;
}
.book-h5_tag{
  float: left;
  margin: -3px 7px 0 0;
  padding: 3px 6px 2px;
  max-width: 6em;
  font: 10px/11px a;
  color: #53ac7d;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid #53ac7d;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.book-h5_no-img_order{
  float: left;
  margin-top: 1px;
  font: 13px/13px a;
  color: rgba(237,83,15,0.9);
}
.book-h5_no-img_info{
  margin-left: 27px;
}
.book-h5_no-img_title{
  position: relative;
  font: 15px/15px a;
  color: rgba(0,0,0,0.9);
  background: #fff;
}
.book-h5_no-img_author{
  position: absolute;
  margin: 1px 0 0 13px;
  font: 12px/12px a;
  color: rgba(0,0,0,0.4);
  background: #fff;
}
</style>
