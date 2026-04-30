import { WorkoutPlanData } from "@/types/workouts";
import { Ex } from "@/types/exes";
import { defineStore } from "pinia";
import { ref, watch, nextTick } from "vue";
import { mockWorkoutPlans } from "../mock-data/workouts";
import { mockExes } from "../mock-data/exes";
import { getAllExes, getAllProgram, putAllProgram } from "./idb";

export const useMainStore = defineStore("main", () => {
  const program = ref<WorkoutPlanData[] | null>(null);
  const exes = ref<Ex[] | null>(null);
  const programChanged = ref(false);

  watch(
    program,
    () => {
      programChanged.value = true;
    },
    { deep: true },
  );

  async function init() {
    const [storedExes, storedProgram] = await Promise.all([
      getAllExes(),
      getAllProgram(),
    ]);

    exes.value = storedExes.length ? storedExes : mockExes;
    program.value = storedProgram.length ? storedProgram : mockWorkoutPlans;

    // Reset flag after the watcher fires from the initial assignment
    await nextTick();
    programChanged.value = false;
  }

  async function saveProgram() {
    if (!program.value) return;
    await putAllProgram(program.value);
    programChanged.value = false;
  }

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

  return {
    program,
    exes,
    programChanged,
    init,
    saveProgram,
    workoutPlanIdByWorkoutId,
    getExById,
  };
});
