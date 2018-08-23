import Main from '../views/main'

export default [
    {
        path: '/',
        component: Main,
        children: [
            {
                name: 'hello',
                path: '',
                component: require('../views/Hello.vue')
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: require('../views/login/Login')
    }
]