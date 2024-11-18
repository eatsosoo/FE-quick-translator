<template>
  <div class="comment-input">
    <textarea v-model="comment" placeholder="Write a comment..."></textarea>
    <div class="toolbar">
      <button @click="fetchGifs">Show GIFs</button>
    </div>
    <div v-if="showGifs" class="gif-list">
      <div
        v-for="gif in gifs"
        :key="gif.id"
        class="gif-item"
        @click="selectGif(gif)"
      >
        <img :src="gif.url" :alt="gif.title" />
      </div>
    </div>
    <div v-if="selectedGif" class="selected-gif">
      <img
        :src="selectedGif.url"
        :alt="selectedGif.title"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const comment = ref("");
const showGifs = ref(false);
const gifs = ref([]);
const selectedGif = ref(null);

const fetchGifs = async () => {
  showGifs.value = !showGifs.value;
  if (showGifs.value && gifs.value.length === 0) {
    try {
      const response = await axios.get(
        "http://demo.danda.vn/api/memes",
      );
      
      gifs.value = response.data.rabbit[0].map((gif, index) => ({
        id: index,
        title: 'rabbit' + index,
        images: "http://demo.danda.vn" + gif,
      }));
      console.log(gifs.value);

    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  }
};

const selectGif = (gif) => {
  selectedGif.value = gif;
  showGifs.value = false;
};
</script>

<style scoped>
.comment-input {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.toolbar {
  margin-top: 10px;
}

.gif-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.gif-item {
  cursor: pointer;
}

.selected-gif {
  margin-top: 10px;
}
</style>
