<script setup lang="ts">
definePageMeta({
  title: "Profile",
  description: "User profile page",
  layout: "default",
  middleware: "auth",
});

const statistics = ref<{key: string, value: number}[]>([
  { key: "posts", value: 10 },
  { key: "comments", value: 20 },
  { key: "likes", value: 30 },
]); 
const profileForm = $listForm.profile;

const submitProfile = () => {
  console.log("submitting profile form");
};
</script>

<template>
  <div class="grid grid-cols-3 border shadow-sm rounded-lg *:border-l-[1px] [&>:first-child]:border-none">
    <div class="text-center [&>*]:mt-10 [&>:first-child]:mt-5">
      <h3 class="text-lg mt-5">Your Profile</h3>
      <div class="flex justify-center">
        <img
          src="https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face-thumbnail.png"
          alt="avatar"
          class="rounded-full w-24 h-24 p-2 border"
        />
      </div>
      <div class="">
        <p class="font-bold text-lg">John Doe</p>
        <p>Author</p>
      </div>
      <div class="grid grid-cols-3  *:border-l-[1px] [&>:first-child]:border-none [&>*>p:first-child]:font-medium [&>*>p:first-child]:text-[2rem]">
        <div v-for="(statistic, index) in statistics" :key="index">
          <p>{{ statistic.value }}</p>
          <p class="capitalize">{{ statistic.key }}</p>
        </div>
      </div>
      <div>
        <Button size="sm">Upload New Avatar</Button>
      </div>
    </div>

    <div class="">
      <h3 class="capitalize px-5 py-5 text-lg border-b-[1px]">edit your personal settings</h3>
      <div class="py-4 px-8">
          <DynamicForm :form-data="profileForm" @submit="submitProfile">
            <template #btnArea>
              <div class="flex justify-center mt-2">
                <Button
                  type="submit"
                  size="sm"
                  :disabled="profileForm.states.loading.submit"
                  :loading="profileForm.states.loading.submit"
                  >Update Information</Button
                >
              </div>
            </template>
          </DynamicForm>
      </div>
    </div>

    <div></div>
  </div>
</template>
