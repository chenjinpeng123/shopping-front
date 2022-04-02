import Vue from "vue";
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        goodName:null,
        goodId:Number,
        userName:null,
        password:null,
        userId:null,
        roleId:null,
        avatarUrl:"img/home/personal.png",
        selectConsignee:false,
        manageConsignee:false,
        addConsignee:false
    },
    mutations: {
        changeRoleId(state, roleId) {
            state.roleId = roleId
        },
        changeAvatarUrl(state, url) {
            state.avatarUrl = url
        },
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
        changePassword(state, password) {
            state.password = password
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

