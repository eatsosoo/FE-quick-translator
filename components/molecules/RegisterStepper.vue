<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from "@/components/ui/pin-input";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { Check, Circle, Dot } from "lucide-vue-next";
import { h, ref } from "vue";
import * as z from "zod";
import { type GenericObject } from "vee-validate";
import type { ResponseDataType } from "~/common/types/response";
import axiosInstance from "~/config/axios";
import type { AxiosError } from "axios";

const props = defineProps({
  genres: {
    type: Array as PropType<{ value: number; label: string }[]>,
    required: true,
  },
});

const emits = defineEmits(["switchForm", "submit"]);

const formSchema = [
  z.object({
    name: z.string(),
    email: z.string().email(),
    user_name: z
      .string()
      .min(8)
      .max(50)
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username must not contain spaces or special characters"
      ),
  }),
  z
    .object({
      password: z.string().min(8).max(50),
      password_confirmation: z.string().min(8).max(50),
    })
    .refine(
      (values) => {
        return values.password === values.password_confirmation;
      },
      {
        message: "Passwords must match!",
        path: ["confirmPassword"],
      }
    ),
  z.object({
    favorite_genre: z.array(z.string()).min(1, { message: "Please choose a genre"}),
  }),
  z.object({
    code: z.array(z.coerce.string()).length(6, { message: "Invalid OTP" }),
  }),
];

const countdown = ref(0);
const stepIndex = ref(1);
const steps = [
  {
    step: 1,
    title: "Your details",
    description: "Provide your name and email",
  },
  {
    step: 2,
    title: "Your password",
    description: "Choose a password",
  },
  {
    step: 3,
    title: "Your Favorite Genre",
    description: "Choose a genre",
  },
  {
    step: 4,
    title: "Confirm Email",
    description: "Send you an email",
  },
];
const loading = ref(false);
const genresSelected = ref<string[]>([]);

const startCountdown = () => {
  countdown.value = 60;
  const interval = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value === 0) {
      clearInterval(interval);
    }
  }, 1000);
};

const sendConfirmationEmail = async (values: GenericObject) => {
  startCountdown();
  try {
    const { statusCode }: ResponseDataType = await axiosInstance.post(
      "/verify-email",
      { email: values.email }
    );
    if (statusCode === 200) {
      toast({
        title: "Email Sent",
        description: "We have sent a 6-digit code to your email address",
      });
    }
  } catch (error) {
    const err = error as AxiosError;
    const description = (err.response?.data as { message: string })?.message;
    toast({
      title: "Email Sent Failed",
      description,
    });
  }
};

const onSubmit = async (values: GenericObject) => {
  try {
    loading.value = true;
    const { statusCode, data }: ResponseDataType = await axiosInstance.post(
      "/register",
      { ...values, code: values.code.join("") }
    );
    if (statusCode === 200) {
      toast({
        title: "Register Success",
        description: "Welcome to our platform",
      });
      useAuthStore().setToken(data.token);
      useRouter().push("/");
    }
  } catch (error) {
    const err = error as AxiosError;
    const description = (err.response?.data as { message: string })?.message;
    toast({
      title: "Register Failed",
      description,
    });
  }
  loading.value = false;
};

const nextStep = (values: GenericObject) => {
  stepIndex.value += 1;
  if (stepIndex.value === 4) {
    sendConfirmationEmail(values);
  }
};

const selectGenres = (genre: string) => {
  if (genresSelected.value.includes(genre)) {
    genresSelected.value = genresSelected.value.filter((item) => item !== genre);
  } else {
    genresSelected.value.push(genre);
  }
  return genresSelected.value;
};
</script>

<template>
  <Form
    v-slot="{ meta, values, validate, setFieldValue }"
    as=""
    keep-values
    :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
  >
    <Stepper
      v-slot="{ isNextDisabled, isPrevDisabled, prevStep }"
      v-model="stepIndex"
      class="block w-full"
    >
      <form
        @submit="
          (e) => {
            e.preventDefault();
            validate();

            if (stepIndex === steps.length && meta.valid) {
              onSubmit(values);
            }
          }
        "
      >
        <div class="flex w-full flex-start gap-2">
          <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            class="relative flex w-full flex-col items-center justify-center"
            :step="step.step"
          >
            <StepperSeparator
              v-if="step.step !== steps[steps.length - 1].step"
              class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />

            <StepperTrigger as-child>
              <Button
                :variant="
                  state === 'completed' || state === 'active'
                    ? 'default'
                    : 'outline'
                "
                size="icon"
                class="z-10 rounded-full shrink-0"
                :class="[
                  state === 'active' &&
                    'ring-2 ring-ring ring-offset-2 ring-offset-background',
                ]"
                :disabled="state !== 'completed' && !meta.valid"
              >
                <Check v-if="state === 'completed'" class="size-5" />
                <Circle v-if="state === 'active'" />
                <Dot v-if="state === 'inactive'" />
              </Button>
            </StepperTrigger>

            <div class="mt-5 flex flex-col items-center text-center">
              <StepperTitle
                :class="[state === 'active' && 'text-primary']"
                class="text-sm font-semibold transition lg:text-base"
              >
                {{ step.title }}
              </StepperTitle>
              <StepperDescription
                :class="[state === 'active' && 'text-primary']"
                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
              >
                {{ step.description }}
              </StepperDescription>
            </div>
          </StepperItem>
        </div>

        <div class="flex flex-col gap-4 mt-4">
          <template v-if="stepIndex === 1">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="user_name">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>

          <template v-if="stepIndex === 2">
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password_confirmation">
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>

          <template v-if="stepIndex === 3">
            <FormField v-slot="{ value }" name="favorite_genre">
              <FormItem>
                <FormLabel>Genre</FormLabel>

                <FormControl>
                  <!-- <TagsInput :model-value="value">
                    <TagsInputItem
                      v-for="item in value"
                      :key="item"
                      :value="item"
                    >
                      <TagsInputItemText />
                      <TagsInputItemDelete />
                    </TagsInputItem>
                    <TagsInputInput placeholder="Genres..." readonly />
                  </TagsInput> -->

                  <div class="flex">
                    <div
                      v-for="option in props.genres"
                      :key="option.value"
                      class="py-0.5 px-2 text-sm rounded m-2 w-auto border hover:border-black hover:cursor-pointer"
                      :class="genresSelected.includes(option.label) ? 'bg-primary text-white' : 'bg-secondary'"
                      @click="setFieldValue('favorite_genre',  selectGenres(option.label))"
                    >
                      {{ option.label }}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>

          <template v-if="stepIndex === 4">
            <FormField v-slot="{ componentField, value }" name="code">
              <FormItem>
                <FormLabel>OTP</FormLabel>

                <FormControl>
                  <PinInput
                    id="pin-input"
                    :model-value="value"
                    placeholder="○"
                    class="flex gap-2 items-center mt-1"
                    otp
                    type="number"
                    :name="componentField.name"
                    @update:model-value="
                      (arrStr) => {
                        setFieldValue('code', arrStr.filter(Boolean));
                      }
                    "
                  >
                    <PinInputGroup>
                      <PinInputInput
                        v-for="(id, index) in 6"
                        :key="id"
                        :index="index"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        class="ml-2"
                        type="button"
                        :disabled="countdown !== 0"
                        @click="sendConfirmationEmail(values)"
                        >{{
                          countdown === 0 ? "Sent OTP" : countdown + "s"
                        }}</Button
                      >
                    </PinInputGroup>
                  </PinInput>
                </FormControl>
                <FormDescription>
                  We have sent a 6-digit code to your email address. Please
                  check your email
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>
        </div>

        <div class="flex items-center justify-between mt-4">
          <Button
            v-if="stepIndex !== 1"
            :disabled="isPrevDisabled"
            variant="outline"
            size="sm"
            @click="prevStep()"
          >
            Back
          </Button>
          <Button
            v-else
            variant="outline"
            size="sm"
            @click="emits('switchForm')"
            >Back to Sign In</Button
          >
          <div class="flex items-center gap-3">
            <Button
              v-if="stepIndex !== 4"
              :type="meta.valid ? 'button' : 'submit'"
              :disabled="isNextDisabled"
              size="sm"
              @click="meta.valid && nextStep(values)"
            >
              Next
            </Button>
            <Button v-if="stepIndex === 4" size="sm" type="submit" :loading="loading" :disabled="loading">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Stepper>
  </Form>
</template>
