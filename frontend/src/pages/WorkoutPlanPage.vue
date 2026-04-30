<script setup lang="ts">
  import { mockWorkoutPlans } from "@/mock-data/workouts";
  import { mockExes } from "@/mock-data/exes";
  import WorkoutCard from "@/components/workout-cards/WorkoutCard.vue";
  import { useMainStore } from "@/stores/mainStore";
  import { computed } from "vue";
  import { useRoute, useRouter } from "vue-router";

  const router = useRouter();
  const store = useMainStore();
  const route = useRoute();
  const workoutPlanId = route.params.id as string;

  const plan = computed(() => {
    return (
      store.program?.find((p) => p.workoutPlanId === workoutPlanId) ?? null
    );
  });

  function getExes(exIds: string[]) {
    return exIds.map((id) => mockExes.find((ex) => ex.id === id)!);
  }
</script>

<template>
  <div class="flex flex-col gap-3 p-4">
    <div class="mb-2">
      <button
        @click="router.push({ name: 'home' })"
        class="text-blue-900 font-semibold flex items-center gap-1 pr-3 py-1"
      >
        <span class="text-lg leading-none">&larr;</span> Back
      </button>
    </div>
    <WorkoutCard
      v-for="(workout, i) in plan?.workouts ?? []"
      :key="workout.workoutId"
      :workout="workout"
      :number="i + 1"
      :exes="getExes(workout.exes.map((e) => e.exId))"
    />
  </div>
</template>
