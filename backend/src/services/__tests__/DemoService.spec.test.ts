import { describe, it, expect, vi } from 'vitest';

import { Demo } from '@/models/Demo';
import { DemoService } from '../DemoService';

vi.mock('@/models/Demo');

describe('DemoService', () => {
  const mockDemoData = { id: '7335bd91-6e0a-4e1d-95dd-3b2c9732bb4c', name: 'ChatGPT' };

  it('should create a demo', async () => {
    (Demo.create as any).mockResolvedValue(mockDemoData);

    const result = await DemoService.create({ name: 'ChatGPT' });

    expect(Demo.create).toHaveBeenCalledWith({ name: 'ChatGPT' });
    expect(result).toEqual(mockDemoData);
  });

  it('should get a demo by ID', async () => {
    (Demo.findByPk as any).mockResolvedValue(mockDemoData);

    const result = await DemoService.getById('7335bd91-6e0a-4e1d-95dd-3b2c9732bb4c');

    expect(Demo.findByPk).toHaveBeenCalledWith('7335bd91-6e0a-4e1d-95dd-3b2c9732bb4c');
    expect(result).toEqual(mockDemoData);
  });

  it('should get all demos', async () => {
    (Demo.findAll as any).mockResolvedValue([mockDemoData]);

    const result = await DemoService.getAll();

    expect(Demo.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockDemoData]);
  });

  it('should update a demo by ID', async () => {
    const updatedData = { id: '1', name: 'Updated Demo' };
    const mockUpdate = {
      update: vi.fn().mockResolvedValue(updatedData),
    };

    (Demo.findByPk as any).mockResolvedValue(mockUpdate);

    const result = await DemoService.update('1', { name: 'Updated Demo' });

    expect(Demo.findByPk).toHaveBeenCalledWith('1');
    expect(mockUpdate.update).toHaveBeenCalledWith({ name: 'Updated Demo' });
    expect(result).toEqual(updatedData);
  });

  it('should throw an error when updating a non-existing demo', async () => {
    (Demo.findByPk as any).mockResolvedValue(null);

    await expect(DemoService.update('1', { name: 'Updated Demo' })).rejects.toThrow('Demo not found');
  });

  it('should delete a demo by ID', async () => {
    const mockDestroy = vi.fn();
    const mockDemo = {
      destroy: mockDestroy,
    };

    (Demo.findByPk as any).mockResolvedValue(mockDemo);

    await DemoService.delete('1');

    expect(Demo.findByPk).toHaveBeenCalledWith('1');
    expect(mockDestroy).toHaveBeenCalled();
  });

  it('should throw an error when deleting a non-existing demo', async () => {
    (Demo.findByPk as any).mockResolvedValue(null);

    await expect(DemoService.delete('1')).rejects.toThrow('Demo not found');
  });
});
