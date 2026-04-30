<script setup lang="ts">
  import type { WorkoutPlanData } from "@/types/workouts";
  import type { Ex } from "@/types/exes";
  import BaseCard from "@/components/ui/BaseCard.vue";

  const props = defineProps<{
    plan: WorkoutPlanData;
    exes: Ex[];
  }>();

  const exNames = props.exes.map((ex) => ex.name).join(", ");
</script>

<template>
  <router-link :to="`/workout-plan/${plan.workoutPlanId}`">
    <BaseCard>
      <div class="font-bold text-gray-900 text-lg mb-1">
        {{ plan.workouts.length }} workout{{
          plan.workouts.length !== 1 ? "s" : ""
        }}
      </div>
      <p class="text-sm text-gray-600">{{ exNames }}</p>
    </BaseCard>
  </router-link>
</template>
