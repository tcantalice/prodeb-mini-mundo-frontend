import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/projetos',
      name: 'listar-projetos',
      component: () => import('../views/ListarProjetosView.vue'),
    },
    {
      path: '/projetos/:id',
      name: 'visualizar-projeto',
      component: () => import('../views/ProjetoView.vue'),
      props: true,
    }
  ],
});

export default router
