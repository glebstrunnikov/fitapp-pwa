<template>
  <button
    :class="[
      'px-4 py-2 rounded-md font-semibold transition-colors',
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
      validator: (value: unknown) => ["primary", "secondary"].includes(value as string),
    },
  });

  const variantClasses = computed(
    () =>
      ({
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-white text-black border border-black hover:bg-gray-100",
      })[props.variant],
  );
</script>
