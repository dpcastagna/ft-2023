import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as authenticationController from "./controllers/authenticationController.js";
import * as mainController from "./controllers/mainController.js";
import * as accountController from "./controllers/accountController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", authenticationController.showRegistrationForm);
router.post("/auth/register", authenticationController.postRegistrationForm);
router.get("/auth/login", authenticationController.showLoginForm);
router.post("/auth/login", authenticationController.postLoginForm);

router.post("/accounts/:id/deposit", accountController.depositMoney);
router.post("/accounts/:id/withdraw", accountController.withdrawMoney);
router.get("/accounts/:id", accountController.showAccount);
router.get("/accounts", accountController.showAccounts);
router.post("/accounts", accountController.createAccount);

export { router };
