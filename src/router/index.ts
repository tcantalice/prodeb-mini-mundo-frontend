import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import AppLayout from '@/layouts/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../views/LoginView.vue'),
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
          component: () => import('../views/ListarProjetosView.vue'),
        },
        {
          path: '/projetos/novo',
          name: 'criar-projeto',
          component: () => import('../views/CriarProjetoView.vue'),
        },
        {
          path: '/projetos/:id',
          name: 'visualizar-projeto',
          component: () => import('../views/ProjetoView.vue'),
          props: true,
        },
        {
          path: '/projetos/:id/editar',
          name: 'editar-projeto',
          component: () => import('../views/EditarProjetoView.vue'),
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
