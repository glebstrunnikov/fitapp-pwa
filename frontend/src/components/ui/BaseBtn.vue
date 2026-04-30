<template>
  <button
    :class="[
      'px-4 py-2 rounded-md font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
      variantClasses,
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps({
    variant: {
      type: String,
      default: "primary",
      validator: (value: unknown) =>
        ["primary", "secondary", "ghost", "danger"].includes(value as string),
    },
  });

  const variantClasses = computed(
    () =>
      ({
        primary: "bg-blue-700 !text-white hover:bg-blue-800",
        secondary: "bg-gray-200 !text-gray-700 hover:bg-gray-300",
        ghost: "border border-blue-700 !text-blue-900 hover:bg-blue-50",
        danger: "bg-red-600 !text-white hover:bg-red-700",
      })[props.variant],
  );
</script>
