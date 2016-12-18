import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

// create the Vuex instance by creating state, mutations, actions, getters
// and then export the Vuex store for use by our components
export default new Vuex.Store({
    state: {
        notes: [],
        activeNote: {}
    },
    mutations: {
        ADD_NOTE(state){
            const newNote = {
                text: "New note",
                favorite: false
            }

            state.notes.push(newNote)
            state.activeNote = newNote
        },

        EDIT_NOTE(state, text){
            state.activeNote.text = text
        },

        DELETE_NOTE(state){
            if(state.notes.length > 1){
                let index = state.notes.indexOf(state.activeNote)
                state.notes.splice(index, 1)
                state.activeNote = state.notes[0]
            }
            else{
                state.activeNote.text = "New note"
                state.activeNote.favorite = false
            }
        },

        TOGGLE_FAVORITE(state){
            state.activeNote.favorite = !state.activeNote.favorite
        },

        SET_ACTIVE_NOTE(state, note){
            state.activeNote = note
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
        }
    },
    getters: {
        activeNote: state => state.activeNote,
        activeNoteText: state => state.activeNote.text,
        notes: state => state.notes
    }
})