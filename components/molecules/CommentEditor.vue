<template>
  <div>
    <div class="mt-2 relative">
      <div v-for="toolbar in toolbars" :key="toolbar.name">
        <img
          :src="toolbar.present"
          :alt="`gifs_${toolbar.name}`"
          class="w-8 h-8 cursor-pointer"
          @click="toggleGifList(toolbar.name)"
        />
      </div>
      <div
        v-if="showGifList"
        class="flex flex-wrap w-[20rem] min-h-10 border p-2 absolute top-[2.5rem] left-[1rem] z-5 bg-white rounded-md shadow-md"
      >
          <div v-for="(gifUrl, index) in currentGifs" :key="index">
            <img :src="gifUrl" alt="gif" class="w-8 h-8" @click="selectGif(gifUrl)"/>
          </div>
      </div>
    </div>
    <div
      contenteditable="true"
      ref="editor"
      class="border border-black p-2 w-full h-auto min-h-32 w-max-full"
      @input="updateContent"
    ></div>
    <div class="mt-2">
      <Button @click="submitComment" size="sm">Comment</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const editor = ref<HTMLElement | null>(null);
const showGifList = ref(false);
const gifsAll = ref<{[key: string]: string[]}>({});
const currentGifs = ref<string[]>([]);
const content = ref("");
const toolbars = ref<{ name: string, present: string}[]>([]);

const fetchOrigins = async () => {
  const response = await fetch("http://demo.danda.vn/api/memes");
  const data = await response.json();
  toolbars.value = data;
}
fetchOrigins();

const toggleGifList = async (key: string) => {
  showGifList.value = !showGifList.value;

  if (gifsAll.value[key]) {
    currentGifs.value = gifsAll.value[key];
    return;
  }
  
  const response = await fetch(`http://demo.danda.vn/api/memes/${key}`);
  const data = await response.json();
  gifsAll.value[key] = data;
  currentGifs.value = gifsAll.value[key];
};

const selectGif = (gifUrl: string ) => {
  if (editor.value) {
    const img = document.createElement("img");
    img.src = gifUrl;
    img.alt = "gif";
    img.className = "w-8 h-8";
    editor.value.appendChild(img);
    showGifList.value = false;
    content.value = editor.value.innerHTML;
  }
};

const updateContent = () => {
  if (editor.value) {
    content.value = editor.value.innerHTML;
  }
};

const submitComment = () => {
  console.log(content.value);
};

onMounted(() => {
  if (editor.value) {
    editor.value.innerHTML = content.value;
  }
});
</script>
