import { z } from "zod";

export const lockSlotDto = z.object({
  slotId: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
    message: "Invalid slotId",
  }),
  userId: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
    message: "Invalid userId",
  }),
});
