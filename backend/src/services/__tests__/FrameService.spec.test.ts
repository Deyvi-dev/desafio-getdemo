import { describe, it, expect, vi } from 'vitest';
import { FrameService } from '@/services/FrameService';
import { Frame } from '@/models/Frame';


vi.mock('@/models/Frame');

describe('FrameService', () => {
  const mockFrameData = { id: '1', demoId: '7335bd91-6e0a-4e1d-95dd-3b2c9732bb4c', html: '<div>Test Frame</div>' };

  it('should get frames by demo ID', async () => {
    (Frame.findAll as any).mockResolvedValue([mockFrameData]);

    const result = await FrameService.getFramesByDemoId('7335bd91-6e0a-4e1d-95dd-3b2c9732bb4c');

    expect(Frame.findAll).toHaveBeenCalledWith({ where: { demoId: '7335bd91-6e0a-4e1d-95dd-3b2c9732bb4c' } });
    expect(result).toEqual([mockFrameData]);
  });

  it('should update a frame by ID', async () => {
    const updatedHtml = '<div>Updated Frame</div>';
    const mockUpdateResult = [1]; 

    (Frame.update as any).mockResolvedValue(mockUpdateResult);

    const result = await FrameService.updateFrame('1', updatedHtml);

    expect(Frame.update).toHaveBeenCalledWith({ html: updatedHtml }, { where: { id: '1' } });
    expect(result).toEqual(mockUpdateResult);
  });
});
