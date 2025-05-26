import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/ui/stores/auth';
import AppLayout from '@/layouts/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../ui/views/LoginView.vue'),
    },
    {
      path: '/',
      component: AppLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/projetos',
          name: 'listar-projetos',
          component: () => import('../ui/views/ListarProjetosView.vue'),
        },
        {
          path: '/projetos/novo',
          name: 'criar-projeto',
          component: () => import('../ui/views/CriarProjetoView.vue'),
        },
        {
          path: '/projetos/:id',
          name: 'visualizar-projeto',
          component: () => import('../ui/views/Projeto/ProjetoView.vue'),
          props: true,
        },
        {
          path: '/projetos/:id/editar',
          name: 'editar-projeto',
          component: () => import('../ui/views/EditarProjeto/EditarProjetoView.vue'),
          props: true,
        }
      ]
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login');
  }

  next();
});

export default router
