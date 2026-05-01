import { createRouter, createWebHistory } from "vue-router";
import { useMainStore } from "@/stores/mainStore";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import WorkoutPlanPage from "@/pages/WorkoutPlanPage.vue";
import WorkoutPage from "@/pages/WorkoutPage.vue";
import ExesPage from "@/pages/ExesPage.vue";
import ExFormPage from "@/pages/ExFormPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      redirect: "/home",
      children: [
        {
          path: "home",
          name: "home",
          component: HomePage,
          meta: { requiresAuth: true },
        },
        {
          path: "workout-plan/:id",
          name: "workout-plan",
          component: WorkoutPlanPage,
          meta: { requiresAuth: true },
        },
        {
          path: "workout/:id",
          name: "workout",
          component: WorkoutPage,
          meta: { requiresAuth: true },
        },
        {
          path: "exes",
          name: "exes",
          component: ExesPage,
          meta: { requiresAuth: true },
        },
        {
          path: "ex/create",
          name: "ex-create",
          component: ExFormPage,
          meta: { requiresAuth: true },
        },
        {
          path: "ex/:id/edit",
          name: "ex-edit",
          component: ExFormPage,
          meta: { requiresAuth: true },
        },
        {
          path: "settings",
          name: "settings",
          component: SettingsPage,
          meta: { requiresAuth: true },
        },
        {
          path: "login",
          name: "login",
          component: LoginPage,
        },
        {
          path: "register",
          name: "register",
          component: RegisterPage,
        },
        {
          path: ":pathMatch(.*)*",
          name: "not-found",
          component: NotFoundPage,
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const store = useMainStore();
  if (!store.authInitialized) await store.checkSession();

  if (to.meta.requiresAuth && !store.user) return { name: "login" };
  if ((to.name === "login" || to.name === "register") && store.user)
    return { name: "home" };
});

export default router;
