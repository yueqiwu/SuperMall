import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Details = ()=> import('views/details/Details')
const Search = ()=> import('views/search/Search')


const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/search',
    component:Search
  },
  {
    name:'details',
    path:'/details/:Id',
    component:Details
  }
]

export default new VueRouter({
  routes,
  mode: 'history'
})