import { sql } from "../database/database.js";

const findUsersWithEmail = async (email) => {
  return await sql`SELECT * FROM users WHERE email = ${ email }`;
};

const addAccount = async (name, user_id) => {
  await sql`INSERT INTO accounts (name, balance, user_id) VALUES (${ name }, 0, ${ user_id })`;
};

const findAccountsWithId = async (user_id) => {
  return await sql`SELECT * FROM accounts WHERE user_id = ${ user_id } ORDER BY id`;
};

const findOneAccountWithIds = async (accountId, userId) => {
  return await sql`SELECT * FROM accounts WHERE id = ${accountId} AND user_id = ${userId}`;
};

const deposit = async (accountId, userId, amount) => {
  const account = await sql`SELECT * FROM accounts WHERE id = ${accountId} AND user_id = ${userId}`;
  console.log("accountservice: ",account);
  if (account.length > 0) {
    await sql`UPDATE accounts SET balance = balance + ${amount} WHERE id = ${accountId}`;
    return true;
  } else {
    return false;
  }
}

const withdraw = async (accountId, userId, amount) => {
  const account = await sql`SELECT * FROM accounts WHERE id = ${accountId} AND user_id = ${userId}`;
  console.log("accountservice: ",account);
  if (account.length > 0) {
    if (Number(account[0].balance) - amount < 0) {
      return false
    }
    await sql`UPDATE accounts SET balance = balance - ${amount} WHERE id = ${accountId}`;
    return true;
  } else {
    return false;
  }
}

export { addAccount, findUsersWithEmail, findAccountsWithId, findOneAccountWithIds, deposit, withdraw };
