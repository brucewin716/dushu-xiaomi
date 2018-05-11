<template>
	<div class="detail">
		<div class="header">
			<a href="javascript:history.go(-1)" class='backBtn'>
				<i class='fa fa-angle-left fa-lg'></i>
			</a>
			<span class='title'> fdfdfdffd</span>
			<a href="javascript:this.$router.push('/');" class='homeBtn'>
				<i class='fa fa-home fa-lg'></i>
			</a>
		</div>
		<div class="content">
			<div class="overview">
				<div class="overview_top">
					<div class="bookName"><img src="../image/6pxzdbsi.png" alt=""></div>
					<div class="bookintro">
						<p class='title'>港娱1975</p>
						<p class='remark'>来不及忧伤</p>
						<p class='evaluate'><span class='star'>fdfd</span>19个评价</p>
						<p class='count'>字数:425万字<span class='serial'>连载中</span></p>
					</div>
				</div>
				<div class="overview_bottom">
					<div class="btn">
						<button>开始阅读</button>
						<button>下载</button>
					</div>
					<div class="abstract">
						穿越香江一九七五。
						让我们一起回顾那些永恒的经典！
						创了个群，号：543198555，暗号：1975.
					</div>
					<div class="latest">最新：第1405章 林美人的失落 更新于 16小时前</div>
				</div>
			</div>
			<div class="sortTag">
				<h2>类别标签</h2>
				<ul class='tagBtn'><li>都市</li><li>都市生活</li></ul>
			</div>
			<div class="author_and_other">
				<p class="other">作者和其他图书</p>
				<ul class='otherList'>
					<li>
						<div><img src="" alt=""></div>
						<p>二青</p>
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
	import { Header } from 'mint-ui';
	export default{
		name:'DetailPage',
		data(){
			return {

			}
		},
		mounted(){

		},
		methods:{

		},
		watch(){

		}
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
	.detail .bookName{
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
		width: 80px;
		height: 12px;
		margin: 0px 5px 0px 0px;
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
	.detail .author_and_other .otherList li div{
		width: 86px;
		height: 113px;
	}
	.detail .author_and_other .otherList li p{
		text-align: left;
		padding: 5px 0px;
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