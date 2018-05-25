<template>
	<div class="chapterPage">
		<ul class='chapter'>
			<li v-for='chapter in chapterArr'>
				<h2 class='chapter_title'>{{chapter.t}}</h2>
				<p class='content' v-for=' chart in chapter.p'>{{chart}}</p>
			</li>
			<i v-show="show" class="fa fa-spinner fa-spin fa-2x" aria-hidden="true" ></i>
		</ul>
		<div class="maskWrap" v-show='state'>
			<div class="mask"></div>
			<div class="reader_head">
				<span class='icon_left' @click="back()"></span>
				<span class='title' style='color:#fff;'>返回</span>
				<span class='icon_right' @click='popu()'></span>
			</div>
			<div class="reader_foot" :data-night='num'>
				<div class="reader_ft_bar">
					<a href="javascript:;" class='prev_chapter' @click='skipChapter()'>上一章</a>
					<a href="javascript:;" class='chapter_change'>{{this.chapter_id+"/"+this.chapter_count}}</a>
					<a href="javascript:;" class='next_chapter' @click='skipChapter()'>下一章</a>
				</div>
				<a href="javascript:;" class='reader_toc' @click='goTo()'></a>
				<a href="javascript:;" class='reader_ft' @click='changeView()' v-show='state'></a>
				<a href="javascript:;" class='reader_night' @click='changeDayNight()'></a>
				<a href="javascript:;" class='reader_download'></a>
			</div>
			<div class="reader_font" v-show='fontState'>
				<div class="reader_font-size">
					<span>字号</span>
					<a href="javascript:;" class="reader_font-large" @click='plus()'>大</a>
					<a href="javascript:;" class="reader_font_small" @click='minus()'>小</a>
				</div>
				<div class="reader_font-bg">
					<span>背景</span>
					<a href="javascript:;" v-for=" (n,index) in 6" :data-bg="index" @click='changeColor(index)'></a>
				</div>
			</div>
		</div>
		<div class="clickZero" @click='changeView()'></div>
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
				fiction_id:this.$route.query.fiction_id,
				chapter_id:this.$route.query.chapter_id,
				chapter_count:0,
				chapterArr:[],
				show:false,
				state:false,
				fontState:false,
				change:0,
				num:0,
				readerFontSize:Number(localStorage.getItem('readerFontSize')),
				colorArr:['#0f1410','#f7eee5','#e9dfc7','#a4a4a4','#cdefce','#283548']
			}
		},
		mounted(){
			this.chapter_count=JSON.parse(localStorage.getItem('fiction'+this.fiction_id)).chapter_count;
			localStorage.setItem('readerFontSize',16)
			 Indicator.open({
		        text: '正在加载...',
		        spinnerType: 'fading-circle'
		      });
		      axios({
		      method:"GET",
		      url:'/api/private/dushu/getDushuCallbackUrl?fiction_id='+this.fiction_id+'&chapter_id='+this.chapter_id+'&format=jsonp',
		    }).then((res)=>{

		      Indicator.close();
		      var respon=res.data;
		      if(respon.result==0){
		          this.urlPath=respon.url.slice(27);
		          axios({
			      method:"GET",
			      url:this.urlPath,
			    }).then((res)=>{
			    	this.show=true;
			    	var respon=res.data;
			    	this.charts=JSON.parse(Base64.decode(respon.split("'")[1]));
			    	console.log(this.charts);
			    	this.chapterArr.push(this.charts);
			    	var self=this;
			    	$(window).off('scroll');
				    $(window).on('scroll',function(){
			        　　var scrollTop = $(this).scrollTop();
			        　　var scrollHeight = $(document).height();
			        　　var windowHeight = $(this).height();
			        　　if(scrollTop + windowHeight==scrollHeight){
			        　　　 self.chapter_id++;
			        	   localStorage.setItem('fiction'+self.fiction_id+'_progress',self.chapter_id);
			        	  self.$router.replace('chapter?fiction_id='+self.fiction_id+'&chapter_id='+self.chapter_id);			              
			        　　}
			        });
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
			popu(){
				this.popupVisible=true;
			},
			changeDayNight(){
				if(this.num==0){
					this.num=1;
					$('.chapter').css('backgroundColor','#0f1410');
				}else{
					this.num=0;
					$('.chapter').css('backgroundColor','');
				}
			},
			changeColor(val){
				$("a[data-bg='"+val+"']").addClass('active').siblings('a').removeClass('active');
				$('.chapter').css('backgroundColor',this.colorArr[val]);
			},
			plus(){
				if(this.readerFontSize<21){
					this.readerFontSize++;
					localStorage.setItem('readerFontSize',this.readerFontSize);
					$('.chapter p').attr({style:'font-size:'+this.readerFontSize+'px'});
				}
			},
			minus(){
				if(this.readerFontSize>11){
					this.readerFontSize--;
					localStorage.setItem('readerFontSize',this.readerFontSize);
					$('.chapter p').attr({style:'font-size:'+this.readerFontSize+'px'});
				}
			},
			back(){
				$(window).off('scroll');
				this.$router.push({
					path:'/detail',
					query:{
						fiction_id:this.fiction_id
					}
				})
			},
			goTo(){
				this.$router.push({
					path:'/chapterList',
					query:{
						fiction_id:this.fiction_id,
						chapter_id:0
					}
				});
			},
			changeView(e){
				var e=e||window.event;
				var target=e.target;
				if(target.nodeName=="DIV"){
					this.state=!this.state;	
				}else{
					this.fontState=!this.fontState;
				}
			},
			skipChapter(e){
				$(window).scroll(function(){
					return false;
				});
				// $('body').prop('scrollTop','0');
				var e=e||window.event;
				var target=e.target;
				this.change=1;
				if(target.innerHTML=='上一章'){
					if(this.chapter_id>0){
						this.chapter_id--;
					}else{
						this.chapter_id=0;
					}
					
					localStorage.setItem('fiction'+this.fiction_id+'_progress',this.chapter_id);
					this.$router.replace('chapter?fiction_id='+this.fiction_id+'&chapter_id='+this.chapter_id);
				}else{
					if(this.chapter_id<this.chapter_count){
						this.chapter_id++;
					}else{
						this.chapter_id=this.chapter_count;
					}
					
					localStorage.setItem('fiction'+this.fiction_id+'_progress',this.chapter_id);
					this.$router.replace('chapter?fiction_id='+this.fiction_id+'&chapter_id='+this.chapter_id);
				}
			}
		},
		watch:{
			"chapter_id"(){
		       axios({
			      method:"GET",
			      url:'/api/private/dushu/getDushuCallbackUrl?fiction_id='+this.fiction_id+'&chapter_id='+this.chapter_id+'&format=jsonp',
		       }).then((res)=>{
		       		var respon=res.data;
		       		if(respon.result==0){
		       			this.urlPath=respon.url.slice(27);
		       			axios({
					      	method:"GET",
					      	url:this.urlPath,
						}).then((res)=>{
							var respon=res.data;
			    			this.charts=JSON.parse(Base64.decode(respon.split("'")[1]));
			    			if(this.change==1){		    				
			    				this.chapterArr=[];
			    				this.chapterArr.push(this.charts);
			    				this.change=0;
			    			}else{
			    				this.chapterArr.push(this.charts);	
			    			}
						})
		       		}
		       })
		    }
		}
	}
</script>
<style scoped>
    .chapterPage{
    	background: #f7eee5;
    	height: 100%;
    }
 /*    .chapterPage::-webkit-scrollbar{
    	display: none;
	} */
    .chapterPage ul{
    	background: #f7eee5;
    }
   /*  .chapterPage[data-night='1'] ul{
    	background: #f7eee5;
    } */
	.chapterPage ul li{
		box-sizing: border-box;
    	padding: 15px 15px 0px 15px;
		margin-bottom: 35px;
		/* background: #f7eee5 ; */
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
	.chapterPage .maskWrap,.chapterPage .maskWrap .mask{
		position:fixed;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.chapterPage .maskWrap .mask{
		z-index: 2;
	}
	.chapterPage .maskWrap .reader_head{
		position: absolute;
		width: 100%;
		z-index: 2;
		height: 50px;
		background: #000;
		overflow: hidden;
		text-align: left;
		padding-left: 45px;
		box-sizing: border-box;
		line-height: 50px;
	}
	.chapterPage .maskWrap .reader_head .icon_left{
		display: block;
		width:23px;
		height: 23px;
		background: url("../image/@easxpml.png") no-repeat;
		background-size: 100%;
		position: absolute;
		left: 10px;
		top: 14px;
		z-index: 2;
	}
	.chapterPage .maskWrap .reader_head .icon_right{
		display: block;
		width:24px;
		height: 6px;
		background: url("../image/3o66jdfr.png") no-repeat;
		background-size: 100%;
		position: absolute;
		right:30px;
		top: 22px;
		z-index: 2;
	}
	.chapterPage .maskWrap .reader_foot{
		display: block;
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: #000;
		z-index: 2;
	} 
	.chapterPage .maskWrap .reader_foot .reader_ft_bar{
		overflow: hidden;
		border-bottom: 1px solid #333;
	}
	.chapterPage .maskWrap .reader_foot a{
		float: left;
		width: 25%;
		height: 70px;
		font-size: 10px;
		line-height: 21px;
		color: #fff;
		text-align:center;
	}
	.chapterPage .maskWrap .reader_foot>a:before{
		content: '';
		display: block;
		margin: 18px auto 0;
	}
	.chapterPage .maskWrap .reader_foot .reader_ft_bar a{
		display: block;
		float: left;
		width: 25%;
		height: 45px;
		line-height: 48px;
		font-size: 13px;
		color: #fff;
		text-align: center;
	}
	.chapterPage .maskWrap .reader_foot .reader_ft_bar a:nth-child(2){
		width: 50%;
	}
	a.reader_toc:before{
		width: 18px;
		height: 13px;
		margin-bottom: 9px !important;
		background: url('../image/0wcw9@c9.png') no-repeat;
		background-size: 18px 13px;	
	}
	a.reader_toc:after{
		content: '\76ee\5f55';
	}
	a.reader_ft:before{
		width: 20px;
		height: 13px;
		margin-bottom: 9px !important;
		background: url('../image/szwk5ja6.png') no-repeat;
		background-size: 20px 13px;	
	}
	a.reader_ft:after{
		content: '\5b57\4f53';
	}
	.reader_foot[data-night='0'] .reader_night:before{
		width: 16px;
		height: 16px;
		margin-bottom: 6px !important;
		background: url('../image/veo70tka.png') no-repeat;
		background-size: 16px 16px;	
	}
	.reader_foot[data-night='1'] .reader_night:before{
		width: 16px;
		height: 16px;
		margin-bottom: 6px !important;
		background: url('../image/iozve5iu.png') no-repeat;
		background-size: 16px 16px;	
	}
	.reader_foot[data-night='0'] .reader_night:after{
		content: '\767d\5929';
	}
	.reader_foot[data-night='1'] .reader_night:after{
		content: '\591c\95f4';
	}
	a.reader_download:before{
		width: 22px;
		height: 17px;
		margin-bottom: 5px !important;
		background: url('../image/kgwiym3v.png') no-repeat;
		background-size: 22px 17px;	
	}
	a.reader_download:after{
		content: '下载';
	}
	.chapterPage .maskWrap .reader_font{
		display: block;
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 70px;
		height: 135px;
		background: #000;
		z-index: 2;
	}
	.chapterPage .maskWrap .reader_font>div{
		margin-top: 15px;
		padding: 5px 10px;
		text-align: left;
	}
	.chapterPage .maskWrap .reader_font span{
		margin: 0px 20px 0px 10px;
		font-size: 14px;
		line-height: 21px;
		color: #fff;
	}
	.chapterPage .maskWrap .reader_font .reader_font-size a{
		display: inline-block;
		margin: 0px 5px;
		border: 1px solid #8c8c8c;
		border-radius: 16px;
		padding: 5px 40px;
		font-size: 13px;
		line-height: 16px;
		color: #fff;
	}
	.chapterPage .maskWrap .reader_font .reader_font-bg a{
		display: inline-block;
		position: relative;
		vertical-align: middle;
		margin-left: 10px;
		width: 30px;
		height: 30px;
		border: 1px solid transparent;
		border-radius: 15px;
		background: #fff;
	}
	.active{
	    border: 1px solid #ff7800 !important;
	}
	.chapterPage .maskWrap .reader_font .reader_font-bg a[data-bg='1']{
		background: #f7eee5;
	}
	.chapterPage .maskWrap .reader_font .reader_font-bg a[data-bg='2']{
		background: #e9dfc7;
	}
	.chapterPage .maskWrap .reader_font .reader_font-bg a[data-bg='3']{
		background: #a4a4a4;
	}
	.chapterPage .maskWrap .reader_font .reader_font-bg a[data-bg='4']{
		background: #cdefce;
	}
	.chapterPage .maskWrap .reader_font .reader_font-bg a[data-bg='5']{
		background: #283548;
	}
	.chapterPage .maskWrap .reader_font .reader_font-bg a[data-bg='0']{
		background: #0f1410;
	}
	.chapterPage .clickZero{
		width: 200px;
		height:200px;
		position:fixed;
		left: 50%;
		top: 50%;
		margin-top: -150px;
		margin-left: -100px;
		z-index: 10;

	}
</style>