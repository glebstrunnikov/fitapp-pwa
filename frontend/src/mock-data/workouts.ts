import type { ExData, WorkoutData, WorkoutPlanData } from "../types/workouts";

export const mockWorkoutPlans: WorkoutPlanData[] = [
  {
    workoutPlanId: "plan-1",
    workouts: [
      {
        workoutId: "workout-1-1",
        timestamp: "2026-04-07T10:00:00.000Z",
        exes: [
          {
            exId: "ex-2",
            sets: 4,
            reps: 8,
            weight: 80,
            comment: "Акцент на сжатии грудных в верхней точке",
          },
          { exId: "ex-13", sets: 3, reps: 10, weight: 26 },
          { exId: "ex-5", sets: 3, reps: 8, weight: 50 },
          { exId: "ex-10", sets: 3, reps: 12, weight: 30 },
          { exId: "ex-14", sets: 3, reps: 15, weight: 15 },
        ] satisfies ExData[],
      },
      {
        workoutId: "workout-1-2",
        timestamp: "2026-04-09T11:30:00.000Z",
        exes: [
          {
            exId: "ex-3",
            sets: 4,
            reps: 5,
            weight: 120,
            comment: "Хорошо разомнитесь перед рабочими подходами",
          },
          { exId: "ex-4", sets: 4, reps: 8 },
          { exId: "ex-8", sets: 3, reps: 10, weight: 55 },
          { exId: "ex-12", sets: 3, reps: 12, weight: 50 },
          { exId: "ex-9", sets: 3, reps: 12, weight: 14 },
        ] satisfies ExData[],
      },
      {
        workoutId: "workout-1-3",
        timestamp: "2026-04-11T09:15:00.000Z",
        exes: [
          {
            exId: "ex-1",
            sets: 4,
            reps: 6,
            weight: 100,
            comment: "Приседать до глубины на каждом повторении",
          },
          { exId: "ex-6", sets: 3, reps: 10, weight: 70 },
          { exId: "ex-11", sets: 3, reps: 12, weight: 120 },
          { exId: "ex-7", sets: 3, reps: 10, weight: 20 },
          { exId: "ex-15", sets: 3 },
        ] satisfies ExData[],
      },
    ] satisfies WorkoutData[],
  },
  {
    workoutPlanId: "plan-2",
    workouts: [
      {
        workoutId: "workout-2-1",
        timestamp: "2026-04-14T08:00:00.000Z",
        exes: [
          { exId: "ex-1", sets: 5, reps: 5, weight: 90 },
          { exId: "ex-2", sets: 5, reps: 5, weight: 70 },
          { exId: "ex-12", sets: 3, reps: 8, weight: 45 },
        ] satisfies ExData[],
      },
      {
        workoutId: "workout-2-2",
        timestamp: "2026-04-16T08:00:00.000Z",
        exes: [
          { exId: "ex-1", sets: 5, reps: 5, weight: 92.5 },
          { exId: "ex-5", sets: 5, reps: 5, weight: 45 },
          {
            exId: "ex-3",
            sets: 1,
            reps: 5,
            weight: 110,
            comment: "Становая только раз в неделю",
          },
        ] satisfies ExData[],
      },
    ] satisfies WorkoutData[],
  },
];
