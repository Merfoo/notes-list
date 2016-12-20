import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import store from "../store/index"

Vue.use(VueRouter)

let router = new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/login",
            component: Login,
            beforeEnter: (to, from, next) => {
                console.log("Before enter")
                
                if(store.getters.user){
                    next("/home")
                }
                
                else {
                    next()
                }
            }
        },

        {
            path: "/home",
            component: Home,
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach((to, from , next) => {
    console.log("Before each")
    
    if(to.matched.some(record => record.meta.requiresAuth) && !store.getters.user){
        next("/login")
    }
    
    else{
        next()
    }
})

export { router }