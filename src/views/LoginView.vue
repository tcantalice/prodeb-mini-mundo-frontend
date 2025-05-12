<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const erro = ref('');
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
    erro.value = '';
    await authStore.login(username.value, password.value);
    // await authStore.fetchUser();
    router.push({name: 'listar-projetos'});
  } catch (e) {
    erro.value = 'Credenciais inválidas';
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-20 p-6 shadow rounded bg-white">
    <h1 class="text-xl font-bold mb-4">Login</h1>
    <form @submit.prevent="login" class="space-y-4">
      <input v-model="username" placeholder="Nome de usuário" class="w-full border p-2 rounded" />
      <input v-model="password" type="password" placeholder="Senha" class="w-full border p-2 rounded" />
      <button class="bg-indigo-600 text-white px-4 py-2 rounded">Entrar</button>
    </form>
    <p class="text-red-500 mt-2" v-if="erro">{{ erro }}</p>
  </div>
</template>
