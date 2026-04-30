<script setup lang="ts">
import { useMainStore } from "@/stores/mainStore";
const store = useMainStore();
store.init();
</script>

<template>
  <RouterView />
</template>
