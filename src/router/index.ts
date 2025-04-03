import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import AdminView from '@/views/AdminView.vue'
import CatalogView from '@/views/CatalogView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ShopsView from '@/views/ShopsView.vue'
import { useCurrentUserStore } from '@/stores/currentUser.ts'
import { storeToRefs } from 'pinia'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: CatalogView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/shops',
    name: 'Shop',
    component: ShopsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  const userStore = useCurrentUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: 'Auth' }
  }

  return true
})

export default router
