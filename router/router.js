import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import firebase from "firebase"

Vue.use(VueRouter)

let router = new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/login",
            component: Login
        },

        {
            path: "/home",
            component: Home,
            beforeEnter: (to, from, next) => {
                if(firebase.auth().currentUser){
                    next()
                }

                else{
                    next("/login")
                }
            }
        }
    ]
})

export { router }