import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/ShowDecksView/ShowDecksView.vue'

const routes = [
  {
    path: '/',
    name: 'decks',
    meta: {
      title: 'Decks'
    },
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/CreateNewDeckView.vue')
  },
  {
    path: '/deck/:id',
    name: 'Deck',
    component: () => import('@/views/ReviewView.vue'),
    props: (route: any) => ({id: parseInt(route.params.id)})
  },
  {
    path: '/deck/:id/edit',
    name: 'EditDeck',
    component: () => import('@/views/EditDeckView/EditDeckView.vue'),
    props: (route: any) => ({id: parseInt(route.params.id)})
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
