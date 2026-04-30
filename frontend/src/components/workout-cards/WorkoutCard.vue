<script setup lang="ts">
  import { ref, computed } from "vue";
  import type { WorkoutData } from "@/types/workouts";
  import BaseCard from "@/components/ui/BaseCard.vue";
  import BaseBtn from "@/components/ui/BaseBtn.vue";
  import RemoveBtn from "@/components/ui/RemoveBtn.vue";
  import { useMainStore } from "@/stores/mainStore";

  const props = defineProps<{
    workout: WorkoutData;
    number: number;
    editMode?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "delete", workoutId: string): void;
  }>();

  const store = useMainStore();

  const planId = computed(() =>
    store.workoutPlanIdByWorkoutId(props.workout.workoutId),
  );

  const storedWorkout = computed(() =>
    store.program
      ?.find((p) => p.workoutPlanId === planId.value)
      ?.workouts.find((w) => w.workoutId === props.workout.workoutId),
  );

  const exNames = computed(() =>
    (storedWorkout.value?.exes ?? [])
      .map((e) => store.exes?.find((ex) => ex.id === e.exId)?.name ?? e.exId)
      .join(", "),
  );

  const date = new Date(props.workout.timestamp);
  const dateLabel = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });

  const showAddPicker = ref(false);
  const showRemovePicker = ref(false);

  const addExColumns = computed(() =>
    (store.exes ?? []).map((ex) => ({ text: ex.name, value: ex.id })),
  );

  const removeExColumns = computed(() =>
    (storedWorkout.value?.exes ?? []).map((e, i) => ({
      text: store.exes?.find((ex) => ex.id === e.exId)?.name ?? e.exId,
      value: i,
    })),
  );

  function handleDelete() {
    emit("delete", props.workout.workoutId);
  }

  function onAddExConfirm({
    selectedValues,
  }: {
    selectedValues: (string | number)[];
  }) {
    const exId = selectedValues[0] as string;
    storedWorkout.value?.exes.push({
      exId,
      sets: 0,
      reps: 0,
      weight: 0,
    });
    showAddPicker.value = false;
  }

  function onRemoveExConfirm({
    selectedValues,
  }: {
    selectedValues: (string | number)[];
  }) {
    const index = selectedValues[0] as number;
    storedWorkout.value?.exes.splice(index, 1);
    showRemovePicker.value = false;
  }
</script>

<template>
  <component
    :is="editMode ? 'div' : 'router-link'"
    :to="editMode ? undefined : `/workout/${workout.workoutId}`"
  >
    <BaseCard>
      <div class="font-bold text-gray-900 text-lg mb-1">
        Workout {{ number }}
      </div>
      <p class="text-sm text-gray-600 mb-2">{{ exNames }}</p>
      <div v-if="!editMode" class="text-xs text-gray-400">
        Last workout: {{ dateLabel }}
      </div>
      <div v-else class="flex gap-2 mt-2 flex-wrap">
        <RemoveBtn @remove="handleDelete" />
        <BaseBtn
          variant="primary"
          class="text-sm py-1 px-3"
          @click.stop="showAddPicker = true"
        >
          Add ex
        </BaseBtn>
        <BaseBtn
          variant="secondary"
          class="text-sm py-1 px-3"
          @click.stop="showRemovePicker = true"
        >
          Remove ex
        </BaseBtn>
      </div>
    </BaseCard>
  </component>

  <van-popup v-model:show="showAddPicker" position="bottom" round>
    <van-picker
      :columns="addExColumns"
      @confirm="onAddExConfirm"
      @cancel="showAddPicker = false"
    />
  </van-popup>

  <van-popup v-model:show="showRemovePicker" position="bottom" round>
    <van-picker
      :columns="removeExColumns"
      @confirm="onRemoveExConfirm"
      @cancel="showRemovePicker = false"
    />
  </van-popup>
</template>
