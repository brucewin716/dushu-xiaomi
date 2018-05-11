<template>
	<div class="free_and_special">
		<section class='channel-group main-card'>
		    <div class="channel-group_header">
		      <h2>{{items[5].ad_name}}</h2>
		    </div>
		    <ul class="book-table">
		      <li v-for="item1 in subItems1" @click='goTo()'>
		        <div class="u-book">
		          <div class="pic"><img :src="item1.data.book_cover" alt=""></div>
		          <div class="bookname">
		            <h3>{{item1.ad_name}}</h3>
		          </div>
		        </div>
		      </li>
		    </ul>
		    <a href="" class="channel-group_footer">更多限免佳作>></a>
		</section>
	    <section class='channel-group main-card'>
	        <div class="channel-group_header special">
	          <h2 class='channel-h5__title channel-group__title_left'>
	          {{items[6].ad_name}}
	          <i>热</i>
	          </h2>
	          
	        </div>
	        <ul class="book-table">
	          <li v-for="item2 in subItems2" style="width:50%" @click='goTo()'>
	            <div class="u-book" style="width:97%">
	              <div class="pic" style="width:100%"><img :src="item2.ad_pic_url" alt=""></div>
	            </div>
	          </li>
	        </ul>
	        <a href="" class="channel-group_footer">更多精彩专题>></a>
	    </section>
	</div>
</template>
<script>
import {Indicator,Toast } from 'mint-ui';
import axios from 'axios';
export default{
	name:'FreeSpec',
	data(){
		return{
		  items:[],
	      subItems1:[],
	      subItems2:[],
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
          this.subItems1=this.items[5].data.data;
          this.subItems2=this.items[6].data.data;
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
    goTo(){
          this.$router.push({
          path:'/detail',
        });
    }
  },
}
</script>
<style scoped>
   .channel-group{
    border-bottom: 10px solid #f5f5f5;
  }
  .channel-group .channel-group_header{
   position: relative;
   padding: 12px 14px;
   border: 1px solid #f0f0f0;
   border-left: 6px solid #ffab18;
 }
 .channel-group .channel-group_header.special{
 	border-left:none;
 }
  .channel-group .channel-group_header h2{
    text-align: left;
    font-size:16px;
    font-weight:normal;
    color: #333; 
 }
 .channel-h5__title {
    position: relative;
    font: bold 13px/13px a;
    color: rgba(0, 0, 0, 0.9);
}
.channel-h5__title > i {
    position: absolute;
    margin: -1px 0 0 5px;
    padding: 3px 5px 0 5px;
    font: 9px/9px a;
    color: #fff;
    background: #53ac7d;
    border-radius: 1px;
}
  .channel-group .book-table{
    padding: 13px 14px 5px;
    font-size: 0px;
 }
  .channel-group .book-table li{
  width: 33.3%;
  display: inline-block;
  vertical-align: top;
  line-height: 1;
  margin-bottom: 8px;
 }
  .channel-group .book-table li:nth-child(3n+1){
    text-align: left;
 }
  .channel-group .book-table li:nth-child(3n+2)>div{
    margin:0px auto;
 }
  .channel-group .book-table li:nth-child(3n+3)>div{
    float: right;
 }
  .channel-group .book-table li .u-book{
    width: 86px;
 }
  .channel-group .book-table li .u-book .pic{
    float: none;
    width:86px;
    height:113px;
 }
  .channel-group .book-table li .u-book .pic img{
    width: 100%;
    height: 100%;
 }
  .channel-group .book-table li .u-book .bookname h3{
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
</style>