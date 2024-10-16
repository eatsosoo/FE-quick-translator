<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createReusableTemplate } from "@vueuse/core";

definePageMeta({
  title: "Login",
  description: "Deploy your new project in one-click.",
  layout: "empty",
});

const [UseLoginTemplate, LoginForm] = createReusableTemplate();
const [UseRegisterTemplate, RegisterForm] = createReusableTemplate();

const router = useRouter();

const isLogin = ref(true);
const text = reactive({
  title: "Login",
  action: "Login",
  switch: "Sign Up",
});

const methods = {
  switchForm: () => {
    isLogin.value = !isLogin.value;
    text.title = isLogin.value ? "Login" : "Register";
    text.action = isLogin.value ? "Login" : "Register";
    text.switch = isLogin.value ? "Sign Up" : "Sign In";
  },
  login: () => {
    // router.push("/");
  },
};

const loginForm = $listForm.login;
</script>

<template>
  <UseLoginTemplate>
    <DynamicForm v-if="isLogin" :data="loginForm">
      <template #btnArea>
        <p class="text-sm hover:underline cursor-pointer">
          Forgot password?
        </p>
        <div class="flex justify-between w-full mt-2">
          <Button type="submit" @click="methods.login">{{ text.action }}</Button>
          <Button type="button" variant="outline" @click="methods.switchForm" >
            {{ text.switch }}
          </Button>
        </div>
      </template>
    </DynamicForm>
  </UseLoginTemplate>

  <UseRegisterTemplate>
    <Stepper />
  </UseRegisterTemplate>

  <div class="login-page h-screen flex justify-center items-center">
    <Card class="min-w-[350px] shadow-lg transition duration-150 ease-in-out">
      <CardHeader>
        <CardTitle>{{ text.title }}</CardTitle>
        <CardDescription>Welcome to ...</CardDescription>
      </CardHeader>
      <CardContent :class="{ 'w-[40rem]': !isLogin }">
        <LoginForm v-if="isLogin" />
        <RegisterForm v-else/>
      </CardContent>
    </Card>
  </div>
</template>
