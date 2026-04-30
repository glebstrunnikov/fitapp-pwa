<script setup lang="ts">
  import { ref, toRaw } from "vue";
  import { useMainStore } from "@/stores/mainStore";
  import WorkoutPlanCard from "@/components/workout-cards/WorkoutPlanCard.vue";
  import BaseBtn from "@/components/ui/BaseBtn.vue";
  import type { WorkoutPlanData } from "@/types/workouts";

  const store = useMainStore();

  const editMode = ref(false);
  let programSnapshot: WorkoutPlanData[] | null = null;

  function enterEditMode() {
    programSnapshot = structuredClone(toRaw(store.program));
    editMode.value = true;
  }

  async function saveEdit() {
    await store.saveProgram();
    editMode.value = false;
    programSnapshot = null;
  }

  function cancelEdit() {
    if (programSnapshot) {
      store.program = programSnapshot;
    }
    editMode.value = false;
    programSnapshot = null;
  }

  function addPlan() {
    store.program?.push({
      workoutPlanId: crypto.randomUUID(),
      workouts: [],
    });
  }

  function handleDeletePlan(planId: string) {
    if (!store.program) return;
    const idx = store.program.findIndex((p) => p.workoutPlanId === planId);
    if (idx !== -1) store.program.splice(idx, 1);
  }
</script>

<template>
  <div class="flex flex-col gap-3 p-4">
    <template v-if="store.program === null">
      <p class="text-center text-gray-400 mt-8">Loading…</p>
    </template>

    <template v-else>
      <div class="flex justify-between mb-2">
        <router-link to="/exes">
          <BaseBtn variant="ghost" class="text-sm py-1">Exes</BaseBtn>
        </router-link>
        <div v-if="!editMode">
          <BaseBtn variant="ghost" class="text-sm py-1" @click="enterEditMode"
            >Edit</BaseBtn
          >
        </div>
        <div v-else class="flex gap-2">
          <BaseBtn variant="secondary" class="text-sm py-1" @click="cancelEdit"
            >Cancel</BaseBtn
          >
          <BaseBtn variant="primary" class="text-sm py-1" @click="saveEdit"
            >Save</BaseBtn
          >
        </div>
      </div>

      <WorkoutPlanCard
        v-for="plan in store.program"
        :key="plan.workoutPlanId"
        :plan="plan"
        :edit-mode="editMode"
        @delete="handleDeletePlan"
      />

      <button
        v-if="editMode"
        @click="addPlan"
        class="mt-2 w-full py-4 text-3xl font-bold text-blue-900 border-2 border-dashed border-blue-900 rounded-xl"
      >
        +
      </button>
    </template>
  </div>
</template>
