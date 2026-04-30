<script setup lang="ts">
  import { computed } from "vue";
  import { useMainStore } from "@/stores/mainStore";
  import { mockExes } from "@/mock-data/exes";
  import WorkoutCard from "@/components/workout-cards/WorkoutCard.vue";
  import WorkoutPlanCard from "@/components/workout-cards/WorkoutPlanCard.vue";

  const store = useMainStore();

  function getExes(exIds: string[]) {
    return exIds.map((id) => mockExes.find((ex) => ex.id === id)!);
  }

  const singlePlanWorkouts = computed(() =>
    store.program?.length === 1 ? store.program[0].workouts : null,
  );

  function allPlanExIds(planIndex: number) {
    const ids = new Set<string>();
    store.program![planIndex].workouts.forEach((w) =>
      w.exes.forEach((e) => ids.add(e.exId)),
    );
    return [...ids];
  }
</script>

<template>
  <div class="flex flex-col gap-3 p-4">
    <template v-if="store.program === null">
      <p class="text-center text-gray-400 mt-8">Loading…</p>
    </template>

    <template v-else-if="store.program.length > 1">
      <WorkoutPlanCard
        v-for="(plan, i) in store.program"
        :key="plan.workoutPlanId"
        :plan="plan"
        :exes="getExes(allPlanExIds(i))"
      />
    </template>

    <template v-else-if="singlePlanWorkouts">
      <WorkoutCard
        v-for="(workout, i) in singlePlanWorkouts"
        :key="workout.workoutId"
        :workout="workout"
        :number="i + 1"
        :exes="getExes(workout.exes.map((e) => e.exId))"
      />
    </template>
  </div>
</template>
