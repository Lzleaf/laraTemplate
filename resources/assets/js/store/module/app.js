import { getBreadCrumbList, setTagNavListInLocalstorage, getTagNavListFromLocalstorage, getHomeRoute, getMenuByRouter } from "../../libs/util";
import routers from './../../router/router'

export default {
    state: {
        breadCrumbList: [],
        homeRoute: getHomeRoute(routers),
        tagNavList: [],
        local: ''
    },

    getters: {
        menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.user.access)
    },

    mutations: {
        setBreadCrumb (state, routeMetched) {
            state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
        },
        setTagNavList (state, list) {
            if (list) {
                state.tagNavList = [...list]
                setTagNavListInLocalstorage([...list])
            } else state.tagNavList = getTagNavListFromLocalstorage()
        },
        addTag (state, item, type = 'unshift') {
            if (state.tagNavList.findIndex(tag => tag.name === item.name) < 0) {
                if (type === 'push') state.tagNavList.push(item)
                else state.tagNavList.unshift(item)
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        },
        setLocal (state, lang) {
            state.local = lang
        }
    }
}