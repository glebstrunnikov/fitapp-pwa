<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useMainStore } from "@/stores/mainStore";

  const store = useMainStore();
  const ready = ref(false);

  onMounted(async () => {
    await store.init();
    ready.value = true;
  });
</script>

<template>
  <div v-if="!ready" class="flex items-center justify-center h-screen">
    <van-loading size="32" />
  </div>
  <RouterView v-else />
</template>
