<template>
  <div>
    <div class="grid grid-cols-2 gap-2">
      <div>
        <div><p>Chinese</p></div>
        <textarea
          v-model="text"
          ref="textAreaRef"
          class="border p-2 w-full"
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
     <RichTextEditor v-model="comment" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Highlight Selected Text",
  description:
    "Highlight selected text in a textarea using Vue 3 Composition API",
  layout: "default",
  middleware: 'auth',
});
import { ref } from "vue";
import RichTextEditor from "~/components/molecules/CommentEditor.vue";

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

const translate = async () => {
  const response = await sendMessageToChatGPT(selectedText.value);
  translateText.value = response;
};

const highlightedText = computed(() => {
  if (!selectedText.value) {
    return translateText.value;
  }
  const regex = new RegExp(`(${selectedText.value})`, "gi");
  return translateText.value.replace(regex, "<mark>$1</mark>");
});
</script>

<style scoped lang="scss">
textarea {
  height: 150px;
}
</style>
