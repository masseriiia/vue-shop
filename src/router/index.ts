import { createRouter, createWebHistory } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCurrentUserStore } from '@/stores/currentUser.ts'
import { storeToRefs } from 'pinia'
import { getAuthToken } from '@/services/api/authTokenService'
import AuthView from '@/views/AuthView.vue'
import AdminView from '@/views/AdminView.vue'
import CatalogView from '@/views/CatalogView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ShopsView from '@/views/ShopsView.vue'
import ErrorView from '@/views/ErrorView.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import GoodsView from '@/views/GoodsView.vue'
import CategoryView from '@/views/CategoryView.vue'
import CategoryFormView from '@/views/CategoryFormView.vue'

const toast = useToast();

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
    meta: { requiresAdmin: true },
    children: [
      {
        path: 'categories', 
        component: CategoryView,
        children:[
          {
            path: '',
            name: 'categories',
            component: CategoriesView
          },
          {
            path: 'new',
            name: 'newCategory',
            component: CategoryFormView
          },
          {
            path: ':id',
            name: 'categoriesEdit',
            component: CategoryFormView
          },
        ]
      },
      {
        path: 'goods', 
        name: 'goods',
        component: GoodsView
      },
    ]
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

router.beforeEach(async() => {
  const userStore = useCurrentUserStore()
  const { isLoggedIn} = storeToRefs(userStore)

  if(isLoggedIn.value) return true
  
  if(getAuthToken()) {
    try {
      await userStore.fetchCurrentUser()
    } catch(error) {
      if(error instanceof Error) {
        toast.error(error.message)
      return {name: 'Auth'}
      }
    }
  }
})

router.beforeEach(async (to) => {
  const userStore = useCurrentUserStore()
  const { isLoggedIn, isAdmin} = storeToRefs(userStore)

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: 'Auth' }
  }

  if (to.meta.requiresAdmin) {

    if (!isLoggedIn.value) {
      return { name: '404' }
    }

    if (!isAdmin.value) {
      return { name: '404' }
    }
  }

  return true
})

export default router
