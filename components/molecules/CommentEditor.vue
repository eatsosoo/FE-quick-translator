<template>
  <div>
    <div class="mt-2 relative">
      <img
        src="http://danda.vn/meme/rabbit/001.gif"
        alt="gif_open"
        class="w-8 h-8 cursor-pointer"
        @click="toggleGifList"
      />
      <div
        v-if="showGifList"
        class="flex flex-wrap w-[20rem] min-h-10 border p-2 absolute top-[2.5rem] left-[1rem] z-5 bg-white rounded-md shadow-md"
      >
        <Loader2 v-if="gifs.length === 0" class="w-4 h-4 mr-2 animate-spin" />
        <template v-else>
          <div v-for="gif in gifs" :key="gif.id" @click="selectGif(gif)">
            <img :src="gif.url" alt="gif" class="w-8 h-8" />
          </div>
        </template>
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
import { Loader2 } from "lucide-vue-next";

const editor = ref<HTMLElement | null>(null);
const showGifList = ref(false);
const gifs = ref<{ id: string; url: string }[]>([]);
const content = ref("");

const fetchGifs = async () => {
  if (gifs.value.length > 0) return;

  const response = await fetch("http://demo.danda.vn/api/memes");
  const data = await response.json();
  gifs.value = data.rabbit.map((gif: string, index: string) => {
    return {
      id: index,
      url: `http://danda.vn/meme/rabbit/001.gif`,
      // url: `http://danda.vn${gif}`,
    };
  });
};

const toggleGifList = () => {
  showGifList.value = !showGifList.value;
  if (showGifList.value) {
    fetchGifs();
  }
};

const selectGif = (gif: { id: string; url: string }) => {
  if (editor.value) {
    const img = document.createElement("img");
    img.src = gif.url;
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
