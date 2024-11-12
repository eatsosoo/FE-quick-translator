<script setup lang="ts">
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/components/ui/tags-input";
import { ref, type PropType } from "vue";

const props = defineProps({
  value: {
    type: Array as PropType<string[]>,
    required: true,
  },
  options: {
    type: Array as PropType<{ value: string | number; label: string }[]>,
    default: () => [],
  },
});

const emits = defineEmits(["update:modelValue"]);

const modelValue = ref<string[]>([]);

const addFavoriteGenre = (genre: string) => {
  if (!modelValue.value.includes(genre)) {
    modelValue.value.push(genre);
    emits("update:modelValue", modelValue.value);
  }
};
</script>

<template>
  <div>
    <TagsInput v-model="modelValue">
      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>

      <TagsInputInput placeholder="Genres..." readonly />
    </TagsInput>
    <div class="flex">
      <div
        v-for="option in props.options"
        :key="option.value"
        class="py-0.5 px-2 text-sm rounded bg-secondary m-2 w-auto border hover:border-black hover:cursor-pointer"
        @click="addFavoriteGenre(option.label)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
