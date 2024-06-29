import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/content/guest/home/index.vue'
import LoginView from '../views/auth/login.vue'
import DestinationsView from '../views/content/guest/destination/index.vue'
import EventView from '../views/content/guest/event/index.vue'
import PostView from '../views/content/guest/post/index.vue'
import GalleryView from '../views/content/guest/gallery/index.vue'
import AdminView from '../views/content/admin/dashboard.vue'
import Cookies from 'js-cookie';

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: DestinationsView
    },
    {
      path: '/events',
      name: 'events',
      component: EventView
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostView
    },
    {
      path: '/galleries',
      name: 'galleries',
      component: GalleryView
    },
    
    // admin
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true }
    },
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = Cookies.get('token');
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
