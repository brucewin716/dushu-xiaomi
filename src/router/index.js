import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Bookmall from '@/components/Bookmall'
import Bookcase from '@/components/Bookcase'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component:Index,
      children:[
      	{
      		path:'bookmall',
      		component:Bookmall
      	},
      	{
      		path:'/bookcase',
      		component:Bookcase
      	}
      ]
    },
    ]
})
