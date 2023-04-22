import postgres from "https://deno.land/x/postgresjs@v3.3.3/mod.js";

const sql = postgres({});

const create = async (name, rating) => {
  return await sql`INSERT INTO songs (name, rating) VALUES (${ name }, ${ rating })`;
};

const findAll = async () => {
  return await sql`SELECT * FROM songs`;
};

const deleteById = async (id) => {
  return await sql`DELETE FROM songs WHERE id = ${ id }`;
};

export { create, findAll, deleteById };