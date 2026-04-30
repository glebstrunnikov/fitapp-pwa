<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();
  const isEdit = !!route.params.id;
</script>

<template>
  <div>{{ isEdit ? "Edit" : "Create" }} Ex</div>
</template>
