import { z } from "zod";

export const createOneSlotDto = z.object({
  mentorId: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
    message: "Invalid MongoDB ObjectId",
  }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  startTime: z
    .string()
    .refine((time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time), {
      message: "Invalid start time format (expected HH:mm)",
    }),
  duration: z.number({
    required_error: "Duration is required",
    invalid_type_error: "Duration must be a number",
  }),
  isBooked: z.boolean({
    required_error: "isBooked is required",
    invalid_type_error: "isBooked must be a boolean",
  }),
  salary: z
    .number({
      required_error: "Salary is required",
      invalid_type_error: "Salary must be a number",
    })
    .min(50, "Salary must be at least 50"),
  description: z.string().optional(),
  status: z.enum(["available", "booked", "cancelled", "pending"], {
    errorMap: () => ({
      message: "Status must be one of: available, booked, cancelled, pending",
    }),
  }),
});
