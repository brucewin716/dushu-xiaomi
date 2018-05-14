import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Bookmall from '@/components/Bookmall'
import Bookcase from '@/components/Bookcase'
import Search from '@/components/Search'
import DetailPage from '@/components/DetailPage'
import ChapterPage from '@/components/ChapterPage'
Vue.use(Router)

export default new Router({
  routes: [
    	{
    		path:'/',
    		component:Bookmall
    	},
    	{
    		path:'/bookcase',
    		component:Bookcase
    	},
        {
            path:'/search',
            component:Search
        },
        {
            path:'/detail',
            component:DetailPage
        },
        {
            path:'/chapter',
            component:ChapterPage
        }
    ]
})
