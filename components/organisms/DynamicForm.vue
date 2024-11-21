<script setup lang="ts">
import type { PropType } from "vue";
import type { FormDataType, RowType } from "~/common/types/form";
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
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const props = defineProps({
  formData: {
    type: Object as PropType<FormDataType>,
    required: true,
  },
});
const emits = defineEmits(["submit"]);

const formSchema = props.formData.structures.reduce((acc, structure) => {
  structure.rows?.forEach((row) => {
    acc[row.name] = row.rules;
  });
  return acc;
}, {});

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(z.object(formSchema)),
});

const onSubmit = handleSubmit((values) => {
  emits("submit", values);
});

const components: Record<RowType, any> = {
  text: Input,
  password: Password,
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div v-for="structure in formData.structures">
      <div :class="structure.style">
        <FormField
          v-for="row in structure.rows"
          :key="row.name"
          v-slot="{ componentField }"
          :name="row.name"
        >
          <FormItem class="mb-4">
            <FormLabel>{{ row.label }}</FormLabel>
            <FormControl>
              <component
                :is="components[row.rowType]"
                v-bind="componentField"
                :readonly="row.readonly"
                :default-value="formData.states.values[row.name]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
  
      <template v-if="structure.bottomSlotName">
        <slot :name="structure.bottomSlotName"></slot>
      </template>
    </div>
  </form>
</template>
