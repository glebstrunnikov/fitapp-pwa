import { openDB, type IDBPDatabase } from "idb";
import { toRaw } from "vue";
import type { Ex } from "@/types/exes";
import type { WorkoutPlanData } from "@/types/workouts";

const DB_NAME = "fitapp-db";
const DB_VERSION = 2;

export interface FitAppDB {
  exes: {
    key: string;
    value: Ex;
  };
  program: {
    key: string;
    value: { id: string; data: WorkoutPlanData[] };
  };
}

const PROGRAM_KEY = "data";

let dbPromise: Promise<IDBPDatabase<FitAppDB>> | null = null;

export function getDB(): Promise<IDBPDatabase<FitAppDB>> {
  if (!dbPromise) {
    dbPromise = openDB<FitAppDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("exes")) {
          db.createObjectStore("exes", { keyPath: "id" });
        }
        if (db.objectStoreNames.contains("program")) {
          db.deleteObjectStore("program");
        }
        db.createObjectStore("program", { keyPath: "id" });
      },
    });
  }
  return dbPromise;
}

export async function getAllExes(): Promise<Ex[]> {
  const db = await getDB();
  return db.getAll("exes");
}

export async function getAllProgram(): Promise<WorkoutPlanData[]> {
  const db = await getDB();
  const record = await db.get("program", PROGRAM_KEY);
  return record?.data ?? [];
}

export async function putAllProgram(plans: WorkoutPlanData[]): Promise<void> {
  const db = await getDB();
  const raw = structuredClone(toRaw(plans));
  await db.put("program", { id: PROGRAM_KEY, data: raw });
}
