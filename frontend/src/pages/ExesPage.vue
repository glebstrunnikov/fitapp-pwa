<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { useMainStore } from "@/stores/mainStore";
  import ExListCard from "@/components/workout-cards/ExListCard.vue";

  const store = useMainStore();
  const router = useRouter();
</script>

<template>
  <div class="flex flex-col gap-3 p-4">
    <button
      @click="router.back()"
      class="self-start text-sm font-semibold text-blue-900 mb-1"
    >
      ← Back
    </button>

    <template v-if="store.exes === null">
      <p class="text-center text-gray-400 mt-8">Loading…</p>
    </template>

    <template v-else>
      <ExListCard v-for="ex in store.exes" :key="ex.id" :ex="ex" />

      <button
        @click="router.push('/ex/create')"
        class="mt-2 w-full py-4 text-3xl font-bold text-blue-900 border-2 border-dashed border-blue-900 rounded-xl"
      >
        +
      </button>
    </template>
  </div>
</template>
