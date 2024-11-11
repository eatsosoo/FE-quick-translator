import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const tokenCookie = useCookie('auth_token').value;
  const isAuth = authStore.token || tokenCookie;

  if (to.path === "/login" && isAuth) {
    return navigateTo("/");
  }

  if (!isAuth && to.path !== "/login") {
    return navigateTo("/login");
  }
});
