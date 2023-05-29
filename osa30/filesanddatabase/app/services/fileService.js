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

const uploadNewFile = async (fileDetails) => {
  const pw = `${Math.floor(100000 * Math.random())}`;
  // console.log('pw: ', pw, fileDetails)
  const fileContents = await Deno.readAll(await Deno.open(fileDetails.filename));
  // console.log('filecontents: ', fileContents, fileDetails);
  const hash = await bcrypt.hash(pw);
  const result = await bcrypt.compare(pw, hash);
  const base64Encoded = base64.fromUint8Array(fileContents);
  // console.log(result, hash, base64Encoded);
  await sql`INSERT INTO miniupload_files(name, type, password, data) VALUES (${fileDetails.originalName}, ${fileDetails.contentType}, ${hash}, ${base64Encoded})`;
  return pw;
}

const retrieveFile = async (password, id) => {
  const rows = await sql`SELECT * FROM miniupload_files WHERE id = ${id}`;
  // console.log(rows[0]);
  if (rows.length < 1) {
    return false
  }
  const hash = rows[0].password;
  const result = await bcrypt.compare(password, hash);
  // console.log(result, password, hash)
  if (result) {
    const fileObject = {
      name: rows[0].name,
      type: rows[0].type,
      data: base64.toUint8Array(rows[0].data)
    };
    return fileObject;
  }
  return false
}


export { lastUploadedId, uploadNewFile, retrieveFile };
