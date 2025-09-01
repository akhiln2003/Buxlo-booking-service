import { z } from "zod";

export const AvailabilityResponseDto = z.object({
  id: z.string(),
  mentorId: z.string(),
  date: z.string(), 
  description: z.string(),
  startTime: z.string(), 
  duration: z.number(),
  salary: z.number(),
  status: z.string(),
  isBooked: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AvailabilityResponseDto = z.infer<typeof AvailabilityResponseDto>;

export class AvailabilityMapper {
  static toDto(slot: any): AvailabilityResponseDto {
    return AvailabilityResponseDto.parse({
      id: slot._id?.toString() ?? slot.id,
      mentorId: slot.mentorId,
      date: slot.date, 
      description: slot.description,
      startTime: slot.startTime,
      duration: slot.duration,
      salary: slot.salary,
      status: slot.status,
      isBooked: slot.isBooked,
      createdAt: new Date(slot.createdAt),
      updatedAt: new Date(slot.updatedAt),
    });
  }
}
