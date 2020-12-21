import { Router } from "express";

import * as taskCtrl from "../controllers/task.controller";

const router = Router();

router.get("/done", taskCtrl.findAllDoneTasks);
router.get("/:id", taskCtrl.findOneTask);
router.put("/:id", taskCtrl.updateTask);
router.delete("/:id", taskCtrl.deleteTask);
router.post("/", taskCtrl.createTask);
router.get("/", taskCtrl.findAllTasks);

export default router;
