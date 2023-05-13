import { sql } from "../database/database.js";

const create = async (measurement) => {
  return await sql`INSERT INTO measurements (measurement) VALUES (${ measurement })`;
};

const findAll = async () => {
  return await sql`SELECT * FROM measurements`;
};

const deleteById = async (id) => {
  return await sql`DELETE FROM measurements WHERE id = ${ id }`;
};

const findAverage = async () => {
  return await sql`SELECT AVG(measurement) FROM measurements WHERE measurement > 0 AND measurement < 1001`;
} 

export { create, findAll, deleteById, findAverage };