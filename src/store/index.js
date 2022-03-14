import Vue from "vue";
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        goodName:null,
        goodId:Number,
        userName:null,
        password:null,
        userId:null
    },
    mutations: {
        changeGoodId(state, id) {
            state.goodId = id
        },
        changeGoodName(state, name) {
            state.goodName = name
        },
        changePU(state , json) {
            state.password = json.password
            state.userName = json.userName
        },
        changeUserId(state, id) {
            state.userId = id
        }
    },
    getters: {
        getGoodId(state) {
            return state.goodId
        },
        getGoodName(state) {
            return state.goodName
        }
    }
})

