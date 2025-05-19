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
import CategoryFormView from '@/views/CategoryFormView.vue'
import BannersView from '@/views/BannersView.vue'
import GoodFormView from '@/views/GoodFormView.vue'

const toast = useToast()

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/auth',
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
    meta: { title: 'Авторизация' },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAdmin: true },
    children: [
      {
        path: 'categories',
        name: 'categories',
        component: CategoriesView,
        meta: { title: 'Категории' },
      },
      {
        path: 'categories/new',
        name: 'categoriesNew',
        component: CategoryFormView,
        meta: { title: 'Создание категории' },
      },
      {
        path: 'categories/:id(\\d+)',
        name: 'categoriesEdit',
        component: CategoryFormView,
        meta: { title: 'Редактирование категории' },
      },
      {
        path: 'goods',
        name: 'goods',
        component: GoodsView,
        meta: { title: 'Товары' },
      },
      {
        path: 'goods/new',
        name: 'goodsNew',
        component: GoodFormView,
        meta: { title: 'Создание товара' },
      },
      {
        path: 'goods/:id(\\d+)',
        name: 'goodsEdit',
        component: GoodFormView,
        meta: { title: 'Редактирование товара' },
      },
      {
        path: 'banners',
        name: 'banners',
        component: BannersView,
        meta: { title: 'Баннеры' },
      },
    ],
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: CatalogView,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { title: 'Профиль',requiresAuth: true },
  },
  {
    path: '/shops',
    name: 'Shop',
    component: ShopsView,
    meta: { title: 'Магазины' },
  },
  {
    path: '/404',
    name: '404',
    component: ErrorView,
    meta: { title: 'Ошибка' },
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async () => {
  const userStore = useCurrentUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  if (isLoggedIn.value) return true

  if (getAuthToken()) {
    try {
      await userStore.fetchCurrentUser()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        return { name: 'Auth' }
      }
    }
  }
})

router.beforeEach(async (to) => {
  const userStore = useCurrentUserStore()
  const { isLoggedIn, isAdmin } = storeToRefs(userStore)

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
