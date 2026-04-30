<script setup lang="ts">
  const props = defineProps<{
    modelValue: number | undefined;
  }>();

  const emit = defineEmits<{
    "update:modelValue": [value: number | undefined];
  }>();

  function decrement() {
    const val = props.modelValue ?? 0;
    if (val > 0) emit("update:modelValue", val - 1);
  }

  function increment() {
    emit("update:modelValue", (props.modelValue ?? 0) + 1);
  }

  function onInput(event: Event) {
    const val = parseInt((event.target as HTMLInputElement).value);
    emit("update:modelValue", isNaN(val) ? undefined : val);
  }
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-bold text-xl leading-none active:bg-gray-200 select-none"
      @click="decrement"
    >
      −
    </button>
    <input
      :value="modelValue"
      @input="onInput"
      type="number"
      min="0"
      class="w-16 text-center border border-gray-300 rounded-md text-2xl font-semibold py-0.5 focus:outline-none focus:border-blue-500"
    />
    <button
      class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-bold text-xl leading-none active:bg-gray-200 select-none"
      @click="increment"
    >
      +
    </button>
  </div>
</template>
