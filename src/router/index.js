import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../modules/Layouts/View/LandingPage.vue"
import CarList from "../modules/CarLIst/View/CarList.vue"
import Rental from "../modules/Rental/View/Rental.vue"
import Users from "../modules/Users/View/Users.vue"
import Dashboard from "../modules/Layouts/View/Dashboard.vue"
import Notfound from "../modules/Layouts/View/Notfound.vue"
import Login from "../modules/Auth/View/Login.vue"
import Register from "../modules/Auth/View/Register.vue"
import Homepage from "../modules/Home/View/Homepage.vue"
import History from "../modules/History/View/History.vue"

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/',
        component: LandingPage,
        children: [
            {
                path: '',
                name: 'Homepage',
                component: Homepage
            },
            {
                path: '/history',
                name: 'History',
                component: History
            },
        ]
    },
    {
        path: '/car-list',
        component: Dashboard,
        meta: { requiresAuth: true, roles: ['admin'] },
        children: [
            {
                path: '',
                name: 'CarList',
                component: CarList
            },
            {
                path: '/car-rental',
                name: 'Rental',
                component: Rental
            },
            {
                path: '/users',
                name: 'Users',
                component: Users
            },
        ]
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: Notfound
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
  
    if (to.meta.requiresAuth && !token) {
      next('/login');
    } else if (to.meta.roles && !to.meta.roles.includes(user.role)) {
      next('/login');
    } else {
      next();
    }
  });
  

export default router;