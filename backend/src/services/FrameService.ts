import { Frame } from '@/models/Frame';
import { DemoService } from './DemoService';
import randomName from '@/utils/randomName';

interface CreateFrameData {
  html: string;
  order: number; 
  demoId: string; 
}

class FrameService {

  public static async create(data: CreateFrameData[]): Promise<Frame[]> {
    const demoName = randomName;
    const demo = await DemoService.create({ name: demoName });

    const createdFrames: Frame[] = [];

    for (const frameData of data) {
      const frame = await Frame.create({
        html: frameData.html,
        order: frameData.order,
        demoId: demo.id,
      });
      createdFrames.push(frame);
    }

    return createdFrames;
  }

  public static async getFramesByDemoId(demoId: string) {
    return await Frame.findAll({
      where: { demoId },
    });
  }

  public static async updateFrame(id: string, html: string) {
    return await Frame.update({ html }, { where: { id } });
  }

  public static async deleteFrame(id: string): Promise<number> {
    const result = await Frame.destroy({
      where: { id }
    });
    return result;
  }
}

export { FrameService} 