<template>
  <div class="w-full">
    <div
        class="w-full flex items-center bg-white rounded-lg relative outline-0 border-2 border-solid border-y-gray-300 focus-within:border-primary main-transition"
        :class="[
        isArticlePage ? 'dark:!border-2 dark:border-blue/20' : '',
        { '!border-red focus-within:!border-red': error },
        { 'focus-within:!border-transparent': readonly },
      ]"
    >
      <div :class="prefixClass">
        <slot name="prefix"></slot>
      </div>
      <div class="relative w-full">
        <input
            :id="id"
            v-model="inputValue"
            :type="type"
            :area-label="areaLabel"
            :placeholder="placeholder"
            :maxLength="maxLength"
            :minLength="minLength"
            :readonly="readonly"
            :disabled="disabled"
            class="py-1.5 px-2.5 text-dark read-only:!text-dark-400 focus:border-0  leading-21 text-sm border-0 outline-0 bg-transparent w-full z-1 relative"
            :class="inputClass"
            @blur="(e: Event) => emit('blur', e)"
        />

      </div>
      <div :class="postfixClass">
        <slot name="postfix"></slot>
      </div>
    </div>
    <p v-if="error" class="text-red text-xs mt-1 absolute">
      {{ errorMessage }}
    </p>
  </div>
</template>
<script setup lang="ts">

import { defineProps, defineEmits, ref, watch } from "vue"


interface Props {
  id?: string
  type: string
  error?: boolean
  errorMessage?: string
  placeholder: string
  areaLabel?: string
  maxLength?: number
  minLength?: number
  prefixClass?: string
  postfixClass?: string
  inputClass?: string
  placeholderClass?: string
  defaultValue?: string
  validation?: boolean
  isArticlePage?: boolean
  readonly?: boolean
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
  (e: "blur", value: Event): void
}>()

const inputValue = ref("")

watch(
    () => inputValue.value,
    () => {
      emit("update:modelValue", inputValue.value)
    }
)

watch(
    () => props.defaultValue,
    () => {
      // inputValue.value = props.defaultValue
    },
    {
      immediate: true,
    }
)

</script>
<style>
/* Apply styles to autofill input field */
input:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill:focus-visible,
input:-webkit-autofill:hover {
  background-color: transparent !important;
  border: none;
  border-radius: 8px !important;
  color: #040e1a !important;
  -webkit-text-fill-color: #040e1a !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  transition: background-color 5000s ease-in-out 0s; /* delay the change of input background color */
}

input:-moz-placeholder {
  color: #040e1a !important;
}

input:-ms-input-placeholder {
  color: #040e1a !important;
}
</style>
