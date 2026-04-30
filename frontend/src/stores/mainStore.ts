import { WorkoutPlanData } from "@/types/workouts";
import { Ex } from "@/types/exes";
import { defineStore } from "pinia";
import { ref } from "vue";
import { mockWorkoutPlans } from "../mock-data/workouts";
import { mockExes } from "../mock-data/exes";

export const useMainStore = defineStore("main", () => {
  const program = ref<WorkoutPlanData[] | null>(null);
  const exes = ref<Ex[] | null>(null);
  setTimeout(() => {
    program.value = mockWorkoutPlans;
    exes.value = mockExes;
  }, 1000);

  function workoutPlanIdByWorkoutId(workoutId: string): string | undefined {
    for (const plan of program.value ?? []) {
      if (plan.workouts.some((w) => w.workoutId === workoutId)) {
        return plan.workoutPlanId;
      }
    }
    return undefined;
  }

  function getExById(exId: string): Ex {
    const ex = exes.value?.find((ex) => ex.id === exId);
    if (!ex) throw new Error(`Ex not found: ${exId}`);
    return ex;
  }

  return { program, exes, workoutPlanIdByWorkoutId, getExById };
});
