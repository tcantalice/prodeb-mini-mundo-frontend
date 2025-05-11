import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/projetos',
      name: 'projetos',
      component: () => import('../views/ListarProjetosView.vue'),
    }
  ],
})

export default router
