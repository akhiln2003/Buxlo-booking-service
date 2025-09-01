import { BadRequest } from "@buxlo/common";
import { AvailabilityEntities } from "../../domain/entities/availabilityEntities";
import { AvailabilitySchema } from "../database/mongodb/schema/availability.schema";
import { IavailabilityRepository } from "../@types/IavailabilityRepository";

export class AvailabilityRepository implements IavailabilityRepository {
  async create(data: AvailabilityEntities): Promise<AvailabilityEntities> {
    try {
      const timeToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const newStart = timeToMinutes(data.startTime);
      const newEnd = newStart + data.duration;

      const existingSlots = await AvailabilitySchema.find({
        mentorId: data.mentorId,
        date: data.date,
      });

      for (const slot of existingSlots) {
        const existingStart = timeToMinutes(slot.startTime);
        const existingEnd = existingStart + slot.duration;

        const isConflict = newStart < existingEnd && existingStart < newEnd;
        if (isConflict) {
          throw new BadRequest(
            `Time conflict with existing slot from ${
              slot.startTime
            } to ${String(
              Math.floor(existingEnd / 60)
                .toString()
                .padStart(2, "0")
            )}:${(existingEnd % 60).toString().padStart(2, "0")}`
          );
        }
      }

      const newAvailability = AvailabilitySchema.build(data);
      const saveData = await newAvailability.save();
      return saveData;
    } catch (error: any) {
      throw new BadRequest(`db error: ${error.message}`);
    }
  }

  async findById(id: string): Promise<AvailabilityEntities | null> {
    try {
      const availability = await AvailabilitySchema.findById(id);
      return availability ? availability : null;
    } catch (error: any) {
      throw new BadRequest(`Failed to get userDetails: ${error.message}`);
    }
  }

  async update(
    id: string,
    data: Partial<AvailabilityEntities>
  ): Promise<AvailabilityEntities> {
    try {
      const updatedData = await AvailabilitySchema.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );

      if (!updatedData) throw new BadRequest("Faild to find slot");
      return updatedData;
    } catch (error: any) {
      // customLogger.error(`db error to update user ${userId}: ${error.message}`);
      throw new BadRequest(
        `Failed to update userProfileData: ${error.message}`
      );
    }
  }

  async createRecurring(
    data: AvailabilityEntities
  ): Promise<AvailabilityEntities | null> {
    try {
      const timeToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const newStart = timeToMinutes(data.startTime);
      const newEnd = newStart + data.duration;

      const existingSlots = await AvailabilitySchema.find({
        mentorId: data.mentorId,
        date: data.date,
      });

      const hasConflict = existingSlots.some((slot) => {
        const existingStart = timeToMinutes(slot.startTime);
        const existingEnd = existingStart + slot.duration;
        return newStart < existingEnd && existingStart < newEnd;
      });

      if (hasConflict) {
        return null;
      }

      const newAvailability = AvailabilitySchema.build(data);
      const saveData = await newAvailability.save();
      return saveData;
    } catch (error: any) {
      return null;
    }
  }

  async findByMentorId(mentorId: string): Promise<AvailabilityEntities[]> {
    try {
      const slots = await AvailabilitySchema.find({ mentorId });
      return slots;
    } catch (error: any) {
      console.error("Error fetching availabilities:", error);
      throw new BadRequest(`Failed to fetch availabilities: ${error.message}`);
    }
  }

  async getAverageSalary(mentorId: string): Promise<number> {
    try {
      const result = await AvailabilitySchema.aggregate([
        {
          $match: {
            mentorId,
          },
        },
        {
          $group: {
            _id: null,
            averageSalary: { $avg: "$salary" },
          },
        },
      ]);

      return result[0]?.averageSalary ?? 0;
    } catch (error: any) {
      console.error("Error calculating average salary:", error);
      throw new BadRequest(
        `Failed to calculate average salary: ${error.message}`
      );
    }
  }
}
