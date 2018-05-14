<template>
	<div class="chapterPage">
		<ul>
			<li>
				<h2 class='chapter_title'>{{charts.t}}</h2>
				<p class='content' v-for=' chart in charts.p'>{{chart}}</p>
			</li>
		</ul>
	</div>
</template>
<script>
	import {Indicator,Toast} from 'mint-ui';
	import axios from 'axios';
	export default{
		name:'ChapterPage',
		data(){
			return {
				urlPath:'',
				charts:'',
				fiction_id:0,
				chapter_id:0,
				chapterArr:[]
			}
		},
		mounted(){
			this.fiction_id=location.hash.split('=')[1];
			 Indicator.open({
		        text: '正在加载...',
		        spinnerType: 'fading-circle'
		      });
		      axios({
		      method:"GET",
		      url:'/api/private/dushu/getDushuCallbackUrl?fiction_id='+this.fiction_id+'&chapter_id='+this.chapter_id+'0&format=jsonp',
		    }).then((res)=>{
		      Indicator.close();
		      var respon=res.data;
		      if(respon.result==0){
		          this.urlPath=respon.url.slice(27);
		          axios({
			      method:"GET",
			      url:this.urlPath,
			    }).then((res)=>{
			    	var respon=res.data;
			    	this.charts=JSON.parse(Base64.decode(respon.split("'")[1]));
			    	var self=this;
				    $(window).scroll(function(){
			        　　var scrollTop = $(this).scrollTop();
			        　　var scrollHeight = $(document).height();
			        　　var windowHeight = $(this).height();
			        　　if(scrollTop + windowHeight == scrollHeight){
			        　　　 self.chapter_id=self.chapter_id+1;
			              console.log(self.chapter_id);
			        　　}
			        });
			    	console.log(this.charts);
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

		},
		watch:{
			"chapter_id"(){
		        axios({
		        method:"GET",
		        url:'/api/private/dushu/getDushuCallbackUrl?fiction_id='+this.fiction_id+'&chapter_id='+this.chapter_id+'0&format=jsonp',
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
    .chapterPage{
    	padding: 15px;
    	background: #f7eee5;
    }
	.chapterPage ul li{
		margin-bottom: 50px;
	}
	.chapterPage ul li h2{
		font-size: 20px;
		border-bottom: 1px solid #736357;
		margin-bottom: 20px;
		line-height: 31px;
		color: #736357;
		letter-spacing: 2px;
		text-align: left;
		font-weight: bold;
	}
	.chapterPage ul li p{
		font-size: 16px;
		text-indent:30px;
		line-height: 1.5;
		text-align: left;
	}
</style>