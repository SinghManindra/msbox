import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import sourceData from '../data.json'

const routes =  [
    { path: '/', component: Home},
    { 
        path: '/protected',
        name: 'protected',
        component: ()=> import('../views/Protected.vue'),
        meta: { 
            requiresAuth: true // calls router.beforeEach method to verify, met attaches value in route
        }
    },
    {
        path: '/invoices',
        name: 'invoices',
        component: ()=> import('../views/Invoices.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('../views/Login.vue')
    },
    // {path: '/about', name: 'about', component: () => import('../views/About.vue')},
    // {path: '/brazil', name: 'brazil', component: () => import('../views/Brazil.vue')},
    // {path: '/hawai', name: 'hawai', component: () => import('../views/Hawai.vue')},
    // {path: '/jamaica', name: 'jamaica', component: () => import('../views/Jamaica.vue')},
    // {path: '/panama', name: 'panama', component: () => import('../views/Panama.vue')},
    // name: destination.show will eliminate all above individual routes
    {
        path: '/destination/:id/:slug', 
        name: "destination.show", 
        component: () => import('../views/ShowDestination.vue'),
        props: route=> ({...route.params, id: parseInt(route.params.id)}),
        beforeEnter(to, from){
            const exists = sourceData.destinations.find(
                destination => destination.id === parseInt(to.params.id)
            )
            if(!exists) return {
                name: 'NotFound',
                params: {pathMatch: to.path.split('/').slice(1)},
                query: to.query,
                hash: to.hash
            }
        },
        children: [
            {
                path: ':experienceSlug', 
                name: "experience.show", 
                component: () => import('../views/ExperienceShow.vue'),
                props: route=> ({...route.params, id: parseInt(route.params.id)})
            }
        ]
    },
    // {
    //     path: '/destination/:id/:slug/:experienceSlug', 
    //     name: "experience.show", 
    //     component: () => import('../views/ExperienceShow.vue'),
    //     props: route=> ({...route.params, id: parseInt(route.params.id)})
    // }
    {
        path: '/:pathMatch(.*)*', 
        name: 'NotFound',
        component: ()=> import('../views/NotFound.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "navigation-active",
    scrollBehavior (to, from ,savedPosition){
        return savedPosition || {top: 0}
    }
})
// each time router changes, it will be called
router.beforeEach((to, from)=> {
    if(to.meta.requiresAuth && !window.user) {
        // need to login if not already 
        return {name: 'login', query: {redirect: to.fullPath}}
    }
})

export default router;