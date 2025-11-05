import sqlite3 from "sqlite3";
import path from "path";
import Database from "better-sqlite3";
sqlite3.verbose();

let instance: Database.Database | null = null;
const dbFileName = "task.db";

const dbPATH = path.resolve(process.cwd(), "db", dbFileName);

export default function getDB(): Database.Database {
  if (!instance) {
    try {
      instance = new Database(dbPATH);
      console.log("Coneccion a la base de datos exitosa");
    } catch (e) {
      console.log("Error al conectarse a la base de datos", e);
      throw e;
    }
  }
  return instance;
}
