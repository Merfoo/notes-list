import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import store from "../store/index"
import firebase from "firebase"

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
    if(!store.getters.authHandlerAttached){
        firebase.auth().onAuthStateChanged((newUser) => {
            let user = store.getters.user

            // user is signed in
            if(newUser){
                console.log("Someone signed in")

                // its a new user signed in
                if(user === null || user.uid !== newUser.uid){
                    console.log("New person signed in")
                    store.dispatch("setUser", newUser)

                    firebase.database().ref("user-notes/" + newUser.uid + "/").once("value").then((snapshot) => {
                        let notes = []
                        let noteObjs = snapshot.val()

                        for(let noteKey in noteObjs){
                            if(noteObjs.hasOwnProperty(noteKey)){
                                notes.push(noteObjs[noteKey])
                            }
                        }

                        store.dispatch("setNotes", notes)
                    })

                    next()
                }

                // the user was already signed in, e.g. login token refreshed
                else{
                    console.log("Same person signed in, token refreshed")
                    next()
                }
            }

            // user signed out
            else if(newUser === null && user){
                console.log("User signed out")
                store.dispatch("setUser", newUser)
                next("/login")
            }

            else{
                console.log("First time, no one signed in")
                next()
            }
        });

        store.dispatch("setAuthHandlerAttached", true)
    }

    else{
        if(to.matched.some(record => record.meta.requiresAuth) && !firebase.auth().currentUser){
            next("/login")
        }
        
        else{
            next()
        }
    }
})

export { router }