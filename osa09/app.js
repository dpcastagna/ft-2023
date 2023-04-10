import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import postgres from "https://deno.land/x/postgresjs@v3.3.3/mod.js";

const sql = postgres({});
const handleRequest = async (request) => {
  const rows = await sql`SELECT COUNT(*) AS c FROM users`;
  return new Response(`Meaning of life: ${rows[0].c}`);
};
serve(handleRequest, { port: 7777 });