<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { LayoutDashboard } from 'lucide-vue-next';
import { LogOut } from 'lucide-vue-next';
import { Settings } from 'lucide-vue-next';
import { BookType } from 'lucide-vue-next';
import { UserPen } from 'lucide-vue-next';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { AlignJustify } from 'lucide-vue-next';

const menus = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Settings', icon: Settings, href: '/' },
  { name: 'Books', icon: BookType, href: '/' },
  { name: 'Profile', icon: UserPen, href: '/' },
  { name: 'Logout', icon: LogOut, href: '/login' },
]

const logout = () => {
  const authStore = useAuthStore();
  authStore.clearToken();
}

const actions = (name: string) => {
  console.log(name);
  
  if (name === 'Logout') {
    logout()
  }
}
</script>

<template>
  <Drawer direction="left">
    <DrawerTrigger as-child>
      <Button variant="outline">
        <AlignJustify />
      </Button>
      <div v-for="menu in menus" :key="menu.name" class="flex justify-center hover:bg-slate-100 hover:rounded-sm">
        <nuxt-link :href="menu.href" class="block p-2 my-2" @click="actions(menu.name)">
            <component :is="menu.icon" />
        </nuxt-link>
      </div>
    </DrawerTrigger>
    <DrawerContent class="h-screen rounded-none w-[18rem]">
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Quick translator</DrawerDescription>
        </DrawerHeader>
        <div v-for="menu in menus" :key="menu.name" class="hover:bg-slate-100 hover:rounded-sm mx-2">
            <nuxt-link :href="menu.href" class="flex justify-start p-2 my-2" @click="actions(menu.name)">
              <component :is="menu.icon" />
              <p class="ml-4">{{ menu.name }}</p>
            </nuxt-link>
        </div>
        <!-- <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter> -->
      </div>
    </DrawerContent>
  </Drawer>
</template>

<style>
.slide-from-left-enter-active, .slide-from-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-from-left-enter, .slide-from-left-leave-to {
  transform: translateX(-100%);
}
</style>