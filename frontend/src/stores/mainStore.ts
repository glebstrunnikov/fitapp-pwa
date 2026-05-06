import { WorkoutPlanData } from "@/types/workouts";
import { Ex } from "@/types/exes";
import type { User } from "@/types/auth";
import { defineStore } from "pinia";
import { ref, watch, nextTick } from "vue";
import { mockExes } from "../mock-data/exes";
import { getAllExes, putAllProgram, putAllExes } from "./idb";
import {
  apiGetMe,
  apiLogin,
  apiRegister,
  apiLogout,
  apiSaveProgram,
  apiLoadProgram,
  apiGetExes,
  apiCreateEx,
  apiUpdateEx,
  apiDeleteEx,
} from "@/api";

export const useMainStore = defineStore("main", () => {
  // --- auth state ---
  const user = ref<User | null>(null);
  const authInitialized = ref(false);

  async function checkSession(): Promise<void> {
    user.value = await apiGetMe();
    authInitialized.value = true;
  }

  async function login(email: string, password: string): Promise<void> {
    user.value = await apiLogin(email, password);
  }

  async function register(email: string, password: string): Promise<void> {
    user.value = await apiRegister(email, password);
  }

  async function logout(): Promise<void> {
    await apiLogout();
    user.value = null;
  }

  // --- workout / ex state ---
  const program = ref<WorkoutPlanData[] | null>(null);
  const exes = ref<Ex[] | null>(null);
  const programChanged = ref(false);
  const programSaving = ref(false);

  watch(
    program,
    () => {
      programChanged.value = true;
    },
    { deep: true },
  );

  async function init() {
    const [fetchedExes, loadedProgram] = await Promise.all([
      apiGetExes()
        .then(async (serverExes) => {
          await putAllExes(serverExes);
          return serverExes;
        })
        .catch(async () => {
          const cached = await getAllExes();
          return cached.length ? cached : mockExes;
        }),
      apiLoadProgram(),
    ]);

    exes.value = fetchedExes;
    program.value = loadedProgram;

    // Reset flag after the watcher fires from the initial assignment
    await nextTick();
    programChanged.value = false;
  }

  async function saveProgram() {
    if (!program.value) return;
    await putAllProgram(program.value);
    programChanged.value = false;
    programSaving.value = true;
    await apiSaveProgram(program.value);
    programSaving.value = false;
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

  async function saveEx(ex: Ex): Promise<void> {
    if (!exes.value) return;
    const idx = exes.value.findIndex((e) => e.id === ex.id);
    if (idx !== -1) {
      const { id, ...fields } = ex;
      const updated = await apiUpdateEx(id, fields);
      exes.value[idx] = updated;
    } else {
      const { id: _, ...fields } = ex;
      const created = await apiCreateEx(fields);
      exes.value.push(created);
    }
    await putAllExes(exes.value);
  }

  async function removeEx(id: string): Promise<void> {
    if (!exes.value) return;
    await apiDeleteEx(id);
    const idx = exes.value.findIndex((e) => e.id === id);
    if (idx !== -1) exes.value.splice(idx, 1);
    await putAllExes(exes.value);
  }

  return {
    user,
    authInitialized,
    checkSession,
    login,
    register,
    logout,
    program,
    exes,
    programChanged,
    programSaving,
    init,
    saveProgram,
    workoutPlanIdByWorkoutId,
    getExById,
    saveEx,
    removeEx,
  };
});
