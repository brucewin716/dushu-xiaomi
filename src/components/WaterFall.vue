<template>
	<div class="waterfall" >
<!--     <i class="fa fa-spinner fa-spin fa-2x" aria-hidden="true" v-show='isShow'></i> -->
		<section class='channel-h5 channel-h5_tab' id='Tag_10'>
      <div class='tab_wrap'>
	      <div class='Fade list-h5_wrap data-dom-uid="6"'>
	        <div>
	          <ul class='list-h5' >
	            <li v-for="(item,index) in items" @click='goTo(item)'>
	              <div class="book-h5">
	                <div class='book-h5_cover Lazy_loading Lazy_loaded'>
	                  <img :src="item.cover"  alt=''>
	                  <div class="u-tagRT"></div>
	                  <p class='book-h5_finish'>完结</p>
	                  <div class="book-h5_order">1</div>
	                </div>
	                <div class='book-h5_info'>
	                  <p class='book-h5_title'>{{item.title}}</p>
	                  <p class="book-h5_author">{{item.authors}}</p>
	                  <p class="book-h5_summary">{{item.summary}}</p>
	                  <div class="book-h5_wrap">
	                    <div class='book-h5_tag'>{{item.category_name}}</div>
	                    <!-- <div class='book-h5_tag'>{{String(item.word_count).slice(0,3)+'万字'}}</div> -->
	                  </div>
	                </div>
	              </div>
	            </li>
	          </ul>
            <i class="fa fa-spinner fa-spin fa-2x" aria-hidden="true" ></i>
	        </div>
	      </div>
      </div>
    </section>
	</div>
</template>
<script>
import { Swipe,SwipeItem,Indicator,Toast} from 'mint-ui';
import axios from 'axios';
	export default{
		name:'WaterFall',
		data(){
			return{
          items:[],
          count:0,
          // isShow:false,
          sid:0,
      }
		},
		mounted(){
     /* window.addEventListener("scroll",this.handleScroll);*/
			Indicator.open({
        text: '正在加载...',
        spinnerType: 'fading-circle'
      });
      axios({
	      method:"GET",
	      url:'/rock/book/recommend?start='+this.count+'&count=10',
    	}).then((res)=>{
      Indicator.close();
      var respon=res.data;
      console.log(respon);
      if(respon.result==0){
          this.items=respon.items; 
          console.log(this.items);
          var self=this;
          $(window).off('scroll');
          $(window).on('scroll',function(){
        　　var scrollTop = $(this).scrollTop();
        　　var scrollHeight = $(document).height();
        　　var windowHeight = $(this).height();
        　　if(scrollTop + windowHeight+100>=scrollHeight){
        　　　 self.count=self.count+10;
        　　}
        });
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
      goTo(val){
          var self=this;
          this.$router.push({
          path:'/detail',
          query:{
           sid:val.sid
          }
        });
       }
		},
    watch:{
      "count"(){
        axios({
        method:"GET",
        url:'/rock/book/recommend?start='+this.count+'&count=10',
      }).then((res)=>{
          var respon=res.data;
          for(var i =0; i< respon.items.length;i++){
              this.items.push(respon.items[i])
          }
        })
      }
    }
	}
</script>
<style scoped>
.channel-h5{
  position: relative;
  border-bottom: 10px solid #f5f5f5;
  background: #fff;
  overflow: hidden;
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
</style>