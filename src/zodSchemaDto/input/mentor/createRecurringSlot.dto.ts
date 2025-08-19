import { z } from "zod";

const validDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const createRecurringSlotDto = z
  .object({
    mentorId: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
      message: "Invalid MongoDB ObjectId",
    }),
    description: z.string().optional(),
    duration: z.number({
      required_error: "Duration is required",
      invalid_type_error: "Duration must be a number",
    }),
    startTime: z
      .string()
      .refine((time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time), {
        message: "Invalid start time format (expected HH:mm)",
      }),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid start date format",
    }),
    salary: z
      .number({
        required_error: "Salary is required",
        invalid_type_error: "Salary must be a number",
      })
      .min(50, "Salary must be at least 50"),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid end date format",
    }),
    days: z
      .array(z.enum(validDays))
      .min(1, { message: "At least one day must be selected" })
      .max(7, { message: "Cannot select more than 7 days" }),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    path: ["endDate"],
    message: "End date must be greater than or equal to start date",
  });
