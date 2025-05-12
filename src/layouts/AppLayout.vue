<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-semibold">Painel do Sistema</h1>
      <button @click="logout" class="bg-indigo-800 px-3 py-1 rounded hover:bg-indigo-700">
        Sair
      </button>
    </header>

    <main class="flex-1 p-6 bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
