<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useMainStore } from "@/stores/mainStore";
  import BaseCard from "@/components/ui/BaseCard.vue";
  import BaseBtn from "@/components/ui/BaseBtn.vue";

  const router = useRouter();
  const store = useMainStore();

  const email = ref("");
  const password = ref("");
  const error = ref("");
  const loading = ref(false);

  async function handleLogin() {
    error.value = "";
    loading.value = true;
    try {
      await store.login(email.value, password.value);
      router.push({ name: "home" });
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <div class="flex flex-col gap-6 pt-12">
    <h1 class="text-2xl font-bold text-blue-900 text-center">Fitapp</h1>

    <BaseCard>
      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="your@email.com"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="Password"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        <BaseBtn type="submit" :disabled="loading" class="w-full">
          {{ loading ? "Logging in…" : "Log in" }}
        </BaseBtn>
      </form>
    </BaseCard>

    <p class="text-center text-sm text-gray-500">
      No account?
      <router-link to="/register" class="text-blue-700 font-medium"
        >Register</router-link
      >
    </p>
  </div>
</template>
