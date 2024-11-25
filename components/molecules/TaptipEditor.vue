<template>
  <div v-if="editor" class="space-y-2">
    <div class="control-group ">
      <div class="button-group flex items-center space-x-2">
        <Button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          variant="outline"
          size="sm"
        >
          <Bold :size="20" :strokeWidth="3" />
        </Button>
         <Button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          variant="outline"
          size="sm"
        >
          <Italic :size="20" :strokeWidth="1" />
        </Button>
        <Gifs @select="addImage($event)"></Gifs>
      </div>
    </div>
    <div class="p-2 border border-gray space-y-3 rounded-lg">
        <EditorContent :editor="editor" class="min-h-32 border border-gray *:outline-none p-1" />
        <Button size="sm" @click="submitComment">Comment</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Image from '@tiptap/extension-image';
import { Editor, EditorContent } from "@tiptap/vue-3";
import { Bold, Italic } from 'lucide-vue-next';


const editor = new Editor({
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit,
    Image,
  ],
  content: "",
});

const addImage = (url: string) => {
  editor.chain().focus().setImage({ src: url }).run();
};

const getEditorHTML = () => {
  return editor.getHTML();
};

const submitComment = () => {
  console.log(getEditorHTML());
};

onBeforeUnmount(() => {
  editor.destroy();
});
</script>

<style lang="scss" scoped>
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>
