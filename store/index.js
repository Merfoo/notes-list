import Vue from "vue"
import Vuex from "vuex"
import { database } from "../firebase/index"

Vue.use(Vuex)

// create the Vuex instance by creating state, mutations, actions, getters
// and then export the Vuex store for use by our components
export default new Vuex.Store({
    state: {
        user: null,
        notes: [],
        activeNote: {}
    },
    mutations: {
        ADD_NOTE(state){
            const newNote = {
                key: null,
                text: "New note",
                favorite: false
            }

            state.notes.push(newNote)
            state.activeNote = newNote

            let noteKey = database.ref("user-notes/" + state.user.uid + "/").push().key
            newNote.key = noteKey
            database.ref("user-notes/" + state.user.uid + "/" + noteKey).update(newNote)
        },

        EDIT_NOTE(state, text){
            state.activeNote.text = text
            database.ref("user-notes/" + state.user.uid + "/" + state.activeNote.key).update(state.activeNote)
        },

        DELETE_NOTE(state){
            if(state.notes.length > 0){
                let index = state.notes.indexOf(state.activeNote)
                state.notes.splice(index, 1)
                database.ref("user-notes/" + state.user.uid + "/" + state.activeNote.key).remove()
            }
            
            state.activeNote = state.notes.length > 0 ? state.notes[0] : {}
        },

        TOGGLE_FAVORITE(state){
            if(state.notes.length > 0){
                state.activeNote.favorite = !state.activeNote.favorite
                database.ref("user-notes/" + state.user.uid + "/" + state.activeNote.key).update(state.activeNote)
            }
        },

        SET_ACTIVE_NOTE(state, note){
            state.activeNote = note
        },

        SET_USER(state, user){
            state.user = user
        },

        SET_NOTES(state, notes){
            state.notes = notes

            if(state.notes.length > 0){
                state.activeNote = state.notes[0]
            }
        }
    },
    actions: {
        addNote({commit}){
            commit("ADD_NOTE") 
        },
        editNote({commit}, text){
            commit("EDIT_NOTE", text)
        },
        deleteNote({commit}){
            commit("DELETE_NOTE")
        },
        toggleFavorite({commit}){
            commit("TOGGLE_FAVORITE")
        },
        setActiveNote({commit}, note){
            commit("SET_ACTIVE_NOTE", note)
        },
        setUser({commit}, user){
            commit("SET_USER", user)
        },
        setNotes({commit}, notes){
            commit("SET_NOTES", notes)
        },
        initNotesFromUser({commit}, userId){
            database.ref("user-notes/" + userId + "/").once("value").then((snapshot) => {
                let notes = []
                let noteObjs = snapshot.val()

                for(let noteKey in noteObjs){
                    if(noteObjs.hasOwnProperty(noteKey)){
                        notes.push(noteObjs[noteKey])
                    }
                }

                commit("SET_NOTES", notes)
            })
        }
    },
    getters: {
        activeNote: state => state.activeNote,
        activeNoteText: state => state.activeNote.text,
        notes: state => state.notes,
        user: state => state.user,
        userLoggedIn: state => !!state.user
    }
})