import { sql } from "../database/database.js";

const create = async (sender, message) => {
  return await sql`INSERT INTO messages (sender, message) VALUES (${ sender }, ${ message })`;
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

const findLatest = async () => {
  return await sql`SELECT * FROM messages ORDER BY id DESC LIMIT 5`;
}

export { create, findAll, deleteById, findAverage, findLatest };