<template>
  <div class="bookCase">
  	<div class="header">
      <ul>
        <li class="left" @click='back()'><img src="../image/1.png" alt="" style='width:25px;height:25px;vertical-align:middle;'></li>
        <li class="middle">
          <router-link to="/"><span class="bookstore">书城</span></router-link>
          <router-link to='/bookcase'><span class="bookshelf">书架</span></router-link>  
        </li>
        <li class='right'><i class="fa fa-user-o fa-lg"></i></li>
      </ul>
    </div>
  	<div class="search">输入书名/作者/关键字</div>
	<div class="wrap">
		<div class='maleLoveTag'>
          <ul class='list-h5'>
            <li v-for="(item,index) in items" @click='goTo(item)'>
              <div class="book-h5">
                <div class='book-h5_cover Lazy_loading Lazy_loaded'>
                  <img :src="item.cover"  alt=''>
                  <div class="u-tagRT"></div>
                  <!-- <p class='book-h5_finish'>完结</p>
                  <div class="book-h5_order">1</div> -->
                </div>
                <div class='book-h5_info'>
                  <p class='book-h5_title'>{{item.title}}</p>
                  <p class="book-h5_author">{{item.authors}}</p>
                  <p class="book-h5_summary">{{item.summary}}</p>
                  <!-- <div class="book-h5_wrap">
                    <div class='book-h5_tag' v-for="tag in item.tags.slice(0,2)">{{tag}}</div>
                    <div class='book-h5_tag'>{{String(item.word_count).slice(0,3)+'万字'}}</div>
                  </div> -->
                </div>
              </div>
            </li>
          </ul>
        </div>
	</div>
  </div>
</template>

<script>
import { Swipe,SwipeItem,Indicator,Toast } from 'mint-ui';
import axios from 'axios';
export default {
  name: 'Bookcase',
  data () {
    return {
      items:[],
      index:0,
      fiction_id:0
    }
  },
  mounted(){
      Indicator.open({
        text: '正在加载...',
        spinnerType: 'fading-circle'
      });
      axios({
      method:"GET",
      url:'store/v0/fiction/id_list?ids=322020%2C352138%2C270874%2C405816%2C318621%2C323125&owner=0%2C2',
    }).then((res)=>{
      Indicator.close();
      var respon=res.data;
      console.log(respon);
      if(respon.result==0){
          this.items=respon.items;
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
  	back(){
  		history.go(-1);
  	},
    goTo(val){
        var self=this;
        this.$router.push({
        path:'/detail',
        query:{
         fiction_id:val.fiction_id
        }
      });
    }

  }
}
</script>

Add "scoped" attribute to limit CSS to this component only
<style scoped>
  .bookCase{
		background:#fff;
	}
  .bookCase .header{
    height: 45px;
    width: 100%;
    background: #EFEFF0;
    margin-bottom:10px;
  }
  .bookCase .header ul{
    overflow: hidden;
    width: 95%;
    margin: 0px auto;
  }
   .bookCase .header ul li{
    float: left;
    line-height: 45px;
    vertical-align:middle;
   }
   .bookCase .header ul li.left{
    text-align: left;
    width:30%;
   }
   .bookCase .header ul li.middle{
    box-sizing:border-box;
    width:40%;
    padding: 0px 10px;
   }
   .bookCase .header ul li.middle span{
    display:block;
    width:30%;
    text-align: center;
   }
   .bookCase .header ul li.middle span.bookstore{
    float: left;
   }
   .bookCase .header ul li.middle span.bookshelf{
    float: right;
   }
   .bookCase .header ul li.middle .router-link-active span.bookshelf{
     color:#ff6600;
     border-bottom: 2px solid #777;
   }
   .bookCase .header ul li.right{
    text-align:right;
    width:30%;
   }
	.maleLoveTag{
		overflow: hidden;
	}	
  .bookCase .search{
  	box-sizing: border-box;
    width: 349px;
    height: 36px;
    margin: 0px 13px 10px 13px;
    border: 1px solid #f5f5f5;
    padding:1px 0px 0px 30px;
    text-align:left;
    font: 11px/33px a;
    color: rgba(0,0,0,0.4);
    border-radius: 2px;
    background: url("../image/76vuoz@b.png") no-repeat 8px center;
    background-size:14px ;
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
