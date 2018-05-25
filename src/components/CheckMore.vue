<template>
	<div class="checkMore">
		<div class="header">
			<a href="javascript:;" class='backBtn' @click='skip()'>
			</a>
			<span class='title'>{{hotObj.label}}</span>
			<a href="javascript:;" class='homeBtn' @click='skip()'>
			</a>
		</div>
		<div class="wrap">
			<div>
	          <ul class='list-h5'>
	            <li v-for="(item,index) in items" @click='goTo(item.fiction_id)'>
	              <div class="book-h5">
	                <div class='book-h5_cover Lazy_loading Lazy_loaded'>
	                  <img :src="item.cover"  alt=''>
	                  <div class="u-tagRT"></div>
	                </div>
	                <div class='book-h5_info'>
	                  <p class='book-h5_title'>{{item.title}}</p>
	                  <p class="book-h5_summary">{{item.summary}}</p>
	                  <p class="book-h5_author">{{item.authors}}</p>
	                </div>
	              </div>
	            </li>
	            <!-- <i class="fa fa-spinner fa-spin fa-2x" aria-hidden="true"></i> -->
	          </ul>
	          <div class='moreSpc' @click='moreSpec()'>更多专题</div>
	        </div>
		</div>
	</div>
</template>
<script>
	import {Indicator,Toast} from 'mint-ui';
	import axios from 'axios';
	export default{
		name:'CheckMore',
		data(){
			return {
				hotObj:{},
				items:[],
				start:0,
				group_ids:[],
			}
		},
		mounted(){
			 Indicator.open({
		        text: '正在加载...',
		        spinnerType: 'fading-circle'
		      });
		      axios({
		      method:"GET",
		      url:'store/v0/fiction/list/11059?start='+this.start+'&count=10',
		    }).then((res)=>{
		      Indicator.close();
		      var respon=res.data;
		      this.group_ids=respon.group_ids;
		      this.hotObj=respon;
		      if(respon.result==0){
		          this.items=respon.items;
		          var self=this;
		          $(window).off('scroll');
				    $(window).on('scroll',function(){
			        　　var scrollTop = $(this).scrollTop();
			        　　var scrollHeight = $(document).height();
			        　　var windowHeight = $(this).height();
			        　　if(scrollTop + windowHeight == scrollHeight&self.start*2<self.group_ids.length){
			        　　　self.start+=10;		              
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
			moreSpec(){

			},
			skip(){
				this.$router.push({path:'/'});
			},
			goTo(fiction_id){
				this.$router.push({
					path:'/detail',
					query:{
			           fiction_id:fiction_id,
			          }
				});
			}
		},
		watch:{
			"start"(){
				axios({
			      method:"GET",
			      url:'store/v0/fiction/list/11059?start='+this.start+'&count=10',
			    }).then((res)=>{
			    	var respon=res.data;
			    	if(respon.result==0){
			    		this.items=this.items.concat(respon.items);
			    	}
			    })
			}
		}
	}
</script>
<style scoped>
	.checkMore{
		background: #fff;
	}
    .checkMore .header{
    	position: relative;
    	width: 100%;
    	height: 44px;
    	line-height: 44px;
    	background-color: #efeff0;
    	border-bottom: 1px solid #ddd;
    	text-align: left;
    }
	.checkMore .backBtn{
		display: block;
		float: left;
		width: 42px;
		height: 44px;
		background: url('../image/x0D0GrWs.png') no-repeat center;
		background-size:10px;
	}
	.checkMore .homeBtn{
		position: absolute;
		right: 0;
		top: 0;
		display: block;
		position: ;
		width: 44px;
		height: 44px;
		background: url('../image/qts90e2zvritaa.png') no-repeat center;
		background-size:16px;
	}
	/* .checkMore .list-h5,.list-more_wrap{
	  padding: 0px 13px;
	} */
	.checkMore .list-h5 li,.list-more_wrap li{
	  padding: 17px 13px;
	  border-bottom: 1px solid #f0f0f0;
	  text-align: left;
	}
	.checkMore .book-h5{
	  overflow: hidden;
	}
	.checkMore .book-h5_cover{
	  float: left;
	  position: relative;
	  width: 95px;
	  height: 123px;
	  background-color: #eeece9;
	  border: 1px solid #f0f0f0;
	  border-radius: 1px;
	  overflow: hidden;
	}
	.checkMore .book-h5 img{
	  width: 100%;
	  height: 100%;
	  border-radius: 1px;
	}
	.checkMore .book-h5 .book-h5_info{
	  margin-left: 108px;
	  padding-top: 6px;
	  background: #fff;
	}
	.checkMore .book-h5_title{
	  margin-bottom: 4px;
	  font: 16px/17px a;
	  color: rgba(0,0,0,0.9);
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space:nowrap;
	}
	.checkMore .book-h5_author{
	  margin-top: 8px;
	  font: 14px/12px a;
	  color: rgba(0,0,0,0.7);
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	.checkMore .book-h5_summary{
	  display: -webkit-box;
	  margin: 8px 0 0;
	  height: 2.8em;
	  font: 14px/1.4em a;
	  color: rgba(0,0,0,0.6);
	  overflow: hidden;
	  text-overflow: ellipsis;
	  -webkit-line-clamp:2;
	  -webkit-box-orient:vertical;
	}
	.checkMore .book-h5_wrap{
	  margin-top: 10px;
	  padding-top: 3px;
	  overflow: hidden;
	}
	.checkMore .book-h5_tag{
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
	.checkMore .book-h5_no-img_order{
	  float: left;
	  margin-top: 1px;
	  font: 13px/13px a;
	  color: rgba(237,83,15,0.9);
	}
	.checkMore .book-h5_no-img_info{
	  margin-left: 27px;
	}
	.checkMore .book-h5_no-img_title{
	  position: relative;
	  font: 15px/15px a;
	  color: rgba(0,0,0,0.9);
	  background: #fff;
	}
	.checkMore .book-h5_no-img_author{
	  position: absolute;
	  margin: 1px 0 0 13px;
	  font: 12px/12px a;
	  color: rgba(0,0,0,0.4);
	  background: #fff;
	} 
	.checkMore .moreSpc{
		width:100%;
		height: 57px;
		text-align: center;
		line-height: 57px;
		font-size: 14px;
	}
</style>