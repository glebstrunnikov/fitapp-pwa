<script setup lang="ts">
  import { ref } from "vue";
  import BaseBtn from "@/components/ui/BaseBtn.vue";

  const emit = defineEmits<{
    (e: "remove"): void;
  }>();

  const confirm = ref(false);

  function handleClick() {
    if (!confirm.value) {
      confirm.value = true;
      return;
    }
    emit("remove");
  }
</script>

<template>
  <BaseBtn
    :variant="confirm ? 'danger' : 'secondary'"
    class="text-sm py-1 px-3"
    @click.stop="handleClick"
  >
    {{ confirm ? "Really?" : "Delete" }}
  </BaseBtn>
</template>
