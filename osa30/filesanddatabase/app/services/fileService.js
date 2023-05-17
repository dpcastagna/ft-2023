import { sql } from "../database/database.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";

const lastUploadedId = async () => {
  const rows = await sql`SELECT MAX(id) as max_id FROM miniupload_files`;
  if (rows && rows.length == 1) {
    return rows[0].max_id;
  } else {
    return -1;
  }
};

const uploadNewFile = async () => {
  const pw = `${Math.floor(100000 * Math.random())}`;
  console.log(pw)
  const hash = await bcrypt.hash(pw);
  const result = await bcrypt.compare(pw, hash);
  console.log(result, hash)
  return pw;

}


export { lastUploadedId, uploadNewFile };
