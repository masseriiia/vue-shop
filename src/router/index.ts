import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import AdminView from '@/views/AdminView.vue'
import CatalogView from '@/views/CatalogView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ShopsView from '@/views/ShopsView.vue'
import ErrorView from '@/views/ErrorView.vue'
import { useCurrentUserStore } from '@/stores/currentUser.ts'
import { storeToRefs } from 'pinia'
import { getCurrentUserData } from '@/services/api/user-api'

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
    component: AdminView,
    meta: { requiresAdmin: true }
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
  },
  {
    path: '/404',
    name: '404',
    component: ErrorView
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const userStore = useCurrentUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: 'Auth' }
  }

  if (to.meta.requiresAdmin) {
    if (!isLoggedIn.value) {
      return { name: '404' }
    }
    const data = await getCurrentUserData()
    if (data.role !== 'admin') {
      return { name: '404' }
    }
  }

  return true
})

export default router
