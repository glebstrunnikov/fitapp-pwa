<script setup lang="ts">
  import WorkoutCard from "@/components/workout-cards/WorkoutCard.vue";
  import { useMainStore } from "@/stores/mainStore";
  import { computed, ref, toRaw } from "vue";
  import BaseBtn from "@/components/ui/BaseBtn.vue";
  import { useRoute, useRouter } from "vue-router";
  import type { WorkoutPlanData } from "@/types/workouts";

  const router = useRouter();
  const store = useMainStore();
  const route = useRoute();
  const workoutPlanId = route.params.id as string;

  const plan = computed(
    () => store.program?.find((p) => p.workoutPlanId === workoutPlanId) ?? null,
  );

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

  function addWorkout() {
    if (!plan.value) return;
    plan.value.workouts.push({
      workoutId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      exes: [],
    });
  }

  function handleDeleteWorkout(workoutId: string) {
    if (!plan.value) return;
    const idx = plan.value.workouts.findIndex((w) => w.workoutId === workoutId);
    if (idx !== -1) plan.value.workouts.splice(idx, 1);
  }
</script>

<template>
  <div class="flex flex-col gap-3 p-4">
    <div class="flex items-center justify-between mb-2">
      <button
        @click="router.push({ name: 'home' })"
        class="text-blue-900 font-semibold flex items-center gap-1 pr-3 py-1"
      >
        <span class="text-lg leading-none">&larr;</span> Back
      </button>
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

    <WorkoutCard
      v-for="(workout, i) in plan?.workouts ?? []"
      :key="workout.workoutId"
      :workout="workout"
      :number="i + 1"
      :edit-mode="editMode"
      @delete="handleDeleteWorkout"
    />

    <button
      v-if="editMode"
      @click="addWorkout"
      class="mt-2 w-full py-4 text-3xl font-bold text-blue-900 border-2 border-dashed border-blue-900 rounded-xl"
    >
      +
    </button>
  </div>
</template>
