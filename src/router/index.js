import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/catalog/:slug&id=:id',
        name: 'catalogPage',
        component: () =>
            import ('../views/Catalog.vue')
    },
    {
        path: '/new',
        name: 'new',
        component: () =>
            import ('../views/NewProducts.vue')
    },
    {
        path: '/best',
        name: 'best',
        component: () =>
            import ('../views/BestProduct.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/product/:id',
        name: 'product',
        component: () =>
            import ('../views/ProductPage.vue')
    },
    {
        path: '/brands',
        name: 'brands',
        component: () =>
            import ('../views/Brands.vue')
    },
    {
        path: '/BrandsPage/:slug&id=:id',
        name: 'BrandsPage',
        component: () =>
            import ('../views/BrandsPage.vue')
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: () =>
            import ('../views/Blogs.vue')
    },
    {
        path: '/blogs/:id',
        name: 'blogPage',
        component: () =>
            import ('../views/BlogPage.vue')
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: () =>
            import ('../views/Contacts.vue')
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: () =>
            import ('../views/Favorites_page.vue')
    },
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

export default router