import { z } from "zod";

/** Project */

export const projectSchemas = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export type Project = z.infer<typeof projectSchemas>;
export type ProjecFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;
