import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCookie } from '#app';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);

  function setToken(newToken: string) {
    token.value = newToken;
    const tokenCookie = useCookie('auth_token');
    tokenCookie.value = newToken;
  }

  function clearToken() {
    token.value = null;
    const tokenCookie = useCookie('auth_token');
    tokenCookie.value = null;
  }

  return { token, setToken, clearToken };
});