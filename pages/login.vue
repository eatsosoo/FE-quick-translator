<script setup lang='ts'>
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createReusableTemplate } from '@vueuse/core'

definePageMeta({
    title: 'Login',
    description: 'Deploy your new project in one-click.',
    layout: 'empty',
})

const [UseLoginTemplate, LoginForm] = createReusableTemplate()
const [UseRegisterTemplate, RegisterForm] = createReusableTemplate()

const router = useRouter()

const isLogin = ref(true)
const text =  reactive({
    title: 'Login',
    action: 'Login',
    switch: 'Sign Up',
})

const methods = {
    switchForm: () => {
        isLogin.value = !isLogin.value
        text.title = isLogin.value ? 'Login' : 'Register'
        text.action = isLogin.value ? 'Login' : 'Register'
        text.switch = isLogin.value ? 'Sign Up' : 'Sign In'
    },
    login: () => {
        router.push('/')
    },
}
</script>

<template>
    <UseLoginTemplate>
        <form>
            <div class="grid items-center w-full gap-4">
                <div class="flex flex-col space-y-1.5">
                    <Label for="Email">Email</Label>
                    <Input id="email" />
                </div>
                <div class="flex flex-col space-y-1.5">
                    <Label for="password">Password</Label>
                    <Input id="password" />
                </div>
            </div>
        </form>
    </UseLoginTemplate>

    <UseRegisterTemplate>
        <form>
            <div class="grid items-center w-full gap-4">
                <div class="flex flex-col space-y-1.5">
                    <Label for="Email">Email</Label>
                    <Input id="email" />
                </div>
                <div class="flex flex-col space-y-1.5">
                    <Label for="password">Password</Label>
                    <Input id="password" />
                </div>
                <div class="flex flex-col space-y-1.5">
                    <Label for="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" />
                </div>
            </div>
        </form>
    </UseRegisterTemplate>

    <div class="login-page h-screen flex justify-center items-center">
        <Card class="w-[350px] shadow-lg transition duration-150 ease-in-out">
            <CardHeader>
                <CardTitle>{{ text.title }}</CardTitle>
                <CardDescription>Welcome to ...</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm v-if="isLogin" />
                <RegisterForm v-else />
            </CardContent>
            <CardFooter class="flex-col items-start px-6 pb-6">
                <p class="text-sm mb-1 hover:underline cursor-pointer">Forgot password?</p>
                <div class="flex justify-between w-full">
                    <Button @click="methods.login">{{ text.action }}</Button>
                    <Button variant="outline" @click="methods.switchForm">
                        {{ text.switch }}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    </div>
</template>