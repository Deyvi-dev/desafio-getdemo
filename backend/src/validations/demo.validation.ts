import { z } from 'zod';


export const createDemoSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const getDemoSchema = z.object({
  id: z.string().min(1, "ID is required"),
})

export const updateDemoSchema = z.object({
  name: z.string().optional(),
  id: z.string().min(1, "ID is required"),
});


type CreateDemoInput = z.TypeOf<typeof createDemoSchema>;
type UpdateDemoInput = z.TypeOf<typeof updateDemoSchema>;
type GetDemoInput = z.TypeOf<typeof getDemoSchema>;
export type { CreateDemoInput, UpdateDemoInput, GetDemoInput }