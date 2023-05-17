import { sql } from "../database/database.js";

const deactivateById = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
};

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllNonCompletedLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const findAllLists = async () => {
  //console.log(await sql`SELECT COUNT(*) FROM shopping_lists`)
  return await sql`SELECT COUNT(*) FROM shopping_lists`;
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, name: "Unknown" };
};

export { deactivateById, create, findAllNonCompletedLists, findAllLists, findById };