import Main from '../views/main'

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
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                name: 'home',
                path: '/home',
                title: { i18n: 'home'},
                meta: {
                    hideInMenu: true,
                    title: '首页',
                    notCache: true
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
]