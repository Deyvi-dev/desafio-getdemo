import { Router } from "express";
import { FrameController } from "@/controllers/FrameController";

const router = Router();

router.post('/frames',      FrameController.createFrame);
router.get('/frames/:demoId', FrameController.getFramesByDemoId);
router.put('/frames/:id',   FrameController.updateFrame);
router.delete("/frames/:id", FrameController.deleteFrame);
export default router;