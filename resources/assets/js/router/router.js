import Main from '../views/main'
import parentView from '../components/parent-view'

export default [
    {
        name: 'login',
        path: '/login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        },
        component: require('../views/login/Login')
    },
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true,
        },
        children: [
            {
                name: 'home',
                path: '/home',
                title: { i18n: 'home'},
                meta: {
                    hideInMenu: true,
                    title: '首页',
                    notCache: true,
                    auth: true
                },
                component: require('../views/Hello.vue')
            }
        ]
    },
    {
        path: '',
        name: 'doc',
        meta: {
            title: '文档',
            href: 'https://lison16.github.io/iview-admin-doc/#/',
            icon: 'ios-book'
        }
    },
    {
        path: '/multilevel',
        name: 'multilevel',
        meta: {
            icon: 'android-menu',
            title: '多级菜单'
        },
        component: Main,
        children: [
            {
                path: 'level_2_1',
                name: 'level_2_1',
                meta: {
                    icon: 'md-funnel',
                    title: '二级-1',
                    auth: true
                },
                component: require('../views/multilevel/level-2-1.vue')
            },
            {
                path: 'level_2_2',
                name: 'level_2_2',
                meta: {
                    access: ['super_admin'],
                    icon: 'md-funnel',
                    showAlways: true,
                    title: '二级-2'
                },
                component: parentView,
                children: [
                    {
                        path: 'level_2_2_1',
                        name: 'level_2_2_1',
                        meta: {
                            icon: 'md-funnel',
                            title: '三级',
                            auth: true
                        },
                        component: require('../views/multilevel/level-2-2/level-3-1.vue')
                    }
                ]
            },
            {
                path: 'level_2_3',
                name: 'level_2_3',
                meta: {
                    icon: 'md-funnel',
                    title: '二级-3',
                    auth: true
                },
                component: require('../views/multilevel/level-2-3.vue')
            },
        ]
    },
]