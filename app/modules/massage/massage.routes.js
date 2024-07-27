import { Router } from "express";
import { createMassage, deleteMassage, getAllMassages } from "./massage.controllers.js";
import { checkAuthenticatedUser } from "./massage.middlewares.js";

const massageRouter = Router();

massageRouter.route("/").get(getAllMassages).post(createMassage);
massageRouter.route("/:id").delete(checkAuthenticatedUser, deleteMassage);

export default massageRouter;