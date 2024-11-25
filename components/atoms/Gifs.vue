<template>
    <div ref="gifsRef" class="relative">
      <div v-for="toolbar in toolbars" :key="toolbar.name">
        <img
          :src="toolbar.present"
          :alt="`gifs_${toolbar.name}`"
          class="w-8 cursor-pointer"
          @click="toggleGifList(toolbar.name)"
        />
      </div>
      <div
        v-if="showGifList"
        class="flex flex-wrap w-[20rem] min-h-10 border p-2 absolute top-[2.5rem] left-[1rem] z-50 bg-white rounded-md shadow-md"
      >
          <Loader2 v-if="loadingGifDetail" />
          <div v-for="(gifUrl, index) in currentGifs" :key="index">
            <img :src="gifUrl" alt="gif" class="w-8 h-8" @click="selectGif(gifUrl)"/>
          </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { ref } from "vue";

const showGifList = ref(false);
const gifsAll = ref<{[key: string]: string[]}>({});
const currentGifs = ref<string[]>([]);
const toolbars = ref<{ name: string, present: string}[]>([]);
const gifsRef = ref<HTMLElement | null>(null);
const loadingGifDetail = ref(false);
const emits = defineEmits(["select"]);

const fetchOrigins = async () => {
  const response = await fetch("http://demo.danda.vn/api/memes");
  const data = await response.json();
  toolbars.value = data;
}

const toggleGifList = async (key: string) => {
  showGifList.value = !showGifList.value;

  if (showGifList.value) {
    await fetchGifs(key);
  }
};

const fetchGifs = async (key: string) => {
  if (gifsAll.value[key]) {
    currentGifs.value = gifsAll.value[key];
    return;
  }

  loadingGifDetail.value = true;
  try {
    const response = await fetch(`http://demo.danda.vn/api/memes/${key}`);
    const data = await response.json();
    gifsAll.value[key] = data;
    currentGifs.value = gifsAll.value[key];
  } catch (error) {
    console.error('Failed to fetch GIFs:', error);
  } finally {
    loadingGifDetail.value = false;
  }
};

const selectGif = (gifUrl: string ) => {
  emits("select", gifUrl);
};

useOnClickOutside(gifsRef, () => {
  showGifList.value = false;
});

fetchOrigins();
</script>