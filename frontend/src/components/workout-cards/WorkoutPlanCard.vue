<script setup lang="ts">
  import { computed } from "vue";
  import type { WorkoutPlanData } from "@/types/workouts";
  import BaseCard from "@/components/ui/BaseCard.vue";
  import RemoveBtn from "@/components/ui/RemoveBtn.vue";
  import { useMainStore } from "@/stores/mainStore";

  const props = defineProps<{
    plan: WorkoutPlanData;
    editMode?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "delete", planId: string): void;
  }>();

  const store = useMainStore();

  const exNames = computed(() => {
    const ids = new Set<string>();
    props.plan.workouts.forEach((w) => w.exes.forEach((e) => ids.add(e.exId)));
    return [...ids]
      .map((id) => store.exes?.find((ex) => ex.id === id)?.name ?? id)
      .join(", ");
  });

  function handleDelete() {
    emit("delete", props.plan.workoutPlanId);
  }
</script>

<template>
  <component
    :is="editMode ? 'div' : 'router-link'"
    :to="editMode ? undefined : `/workout-plan/${plan.workoutPlanId}`"
  >
    <BaseCard>
      <div class="font-bold text-gray-900 text-lg mb-1">
        {{ plan.workouts.length }} workout{{
          plan.workouts.length !== 1 ? "s" : ""
        }}
      </div>
      <p class="text-sm text-gray-600 mb-2">{{ exNames }}</p>
      <div v-if="editMode" class="flex gap-2 mt-2">
        <RemoveBtn @remove="handleDelete" />
      </div>
    </BaseCard>
  </component>
</template>
