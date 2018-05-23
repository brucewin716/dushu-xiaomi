<template>
	<div class="chapterList">
		<div class="header">
			<span class='icon_left' @click='back()'></span>
			<span class='title' style='color:#000;font-size:16px;'>目录</span>
			<span class='icon_right' @click='goTo()'></span>
		</div>
		<div class="list">
			<ul class='chapter'>
				<li v-for='item in items' @click='skip(item)'>
					<h2 class='chapter_title'>{{item.title}}</h2>
				</li>
			</ul>
		</div>
		<i v-show="show" class="fa fa-spinner fa-spin fa-2x" aria-hidden="true" ></i>
	</div>
</template>
<script>
	import {Indicator,Toast} from 'mint-ui';
	import axios from 'axios';
	export default{
		name:'ChapterList',
		data(){
			return {
				items:[],
				chapterArr:[],
				show:false,
				fiction_id:this.$route.query.fiction_id,
				chapter_id:0
			}
		},
		mounted(){
			 Indicator.open({
		        text: '正在加载...',
		        spinnerType: 'fading-circle'
		      });
		      axios({
		      method:"GET",
		      url:'store/v0/fiction/detail/'+this.fiction_id+'?chapter_id='+this.$route.query.chapter_id,
		    }).then((res)=>{
		      Indicator.close();
		      var respon=res.data;
		      if(respon.result==0){
		      	this.items=respon.item.toc;
		      	console.log(this.items);
		      }
		    }).catch((e)=>{
		      Toast({
		          message:e.message,
		          iconClass:'mint-toast-icon mintui mintui-field-error' 
		        });
		    });
		},
		methods:{
			back(){
				history.go(-1);
			},
			goTo(){
				this.$router.push({path:'/'});
			},
			skip(val){
				this.$router.replace('chapter?fiction_id='+this.fiction_id+'&chapter_id='+val.chapter_id);
				localStorage.setItem('fiction'+this.fiction_id+'_progress',val.chapter_id);
				this.$router.push({
					path:'/chapter',
					query:{
						fiction_id:this.fiction_id,
						chapter_id:val.chapter_id
					}
				});
		}	
	  },
	}
</script>
<style scoped>
    .chapterList{
    	height: 100%;
    	background: #fff !important;
    }
    .chapterList .list{
		margin-top: 45px;
    }
	.chapterList ul li{
		box-sizing: border-box;
		text-indent:15px;
	}
	.chapterList ul li h2{
		font-size:14px;
		border-bottom: 1px solid #ddd;
		line-height:40px;
		color: #000;
		letter-spacing: 2px;
		text-align: left;
	}
	.chapterList .header{
		position:fixed;
		left: 0px;
		top: 0px;
		z-index: 2;
		width: 100%;
		height:45px;
		background:#efeff0;
		text-align: left;
		padding-left: 45px;
		box-sizing: border-box;
		line-height: 50px;
	}
	.chapterList .header .icon_left{
		display: block;
		width:42px;
		height:44px;
		background: url("../image/x0d0grws.png") no-repeat center;
		background-size:16px;
		position: absolute;
		left:0px;
		top: 0px;
		z-index: 2;
	}
	.chapterList .header .icon_right{
		display: block;
		width:44px;
		height:44px;
		background: url("../image/qts90e2zvritaa.png") no-repeat center;
		background-size:16px;
		position: absolute;
		right:0px;
		top:0px;
		z-index: 2;
	}
</style>