<script setup lang="ts">
  import type { WorkoutData } from "@/types/workouts";
  import type { Ex } from "@/types/exes";
  import BaseCard from "@/components/ui/BaseCard.vue";

  const props = defineProps<{
    workout: WorkoutData;
    number: number;
    exes: Ex[];
  }>();

  const exNames = props.exes.map((ex) => ex.name).join(", ");

  const date = new Date(props.workout.timestamp);
  const dateLabel = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
</script>

<template>
  <router-link :to="`/workout/${workout.workoutId}`">
    <BaseCard>
      <div class="font-bold text-gray-900 text-lg mb-1">
        Workout {{ number }}
      </div>
      <p class="text-sm text-gray-600 mb-2">{{ exNames }}</p>
      <div class="text-xs text-gray-400">Last workout: {{ dateLabel }}</div>
    </BaseCard>
  </router-link>
</template>
