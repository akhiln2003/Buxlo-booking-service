import { z } from "zod";

export const deleteSlotDto = z.object({
  id: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
    message: "Invalid MongoDB ObjectId",
  }),
});
