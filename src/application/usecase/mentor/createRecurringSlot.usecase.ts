import { RRule, Weekday } from "rrule";
import { BadRequest } from "@buxlo/common";
import { IcreateRecurringSlotUseCase } from "../../interface/mentor/IcreateRecurringSlotUseCase";
import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";
import { IavailabilityRepository } from "../../../infrastructure/@types/IavailabilityRepository";
import { IrecurringData } from "../../../domain/interfaces/IrecurringData";

export class CreateRecurringSlotUseCase implements IcreateRecurringSlotUseCase {
  constructor(private availabilityRepo: IavailabilityRepository) {}

  async execute(data: IrecurringData): Promise<AvailabilityEntities[]> {
    try {
      const { mentorId, days, startTime, duration, startDate, endDate } = data;

      const start = new Date(startDate);
      const end = new Date(endDate);

      // Convert day strings to RRule weekdays
      const rruleDayMap: Record<string, Weekday> = {
        Sunday: RRule.SU,
        Monday: RRule.MO,
        Tuesday: RRule.TU,
        Wednesday: RRule.WE,
        Thursday: RRule.TH,
        Friday: RRule.FR,
        Saturday: RRule.SA,
      };

      const byweekday = days.map((day) => rruleDayMap[day]);

      const rule = new RRule({
        freq: RRule.DAILY,
        dtstart: start,
        until: end,
        byweekday,
      });

      const matchingDates = rule.all(); 

      const slotsToCreate: AvailabilityEntities[] = matchingDates.map(
        (date) => ({
          mentorId,
          date: date.toISOString().split("T")[0],
          description:  data.description,
          startTime,
          duration,
          status: "available",
          isBooked: false,
          salary: data.salary,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      const createdSlots = await Promise.all(
        slotsToCreate.map((slot: AvailabilityEntities) =>
          this.availabilityRepo.createRecurring(slot)
        )
      );

      return createdSlots.filter(
        (slot): slot is AvailabilityEntities => slot !== null
      );
    } catch (error) {
      console.error("Error from CreateRecurringSlotUseCase:", error);
      throw new BadRequest("Failed to create recurring slots, try again later");
    }
  }
}
