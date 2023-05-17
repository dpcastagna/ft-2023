import { sql } from "../database/database.js";

const addItem = async (listId, name) => {
  await sql`INSERT INTO
    shopping_list_items (shopping_list_id, name)
    VALUES (${listId}, ${name})`;
};

const findUncollected = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${ listId } AND collected = false ORDER BY name`;

  if (rows && rows.length > 0) {
    //console.log(rows)
    return rows;
  }

  return false;
};

const findCollected = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${ listId } AND collected = true ORDER BY name`;

  if (rows && rows.length > 0) {
    //console.log(rows)
    return rows;
  }

  return false;
};

const collectItem = async (id) => {
  await sql`UPDATE shopping_list_items
    SET collected = true WHERE id = ${ id }`;
};

const findAllItems = async () => {
  return await sql`SELECT COUNT(*) FROM shopping_list_items`;
};

export { addItem, findUncollected, findCollected, collectItem, findAllItems };