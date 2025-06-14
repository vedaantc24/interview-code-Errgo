/**
 * BONUS: Implement zod schema for model validation
 */


// export interface IProject {
//     id: string;
//     name: string;
//     description: string;
// }

import { z } from "zod";

// Zod schema 
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
});

export type IProject = z.infer<typeof ProjectSchema>;

export const ProjectInputSchema = ProjectSchema.omit({ id: true });
