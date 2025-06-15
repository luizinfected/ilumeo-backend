import { Router } from "express";

import { UserController } from "./controllers/userController";
import { RegistersController } from "./controllers/registerController";


const router = Router()
router.post('/user', UserController.create)
router.get('/code/:code', UserController.findByCode)

router.post('/registers', RegistersController.create)
router.get('/registers/:userCode', RegistersController.getAllByUser)


export default router