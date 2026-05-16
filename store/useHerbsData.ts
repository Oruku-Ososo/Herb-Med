import { useQuery } from '@tanstack/react-query';
import { HERBS, Herb } from '@/constants/Herbs';
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

const initDb = async () => {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('herbs.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS herbs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      scientificName TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      benefits TEXT NOT NULL,
      usage TEXT NOT NULL,
      precautions TEXT NOT NULL,
      image TEXT NOT NULL
    );
  `);
  return db;
};

// Sync remote data (simulated) to local SQLite DB, creating an offline-first architecture
export const fetchAndSyncHerbs = async (): Promise<Herb[]> => {
  const database = await initDb();

  try {
    // 1. Attempt to fetch from "remote"
    const remoteHerbs = await new Promise<typeof HERBS>((resolve) => {
      setTimeout(() => {
        resolve(HERBS);
      }, 500);
    });

    // 2. Sync to local database
    for (const herb of remoteHerbs) {
      await database.runAsync(
        'INSERT OR REPLACE INTO herbs (id, name, scientificName, category, description, benefits, usage, precautions, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        herb.id, herb.name, herb.scientificName, herb.category, herb.description, JSON.stringify(herb.benefits), herb.usage, herb.precautions, herb.image
      );
    }
    return remoteHerbs;
  } catch (error) {
    console.log('Failed to fetch from remote, falling back to local DB', error);
    // 3. If remote fails (offline), load from local DB
    const result = await database.getAllAsync<any>('SELECT * FROM herbs');
    return result.map((row) => ({
      ...row,
      benefits: JSON.parse(row.benefits),
    }));
  }
};

export const useHerbsData = () => {
  return useQuery({
    queryKey: ['herbs'],
    queryFn: fetchAndSyncHerbs,
  });
};
