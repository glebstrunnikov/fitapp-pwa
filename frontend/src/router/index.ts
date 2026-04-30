import { createRouter, createWebHistory } from "vue-router";
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
        },
        {
          path: "workout-plan/:id",
          name: "workout-plan",
          component: WorkoutPlanPage,
        },
        {
          path: "workout/:id",
          name: "workout",
          component: WorkoutPage,
        },
        {
          path: "exes",
          name: "exes",
          component: ExesPage,
        },
        {
          path: "ex/create",
          name: "ex-create",
          component: ExFormPage,
        },
        {
          path: "ex/:id/edit",
          name: "ex-edit",
          component: ExFormPage,
        },
        {
          path: "settings",
          name: "settings",
          component: SettingsPage,
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

export default router;
