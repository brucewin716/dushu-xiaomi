<template>
  <div id="app">
<!--     <img src="./assets/logo.png"> -->
  <transition :name='names'>
    <router-view class="child-view"></router-view>
  </transition>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return {
     names:'slide-left',
  	}
  },
  watch: {
    '$route' (to, from){
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.names = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.child-view {
    position: absolute;
    left:0;
    top: 0;
    height: 100%;
    width: 100%;
    transition: all 1s cubic-bezier(.55,0,.1,1);
    background-color: #f2f2f2;
    /* overflow:scroll; */
    -webkit-overflow-scrolling: touch;
}
/* 当child-view的内容过多时会撑开child-view使得内部能够滚动 */
.slide-left-enter{
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    transition-delay: 1s;
    -webkit-transition-delay:1s;
}
.slide-left-leave-active{
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    transition-delay: 1s;
    -webkit-transition-delay: 1s;
}
.slide-enter-active {
    -webkit-transition: all 1s ease;
    transition: all 1s ease;
}
.slide-leave-active {
    -webkit-transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>
