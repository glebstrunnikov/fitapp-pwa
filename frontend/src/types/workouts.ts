export interface ExData {
  exId: string;
  sets?: number;
  reps?: number;
  weight?: number; // kg
  comment?: string;
}
export interface WorkoutData {
  workoutId: string;
  timestamp: string; // ISO 8601
  exes: ExData[];
}
export interface WorkoutPlanData {
  workoutPlanId: string;
  workouts: WorkoutData[];
}
