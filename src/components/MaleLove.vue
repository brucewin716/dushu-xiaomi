<template>
	<div class="maleLove">
    <section class='channel-h5 channel-h5_tab' id='Tag_10'>
      <div class="channel-h5_header">
        <p class='channel-h5_title channel-group_title_left'>
          {{items[4].ad_name}}
          <i>推</i>
        </p>
      </div>
      <div class='tab_wrap'>
      <div class='Fade list-h5_wrap data-dom-uid="6"'>
        <div v-for="(maleL,index) in maleLove" class='maleLoveTag'>
          <ul class='list-h5' v-for='maleLitem in maleL'>
            <li>
              <div class="book-h5">
                <div class='book-h5_cover Lazy_loading Lazy_loaded'>
                  <img :src="maleLitem.cover"  alt=''>
                  <div class="u-tagRT"></div>
                  <p class='book-h5_finish'>完结</p>
                  <div class="book-h5_order">1</div>
                </div>
                <div class='book-h5_info'>
                  <p class='book-h5_title'>{{maleLitem.title}}</p>
                  <p class="book-h5_author">{{maleLitem.author}}</p>
                  <p class="book-h5_summary">{{maleLitem.summary}}</p>
                  <div class="book-h5_wrap">
                    <div class='book-h5_tag' v-for="tag in maleLitem.tags.slice(0,2)">{{tag}}</div>
                    <div class='book-h5_tag'>{{String(maleLitem.word_count).slice(0,3)+'万字'}}</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class='channel-h5_footer_next' id='Tag_14'>
        <a href="javascript:;" class='btn-h5_next' @click="change()">换一换</a>
        <a href="javascript:;" class='btn-h5_more'>男生频道>></a>
      </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Swipe,SwipeItem,Indicator,Toast } from 'mint-ui';
import axios from 'axios';
export default{
name:'MaleLove',
data(){
	return {
	    items:[],
      maleLove:[],
      subItems:[],
      index:0
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
          for(var i=0;i<2;i++){
                this.maleLove.push(result.items[4].data.data.splice(0,5));//15份数据分出3大份
          }
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
   change(){
      var maleLoveTag=$('.maleLoveTag');
      this.index++;
      if(this.index==3){
        this.index=0;
      }
      maleLoveTag.eq(this.index).css('visibility','visible').siblings().css('visibility','hidden');
   },
  }
}
</script>

<style scoped>
.maleLove{
	overflow: hidden;
}	
.channel-h5{
  position: relative;
  border-bottom: 10px solid #f5f5f5;
  background: #fff;
  overflow: hidden;
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
.Fade>div:nth-child(1){
  visibility: visible;
}
.list-h5,.list-more_wrap{
  padding: 0px 13px;
}
.list-h5 li,.list-more_wrap li{
  padding: 17px 0px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
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
  width: 100%;
  height: 100%;
  border-radius: 1px;
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
  background: url('../image/v3cazyzh.png') no-repeat;
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
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
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
.channel-h5_footer_next{
  border-top: 1px solid #f0f0f0;
  overflow: hidden;
}
.channel-h5_footer_next>a:first-child{
  border-right: 1px solid #f0f0f0;
}
.channel-h5_footer_next>a{
  float: left;
  width: 50%;
  padding: 14px;
  font: 13px/1.3em a;
  color: rgba(0,0,0,0.9);
  box-sizing: border-box;
  text-align: center;

}
</style>