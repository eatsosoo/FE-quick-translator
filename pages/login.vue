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
import { useToast } from '@/components/ui/toast/use-toast';
import type { AxiosError } from "axios";
import axiosInstance from "~/config/axios";
import type { GenresType, ResponseDataType } from "~/common/types/response";
import { cloneDeep } from "lodash";

definePageMeta({
  title: "Log In",
  description: "Welcome to Nàng Kiếm Chàng Hoa",
  layout: "empty",
  middleware: 'auth',
  ssr: false,
});

const [UseLoginTemplate, LoginForm] = createReusableTemplate();
const [UseRegisterTemplate, RegisterForm] = createReusableTemplate();

// --- Variables ---
const router = useRouter();
const authStore = useAuthStore();
const isLogin = ref(true);
const genres = ref([]);
const text = reactive({
  title: "Log In",
  action: "Sign In",
  switch: "Sign Up",
});
const loginForm = reactive(cloneDeep($listForm.login));
const { toast } = useToast();

// --- Methods ---
const methods = {
  switchForm: () => {
    isLogin.value = !isLogin.value;
    text.title = isLogin.value ? "Sign In" : "Register";
    text.action = isLogin.value ? "Sign In" : "Register";
    text.switch = isLogin.value ? "Sign Up" : "Sign In";
  },
  login: async (values: { [x: string]: string }) => {
    loginForm.states.loading.submit = true;
    try {
      const { statusCode, data }: ResponseDataType = await axiosInstance.post('/login', values)
      if (statusCode === 200) {
        authStore.setToken(data.token)
        router.push('/')
      }
    } catch (error) {
      const err = error as AxiosError
      const description = (err.response?.data as { message: string })?.message
      toast({
        title: 'SignIn Failed',
        description,
      });
    }
    loginForm.states.loading.submit = false;
  },
  getListGenres: async () => {
    const { statusCode, data }: ResponseDataType = await axiosInstance.get('/genres')

    if (statusCode === 200) {
      genres.value = data.map((genre: GenresType) => ({
        value: genre.id,
        label: genre.name,
      }));
    }

    console.log(genres.value);
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
            size="sm"
            :disabled="loginForm.states.loading.submit"
            :loading="loginForm.states.loading.submit"
            >{{ text.action }}</Button
          >
          <Button type="button" size="sm" variant="outline" @click="methods.switchForm">
            {{ text.switch }}
          </Button>
        </div>
      </template>
    </DynamicForm>
  </UseLoginTemplate>

  <UseRegisterTemplate>
    <RegisterStepper :genres="genres" @switchForm="methods.switchForm" />
  </UseRegisterTemplate>

  <div class="login-page h-screen flex justify-center items-center">
    <Card class="min-w-[350px] shadow-lg transition duration-150 ease-in-out">
      <CardHeader>
        <CardTitle>{{ text.title }}</CardTitle>
        <CardDescription>Welcome to Nàng Kiếm Chàng Hoa</CardDescription>
      </CardHeader>
      <CardContent :class="{ 'w-[60rem]': !isLogin }">
        <LoginForm v-if="isLogin" />
        <RegisterForm v-else />
      </CardContent>
    </Card>
  </div>
</template>
