import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as formController from "./controllers/formController.js";

const router = new Router();

router.get("/", formController.viewForm);
router.post("/", formController.sendFile);

export { router };
