import postgres from "https://deno.land/x/postgresjs@v3.3.3/mod.js";

const sql = postgres({});

const create = async (name) => {
  return await sql`INSERT INTO names (name) VALUES (${ name })`;
};

const findAll = async () => {
  return await sql`SELECT * FROM names`;
};

const deleteById = async (id) => {
  return await sql`DELETE FROM names WHERE id = ${ id }`;
};

export { create, findAll, deleteById };