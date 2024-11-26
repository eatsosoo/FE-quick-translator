<template>
  <div>
    <div class="grid grid-cols-2 gap-2">
      <div>
        <div><p>Chinese</p></div>
        <textarea
          v-model="text"
          ref="textAreaRef"
          class="border p-2 w-full h-[150px]"
          @mouseup="getSelection"
          @input="translateText = text"
        ></textarea>
      </div>
      <div>
        <div><p>Vietnamese</p></div>
        <div class="border p-2 min-h-[150px]">
          <p v-html="highlightedText"></p>
        </div>
      </div>
    </div>

    <p>Selected text: "{{ selectedText }}"</p>
    <br>
    <!-- <ClientOnly>
      <TaptipEditor v-model="comment" />
    </ClientOnly> -->
    <div class="w-96">
      <LuckyWheel :prizes="['1000', '2000', '500', '300', '800']" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Highlight Selected Text",
  description:
    "Highlight selected text in a textarea using Vue 3 Composition API",
  layout: "default",
  middleware: 'auth',
  ssr: false,
});
import { ref } from "vue";

const text = ref("");
const translateText = ref("");
const selectedText = ref("");
const textAreaRef = ref<any>(null);
const comment = ref("");

const getSelection = () => {
  const textarea = textAreaRef.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  selectedText.value = textarea.value.substring(start, end);
};

const highlightedText = computed(() => {
  if (!selectedText.value) {
    return translateText.value;
  }
  const regex = new RegExp(`(${selectedText.value})`, "gi");
  return translateText.value.replace(regex, "<mark>$1</mark>");
});
</script>
