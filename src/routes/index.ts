import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import authRoute from "./authRoute.js";
import cardsRoute from "./cardsRoute.js";
import credentialsRoute from "./credentialRoute.js";
import secureNotesRoute from "./secureNotesRoute.js";
import wiFiRoute from "./wiFiRoute.js";

const router = Router();

router.use(authRoute);

router.use(tokenValidation);

router.use(credentialsRoute);
router.use(secureNotesRoute);
router.use(cardsRoute);
router.use(wiFiRoute);

//FIXME: Route for automatic tests
// router.post("/test", (req: Request, res: Response) => {
//   res.send(req.body);
// });

export default router;
