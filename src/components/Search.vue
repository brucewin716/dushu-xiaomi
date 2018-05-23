<template>
	<div class="search">
		<div class="header">
			<div class="backIcon" @click='back()'>
				<i class="fa fa-angle-left fa-2x" aria-hidden="true" style='line-height:44px;'></i>
			</div>
			<div class="searchBox">
				<span class='searchIcon'><i class="fa fa-search fa-lg" aria-hidden="true"></i></span>
				<input type="text" placeholder="输入书名/作者/关键字" v-model='value'>
				<span class='searchBtn' @click='search()'>搜索</span>
			</div>
		</div>
		<!-- <div class="tagList" >
			<ul>
				<li></li>
			</ul>
		</div> -->
		<div class="bookList">
			<div class='Fade list-h5_wrap data-dom-uid="6"'>
		        <div>
		          <ul class='list-h5' >
		            <li v-for="item in items">
		              <div class="book-h5">
		                <div class='book-h5_cover Lazy_loading Lazy_loaded'>
		                  <img :src="item.cover"  alt=''>
		                  <div class="u-tagRT"></div>
		                </div>
		                <div class='book-h5_info'>
		                  <p class='book-h5_title'>{{item.title}}</p>
		                  <p class="book-h5_summary">{{item.intro}}</p>
		                  <p class="book-h5_author">{{item.role[0][1]}}</p>
		                </div>
		              </div>
		            </li>
		          </ul>
		           <i class="fa fa-spinner fa-spin fa-2x" aria-hidden="true" v-show="state"></i>
		        </div>
		    </div>
		</div>
		<div class="tip" v-show="!this.items.length">没有相应的搜索结果</div>
		
	</div>
</template>
<script>
	import {Search,Indicator,Toast} from 'mint-ui';
	import axios from 'axios';
	export default{
		name:'Search',
		data(){
			return {
				value:'',
				items:[],
				start:0,
				state:false
			}
		},
		methods:{
			back(){
				history.go(-1);
			},
			search(){
				axios({
				      method:"GET",
				      url:'store/v0/lib/query/onebox?start='+this.start+'&count=10&s='+this.value+'&source=2%2C5',
				    }).then((res)=>{
				      var respon=res.data;
				      console.log(respon);
				      if(respon.result==0){
				          this.items=respon.items;
				          var self=this;
				          $(window).scroll(function(){
				        　　var scrollTop = $(this).scrollTop();
				        　　var scrollHeight = $(document).height();
				        　　var windowHeight = $(this).height();
				        　　if(scrollTop + windowHeight == scrollHeight){
				        　　　 self.start=self.start+10;
				        	   self.state=true;
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
				
		},
		mounted(){
			
		},
		watch:{
	      "start"(){
	        axios({
	        method:"GET",
	        url:'store/v0/lib/query/onebox?start='+this.start+'&count=10&s='+this.value+'&source=2%2C5',
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
	.header{
		width: 100%;
		height: 44px;
		border-bottom: 1px solid #ddd;
		line-height: 44px;
		box-sizing: border-box;
		overflow: hidden;
	}
	.search .backIcon{
		float: left;
		width: 42px;
		height: 44px;
	}
	.search .searchBox{
		height: 35px;
		position: relative;
		margin: 5px 20px 5px 42px;
		box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
	}
	.search .searchBox .searchIcon{
		position: absolute;
		left: 0px;
		top: 0px;
		height: 35px;
		width:36px;
		line-height: 35px;
		border-right: 1px solid #ddd;
	}
	.search .searchBox input{
		border: none;
		box-sizing: border-box;
		display: block;
		width: 100%;
		height: 100%;
		padding: 8px 52px 8px 42px;
		font-size: 14px;
		color: rgba(0,0,0,0.5);
		background: #fff;
		outline: none;
	}
	.search .searchBox .searchBtn{
		display: block;
		line-height: 36px;
		position: absolute;
		right: 0px;
		top: 0px;
		border-left: 1px solid #ddd;
		padding: 0px 8px;
		font-size: 14px;
		color: #666;
	}
	.search .tagList{
		width: 100%;
	}
	.search .tagList ul{
		box-sizing: border-box;
		padding: 17px;
		overflow: hidden;
	}
	.search .tagList ul li{
		float: left;
		margin:0px 20px 20px 0px;
		font-size: 14px;
		padding: 5px 30px;
		border: 1px solid #ddd;
	}
	.search .tagList ul li:nth-child(3n+1){
		background-color: #fbebe8;
	}
	.search .tagList ul li:nth-child(3n+2){
		background-color: #fcedda;
	}
	.search .tagList ul li:nth-child(3n+3){
		background-color: #e8f9db;
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
  background: #fff;
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