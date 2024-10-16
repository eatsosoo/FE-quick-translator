<script setup lang="ts">
import type { PropType } from "vue";
import type { FormDataType, RowType } from "~/utils/types/form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Password } from "@/components/ui/password";
import { toast } from "@/components/ui/toast";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import * as z from "zod";

const props = defineProps({
  data: Object as PropType<FormDataType>,
});

const formSchema = props.data?.structure.validate

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
});

const components: Record<RowType, any> = {
  text: Input,
  password: Password
}
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
      <FormField
        v-for="row in data?.structure.rows"
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
