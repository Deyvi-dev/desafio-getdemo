import { Request, Response } from 'express';

import { getErrorMessage } from '@/utils/errorHandler';
import { DemoService } from '@/services/DemoService';

class DemoController {
  static async create(req: Request, res: Response) {
  
    try {
      const { name } =  req.body;
      const demo = await DemoService.create({ name });
      res.status(201).json(demo);
    } catch (error) {
      res.status(400).json({ error: getErrorMessage(error) });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const demo = await DemoService.getById(req.params.id);
      if (!demo) {
        return res.status(404).json({ error: 'Demo not found' });
      }
      res.status(200).json(demo);
    } catch (error) {
      res.status(404).json({ error: getErrorMessage(error) });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const demos = await DemoService.getAll();
      res.status(200).json(demos);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const demo = await DemoService.update(req.params.id, req.body);
      res.status(200).json(demo);
    } catch (error) {
      res.status(403).json({ error: getErrorMessage(error) });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await DemoService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(403).json({ error: getErrorMessage(error) });
    }
  }
}

export default DemoController;
