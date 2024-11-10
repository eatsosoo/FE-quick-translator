<script setup lang="ts">
import type { PropType } from "vue";
import type { FormDataType, RowType } from "~/utils/types/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Password } from "@/components/ui/password";
import { useForm } from "vee-validate";

const props = defineProps({
  data: Object as PropType<FormDataType>,
});
const emits = defineEmits(["submit"]);

const formSchema = props.data?.structure.validate

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {  
  emits("submit", values);
});

const components: Record<RowType, any> = {
  text: Input,
  password: Password
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormField
      v-for="row in data?.structure.rows"
      :key="row.name"
      v-slot="{ componentField }"
      :name="row.name"
    >
      <FormItem class="mb-4">
        <FormLabel>{{ row.label }}</FormLabel>
        <FormControl>
          <component :is="components[row.rowType]" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <template v-if="data?.structure.bottomSlotName">
      <slot :name="data?.structure.bottomSlotName"></slot>
    </template>
  </form>
</template>
