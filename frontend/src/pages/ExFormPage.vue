<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useMainStore } from "@/stores/mainStore";
  import BaseBtn from "@/components/ui/BaseBtn.vue";

  const route = useRoute();
  const router = useRouter();
  const store = useMainStore();

  const isEdit = !!route.params.id;
  const exId = isEdit ? (route.params.id as string) : crypto.randomUUID();

  const existingEx = isEdit ? store.exes?.find((e) => e.id === exId) : null;

  const name = ref(existingEx?.name ?? "");
  const description = ref(existingEx?.description ?? "");

  async function handleSave() {
    await store.saveEx({
      id: exId,
      name: name.value.trim(),
      description: description.value.trim() || undefined,
    });
    router.push("/exes");
  }

  function handleCancel() {
    router.push("/exes");
  }
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <h1 class="text-xl font-bold text-gray-900">
      {{ isEdit ? "Edit" : "Create" }} Ex
    </h1>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-semibold text-gray-600">ID</label>
      <p class="text-sm text-gray-400 break-all">{{ exId }}</p>
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-semibold text-gray-700" for="ex-name"
        >Name</label
      >
      <input
        id="ex-name"
        v-model="name"
        type="text"
        class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
        placeholder="Exercise name"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-semibold text-gray-700" for="ex-description"
        >Description</label
      >
      <textarea
        id="ex-description"
        v-model="description"
        rows="4"
        class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
        placeholder="Optional description"
      />
    </div>

    <div class="flex gap-2 mt-2">
      <BaseBtn variant="primary" @click="handleSave">Save</BaseBtn>
      <BaseBtn variant="secondary" @click="handleCancel">Cancel</BaseBtn>
    </div>
  </div>
</template>
