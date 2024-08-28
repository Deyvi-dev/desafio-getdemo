import { Demo } from '@/models/Demo';

interface CreateDemoData {
  name: string;
}

export class DemoService {
  public static async create(data: CreateDemoData): Promise<Demo> {
    return await Demo.create(data);
  }

  public static  async getById(id: string): Promise<Demo | null> {
    return await Demo.findByPk(id);
  }

  public static  async getAll(): Promise<Demo[]> {
    return await Demo.findAll();
  }

  public static  async update(id: string, data: Partial<CreateDemoData>): Promise<Demo> {
    const demo = await Demo.findByPk(id);
    if (demo) {
      return await demo.update(data);
    }
    throw new Error('Demo not found');
  }

  public static  async delete(id: string): Promise<void> {
    const demo = await Demo.findByPk(id);
    if (demo) {
      await demo.destroy();
    } else {
      throw new Error('Demo not found');
    }
  }
}
