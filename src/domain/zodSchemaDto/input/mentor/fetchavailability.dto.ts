import { z } from "zod";

export const fetchavailabilityDto = z.object({
  mentorId: z
    .string()
    .refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
      message: "Invalid MongoDB ObjectId",
    }),
});
