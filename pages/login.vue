<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createReusableTemplate } from "@vueuse/core";
import type { GenresType, ResponseDataType } from "~/utils/types/response";

definePageMeta({
  title: "Login",
  description: "Deploy your new project in one-click.",
  layout: "empty",
});

const [UseLoginTemplate, LoginForm] = createReusableTemplate();
const [UseRegisterTemplate, RegisterForm] = createReusableTemplate();

// --- Variables ---
const router = useRouter();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const isLogin = ref(true);
const genres = ref([]);
const text = reactive({
  title: "Login",
  action: "Login",
  switch: "Sign Up",
});
const loginForm = reactive($listForm.login);

// --- Methods ---
const methods = {
  switchForm: () => {
    isLogin.value = !isLogin.value;
    text.title = isLogin.value ? "Login" : "Register";
    text.action = isLogin.value ? "Login" : "Register";
    text.switch = isLogin.value ? "Sign Up" : "Sign In";
  },
  login: async (values: { [x: string]: string }) => {
    loginForm.states.loading.submit = true;
    const { data } = await useAsyncData(
      "login",
      () => {
        return useFetch<{ data: ResponseDataType }>(`${apiBase}/login`, {
          method: "POST",
          body: JSON.stringify(values),
        });
      }
    );
    loginForm.states.loading.submit = false;

    if (data.value?.statusCode !== 200) {
      console.error("Error:", data.value.message);
    } else {
      router.push("/");
    }
  },
  getListGenres: async () => {
    const { data } = await useFetch<{
      data: ResponseDataType;
    }>(`${apiBase}/genres`);

    if (data.value && data.value.data) {
      genres.value = data.value.data.map((genre: GenresType) => ({
        value: genre.id,
        label: genre.name,
      }));
    }
  },
};

// --- Lifecycle Hooks ---
methods.getListGenres();
</script>

<template>
  <UseLoginTemplate>
    <DynamicForm v-if="isLogin" :data="loginForm" @submit="methods.login">
      <template #btnArea>
        <p class="text-sm hover:underline cursor-pointer">Forgot password?</p>
        <div class="flex justify-between w-full mt-2">
          <Button
            type="submit"
            :disabled="loginForm.states.loading.submit"
            :loading="loginForm.states.loading.submit"
            >{{ text.action }}</Button
          >
          <Button type="button" variant="outline" @click="methods.switchForm">
            {{ text.switch }}
          </Button>
        </div>
      </template>
    </DynamicForm>
  </UseLoginTemplate>

  <UseRegisterTemplate>
    <RegisterStepper :genres="genres" />
  </UseRegisterTemplate>

  <div class="login-page h-screen flex justify-center items-center">
    <Card class="min-w-[350px] shadow-lg transition duration-150 ease-in-out">
      <CardHeader>
        <CardTitle>{{ text.title }}</CardTitle>
        <CardDescription>Welcome to Nàng Kiếm Chàng Hoa</CardDescription>
      </CardHeader>
      <CardContent :class="{ 'w-[40rem]': !isLogin }">
        <LoginForm v-if="isLogin" />
        <RegisterForm v-else />
      </CardContent>
    </Card>
  </div>
</template>
