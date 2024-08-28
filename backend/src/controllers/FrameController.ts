import { Request, Response } from "express";
import { FrameService } from "@/services/FrameService";
import {
  getFrameByDemoSchema,
  updateFrameSchema,
} from "@/validations/frame.validation";

export class FrameController {


static async createFrame(req: Request, res: Response) {
  const { frames } = req.body;
  try {
    const frame = await FrameService.create(frames);
    res.json(frame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create frame" });
  }
}
  static async getFramesByDemoId(req: Request, res: Response) {
    try {
      const { demoId } = getFrameByDemoSchema.parse(req.params);
      const frames = await FrameService.getFramesByDemoId(demoId);
      res.json(frames);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch frames" });
    }
  }

  static async updateFrame(req: Request, res: Response) {
    const { id } = req.params;
    const { html } = req.body;
    const validation = updateFrameSchema.safeParse({ id, html });

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }
    try {
      const frame = await FrameService.updateFrame(id, html);
      res.json(frame);
    } catch (error) {
      res.status(500).json({ error: "Failed to update frame" });
    }
  }

  static async deleteFrame(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await FrameService.deleteFrame(id);
      if (result > 0) {
        res.json({ message: "Frame deleted successfully" });
      } else {
        res.status(404).json({ error: "Frame not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete frame" });
    }
  }
}
