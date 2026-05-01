<script setup lang="ts">
  import { useRouter } from "vue-router";
  import type { Ex } from "@/types/exes";
  import BaseCard from "@/components/ui/BaseCard.vue";
  import BaseBtn from "@/components/ui/BaseBtn.vue";
  import RemoveBtn from "@/components/ui/RemoveBtn.vue";
  import { useMainStore } from "@/stores/mainStore";

  const props = defineProps<{
    ex: Ex;
  }>();

  const store = useMainStore();
  const router = useRouter();

  function handleRemove() {
    store.removeEx(props.ex.id);
  }

  function handleEdit() {
    router.push(`/ex/${props.ex.id}/edit`);
  }
</script>

<template>
  <BaseCard>
    <div class="font-bold text-gray-900 text-lg mb-1">{{ ex.name }}</div>
    <p v-if="ex.description" class="text-sm text-gray-600 mb-3">
      {{ ex.description }}
    </p>
    <div class="flex gap-2 mt-2">
      <BaseBtn variant="ghost" class="text-sm py-1" @click="handleEdit"
        >Edit</BaseBtn
      >
      <RemoveBtn @remove="handleRemove" />
    </div>
  </BaseCard>
</template>
