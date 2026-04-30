<script setup lang="ts">
  import { ref, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { mockWorkoutPlans } from "@/mock-data/workouts";
  import { useMainStore } from "@/stores/mainStore";

  import ExCard from "@/components/workout-cards/ExCard.vue";

  const router = useRouter();

  const route = useRoute();
  const workoutId = route.params.id as string;
  const store = useMainStore();
  const workoutPlanId = computed(() => {
    return store.workoutPlanIdByWorkoutId(workoutId);
  });
  const workoutPlan = computed(() => {
    return (
      store.program?.find((p) => p.workoutPlanId === workoutPlanId.value) ??
      null
    );
  });

  const workoutNumber = computed(() => {
    return (
      workoutPlan.value?.workouts.findIndex((w) => w.workoutId === workoutId) ??
      -1
    );
  });

  const workout = computed(() => {
    return (
      workoutPlan.value?.workouts.find((w) => w.workoutId === workoutId) ?? null
    );
  });

  const planEntry = computed(() => {
    for (const plan of mockWorkoutPlans) {
      const idx = plan.workouts.findIndex((w) => w.workoutId === workoutId);
      if (idx !== -1)
        return { plan, workout: plan.workouts[idx], number: idx + 1 };
    }
    return null;
  });

  const activeIndex = ref<number | null>(null);

  function toggleActive(i: number) {
    activeIndex.value = activeIndex.value === i ? null : i;
  }

  function goBack() {
    if ((store.program?.length ?? 0) > 1 && workoutPlanId.value) {
      router.push({
        name: "workout-plan",
        params: { id: workoutPlanId.value },
      });
    } else {
      router.push({ name: "home" });
    }
  }
</script>

<template>
  <div class="flex flex-col gap-3 p-4" v-if="store.program && store.exes">
    <div class="flex items-center mb-2">
      <button
        @click="goBack"
        class="text-blue-900 font-semibold flex items-center gap-1 pr-3 py-1"
      >
        <span class="text-lg leading-none">&larr;</span> Back
      </button>
      <div
        v-if="planEntry"
        class="flex-1 text-xl font-bold text-gray-900 text-center pr-16"
      >
        Workout {{ workoutNumber + 1 }}
      </div>
    </div>
    <ExCard
      v-for="(exData, i) in workout?.exes"
      :key="exData.exId"
      :ex-id="exData.exId"
      :workout-id="workoutId"
      :workout-plan-id="workoutPlanId!"
      :active="activeIndex === i"
      @edit="toggleActive(i)"
    />
  </div>
</template>
