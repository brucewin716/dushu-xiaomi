<template>
	<div class="detail">
		<div class="header">
			<a href="javascript:history.go(-1)" class='backBtn'>
				<i class='fa fa-angle-left fa-lg'></i>
			</a>
			<span class='title'>{{item.title}}</span>
			<a href="javascript:this.$router.push('/');" class='homeBtn'>
				<i class='fa fa-home fa-lg'></i>
			</a>
		</div>
		<div class="content">
			<div class="overview">
				<div class="overview_top">
					<div class="bookName"><img :src="item.cover" alt=""></div>
					<div class="bookintro">
						<p class='title'>{{item.title}}</p>
						<p class='remark'>{{item.authors}}</p>
						<p class='evaluate'><span class='star'></span>{{item.score_count}}个评价</p>
						<p class='count'>字数:{{String(item.word_count).slice(0,3)}}万字<span class='serial'>连载中</span></p>
					</div>
				</div>
				<div class="overview_bottom">
					<div class="btn">
						<button @click='goTo()'>开始阅读</button>
						<button>下载</button>
					</div>
					<div class="abstract">{{item.content}}</div>
					<div class="latest">最新:{{item.latest}} 更新于{{this.getUpdate()}}</div>
				</div>
			</div>
			<div class="sortTag">
				<h2>类别标签</h2>
				<ul class='tagBtn'><li v-for=" subitem in item.tags">{{subitem}}</li></ul>
			</div>
			<div class="author_and_other">
				<p class="other">作者和其他图书</p>
				<ul class='otherList'>
					<li v-for='author_book in author_books'>
						<div>
							<img :src="author_book.cover" alt="">
							<p>{{author_book.title}}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="bookInfo" style='border-bottom:0px;'>
				<h3>图书信息</h3>
				<p class="copyright">版权：阅文集团旗下起点中文网</p>
			</div>
		</div>
	</div>
</template>
<script>
	import {Indicator,Toast} from 'mint-ui';
	import axios from 'axios';
	export default{
		name:'DetailPage',
		data(){
			return {
				item:{},
				source_id:'',
				author_books:[],
			}
		},
		mounted(){
			this.source_id=location.hash.split('=')[1];
			 Indicator.open({
		        text: '正在加载...',
		        spinnerType: 'fading-circle'
		      });
		      axios({
		      method:"GET",
		      url:'/hs/v0/android/fiction/book/'+this.source_id,
		    }).then((res)=>{
		      Indicator.close();
		      var respon=res.data;
		      console.log(respon)
		      if(respon.result==0){
		          this.item=respon.item;
		          this.author_books=respon.author_books;
		          console.log(this.item);
		           console.log(this.author_books);
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
			getUpdate(){
				var oldDate=new Date(this.item.updated*1000);
				var oYear=oldDate.getFullYear();
				var oMonth=oldDate.getMonth()+1;
				var oDate=oldDate.getDate();
				var oHours=oldDate.getHours();
				var ominutes=oldDate.getMinutes();
				ominutes=ominutes<10? "0"+ominutes:ominutes;
				return (oYear+'-'+oMonth+'-'+oDate+'\n\n'+oHours+':'+ominutes);
			},
			goTo(){

				this.$router.push({
					path:'/chapter',
					query:{
			           fiction_id:this.source_id
			          }
				});
			}
		},
		// watch(){

		// }
	}
</script>
<style scoped>
    .detail .header{
    	position: relative;
    	width: 100%;
    	height: 44px;
    	line-height: 44px;
    	background-color: #efeff0;
    	border-bottom: 1px solid #ddd;
    }
	.detail .backBtn{
		display: block;
		float: left;
		width: 42px;
		height: 44px;
	}
	.detail .homeBtn{
		position: absolute;
		right: 0;
		top: 0;
		display: block;
		position: ;
		width: 44px;
		height: 44px;
	}
	.detail .title{
		display: block;
		text-align: left;
	}
	.detail .content{
		width: 100%;
		height: 100%;
	}
	.detail .content .overview,.detail .content .sortTag,
	.detail .content .author_and_other,.detail .content .bookInfo{
		background: #fff;
		border-bottom: 10px solid #f5f5f5;
	}
	.detail .content .overview .overview_top{
	    display: -webkit-flex; /* Safari */
  		display: flex;
		box-sizing: border-box;
		padding: 10px 20px 30px 30px;
	}
	.detail .bookName,.detail .bookName img{
		width: 93px;
		height: 124px;
		margin-right: 18px;
	}
	.detail .bookintro{
		width: 100%;
		padding: 10px 0px;
	}
	.detail .bookintro p{
		text-align: left;
		text-indent: 30px;
		margin: 5px 0px;
	}
	.detail .bookintro p.remark{
		color:#4b99a7 ;
	}
	.detail .bookintro p .star{
		display: inline-block;
		width: 90px;
		height: 12px;
		margin: 0px 5px 0px 0px;
		background: url('../image/star.png') no-repeat 0 -148px;
	}
	.detail .bookintro p .serial{
		color: #63bd61;
		border-color: #63bd61;
		font-size: 12px;
		display: inline-block;
		border-radius: 4px;
		border: 1px solid #63bd61;
		text-indent: 0px;
		height:16px;
		line-height: 16px;
		margin-left: 10px;
	}
	.detail .bookintro p.title{
		margin-bottom: 10px;
	}
	.detail .content .overview .overview_bottom{
		width: 100%;
		box-sizing: border-box;
		/* padding: 0px 15px 15px 15px; */
	}
	.detail .content .overview .overview_bottom .btn{
		/* width: 100%; */
		height: 40px;
		margin-bottom: 25px;
		padding: 0px 15px;
	}
	.detail .content .overview .overview_bottom .btn button{
		width: 48%;
		height: 100%;
		border:1px solid #ddd;
		outline: none;
		background: #fff;
		border-radius: 5px;
	}
	.detail .content .overview .overview_bottom .btn button:first-child{
		background:#f35d02;
		color: #fff;
		border: 1px solid #e35109;
		margin-right: 1%;
	}
	.detail .content .overview .overview_bottom .abstract{
		border-bottom: 1px solid #ddd;
		padding: 0px 15px 8px 15px;
	}
	.detail .content .overview .overview_bottom .latest{
		padding: 10px 0px;
	}
	.detail .sortTag{
		text-align: left;
	}
	.detail .sortTag h2{
		padding: 14px 14px 8px 14px;
		font-size:16px;
		color: #8d8d8d;
	}
	.detail .sortTag .tagBtn{
		padding: 0px 14px 10px 14px;
		overflow: hidden;
	}
	.detail .sortTag .tagBtn li{
		font-size: 14px;
		padding:2px 10px;
		margin-right: 15px;
		border: 1px solid #ddd;
		outline: none;
		border-radius: 5px;
		float: left;
	}
	.detail .sortTag .tagBtn li:nth-child(3n+1){
		background:#fbebe8;
	}
	.detail .sortTag .tagBtn li:nth-child(3n+2){
		background:#fcedda;
	}
	.detail .author_and_other .other{
		font-size: 15px;
		padding: 15px 14px 8px 14px;
		color: #8d8d8d;
		text-align: left;
	}
	.detail .author_and_other .otherList{
		padding: 0px 14px 12px 14px;
		text-align: left;
	}
	.detail .author_and_other .otherList li{
		width: 33.3%;
		display: inline-block;
		vertical-align: top;
		line-height: 1;
		margin-bottom: 8px;
		text-align: left;
	}
	.detail .author_and_other .otherList li div,
	.detail .author_and_other .otherList li div img{
		width: 86px;
	}
	.detail .author_and_other .otherList li div p{
		line-height: 1.3;
	}
	.detail .bookInfo{
		padding: 15px 14px;
	}
	.detail .bookInfo h3{
		margin-bottom: 10px;
		font-size: 16px;
		text-align: left;
	}
	.detail .bookInfo p{
		text-align: left;
	}
</style>