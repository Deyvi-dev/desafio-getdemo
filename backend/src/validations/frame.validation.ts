import { z } from 'zod';


export const createFrameSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const getFrameSchema = z.object({
  id: z.string().min(1, "ID is required"),
})
export const getFrameByDemoSchema = z.object({
  demoId: z.string().min(1, "ID is required"),
})
export const updateFrameSchema = z.object({
  html: z.string(),
  id: z.string().min(1, "ID is required"),
});


type CreateFrameInput = z.TypeOf<typeof createFrameSchema>;
type UpdateFrameInput = z.TypeOf<typeof updateFrameSchema>;
type GetFrameInput = z.TypeOf<typeof getFrameSchema>;
type GetFrameByDemoInput = z.TypeOf<typeof getFrameByDemoSchema>;
export type { CreateFrameInput, UpdateFrameInput, GetFrameInput, GetFrameByDemoInput }