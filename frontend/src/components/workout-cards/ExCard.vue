<script setup lang="ts">
  import { ref, computed } from "vue";
  import type { ExData } from "@/types/workouts";
  import { useMainStore } from "@/stores/mainStore";
  import BaseCard from "@/components/ui/BaseCard.vue";
  import BaseBtn from "@/components/ui/BaseBtn.vue";
  import NumberInput from "@/components/ui/NumberInput.vue";

  const props = defineProps<{
    exId: string;
    workoutId: string;
    workoutPlanId: string;
    active?: boolean;
    collapsed?: boolean;
  }>();

  const emit = defineEmits<{
    edit: [];
  }>();

  const store = useMainStore();

  const ex = computed(() => store.getExById(props.exId));

  const exData = computed<ExData>(() => {
    const plan = store.program?.find(
      (p) => p.workoutPlanId === props.workoutPlanId,
    );
    const workout = plan?.workouts.find((w) => w.workoutId === props.workoutId);
    return (
      workout?.exes.find((e) => e.exId === props.exId) ?? { exId: props.exId }
    );
  });

  const commentVisible = ref(!!exData.value.comment);
</script>

<template>
  <BaseCard>
    <div class="font-semibold text-gray-900 text-lg mb-4 text-center">
      {{ ex.name }}&nbsp;<button
        class="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-gray-400 text-xs font-bold leading-none hover:border-gray-600 hover:text-gray-600 align-middle"
      >
        ?
      </button>
    </div>

    <!-- Row 1: sets + edit btn -->
    <div class="flex mb-4">
      <div class="flex-1 flex flex-col items-center gap-1">
        <span class="text-sm text-gray-400">sets</span>
        <NumberInput v-if="active" v-model="exData.sets" />
        <span
          v-else
          class="text-2xl font-semibold text-gray-800 py-0.5 border border-transparent"
          >{{ exData.sets ?? "—" }}</span
        >
      </div>

      <div class="flex-1 flex items-center justify-center">
        <BaseBtn
          :variant="active ? 'secondary' : 'primary'"
          @click="$emit('edit')"
          >{{ active ? "Ok" : "Edit" }}</BaseBtn
        >
      </div>
    </div>

    <!-- Row 2: reps + weight -->
    <div class="flex mb-4">
      <div class="flex-1 flex flex-col items-center gap-1">
        <span class="text-sm text-gray-400">reps</span>
        <NumberInput v-if="active" v-model="exData.reps" />
        <span
          v-else
          class="text-2xl font-semibold text-gray-800 py-0.5 border border-transparent"
          >{{ exData.reps ?? "—" }}</span
        >
      </div>

      <div class="flex-1 flex flex-col items-center gap-1">
        <span class="text-sm text-gray-400">wght</span>
        <NumberInput v-if="active" v-model="exData.weight" />
        <span
          v-else
          class="text-2xl font-semibold text-gray-800 py-0.5 border border-transparent"
          >{{ exData.weight ?? "—" }}</span
        >
      </div>
    </div>

    <div v-if="!collapsed && commentVisible" class="mt-3">
      <textarea
        v-if="active"
        v-model="exData.comment"
        placeholder="Comment…"
        rows="2"
        class="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-2 py-1 resize-none focus:outline-none focus:border-blue-500 text-center"
      />
      <p
        v-else
        class="text-sm text-gray-500 px-2 py-1 border border-transparent rounded-md w-full text-center"
      >
        {{ exData.comment }}
      </p>
    </div>
    <div v-else-if="!collapsed && active" class="mt-3 flex justify-center">
      <BaseBtn variant="secondary" @click="commentVisible = true"
        >Add comment</BaseBtn
      >
    </div>
  </BaseCard>
</template>
