import { sql } from "../database/database.js";

const add = async (content) => {
  await sql`INSERT INTO tickets (content, reported_on) VALUES (${ content }, NOW())`;
};

const findAll = async () => {
  return await sql`SELECT * FROM tickets ORDER BY id`;
};

const resolveTicket = async (id) => {
  await sql`UPDATE tickets SET resolved_on=NOW() WHERE id = (${id})`;
}

const deleteTicket = async (id) => {
  await sql`DELETE FROM tickets WHERE id = (${id})`;
}

export { add, findAll, resolveTicket, deleteTicket };