//import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import * as accountService from "../../services/accountService.js";

const showAccounts = async ({ request, response , state, render }) => {
  const user = await state.session.get("user");
  const authenticated = await state.session.get("authenticated");
  console.log(user, authenticated);
  if (!authenticated) {
    response.status = 401;
    return;
  }

  const accounts = await accountService.findAccountsWithId(user.id);
  user.accounts = accounts;
  console.log(user);
  await state.session.set("user", user)
  render("accounts.eta", user);
};

const showAccount = async ({ params, request, response , state, render }) => {
  const userId = (await state.session.get("user")).id;
  const rows = await accountService.findOneAccountWithIds(params.id, userId);
  if (rows.length > 0) {
    const obj = rows[0];
    render("account.eta", obj);
  } else {
    response.status = 401;
  }
};

const createAccount = async ({ request, response , state, render }) => {
  const user = await state.session.get("user");
  console.log(user);
  if (!user) {
    response.status = 401;
    return;
  }
  const body = request.body();
  const params = await body.value;

  const name = params.get("name");
  await accountService.addAccount(name, user.id)
  response.redirect("/accounts");
};

const depositMoney = async ({ params, request, response , state, render }) => {
  const userId = (await state.session.get("user")).id;
  const body = request.body();
  const value = await body.value;

  const amount = Number(value.get("amount"));
  console.log(amount)
  const rows = await accountService.deposit(params.id, userId, amount);
  console.log("accountcontroller: ", rows);
  if (rows === true) {
    response.redirect("/accounts");
  } else {
    response.status = 401;
  }
};

const withdrawMoney = async ({ params, request, response , state, render }) => {
  const userId = (await state.session.get("user")).id;
  const body = request.body();
  const value = await body.value;

  const amount = Number(value.get("amount"));
  console.log(amount)
  const rows = await accountService.withdraw(params.id, userId, amount);
  console.log("accountcontroller: ", rows);
  if (rows === true) {
    response.redirect("/accounts");
  } else {
    response.status = 401;
  }
};

export {
  showAccounts,
  showAccount,
  createAccount,
  depositMoney,
  withdrawMoney,
};
