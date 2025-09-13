import { RRule, Weekday } from "rrule";
import { BadRequest } from "@buxlo/common";
import {
  ICreateRecurringSlotUseCase,
  ICreateRecurringSlotUseCaseProps,
} from "../../interface/mentor/ICreateRecurringSlotUseCase";
import { AvailabilityEntities } from "../../../domain/entities/availability.entities";
import { IAvailabilityRepository } from "../../../infrastructure/@types/IAvailabilityRepository";
import {
  AvailabilityMapper,
  AvailabilityResponseDto,
} from "../../dto/availabilityResponse.dto";

export class CreateRecurringSlotUseCase implements ICreateRecurringSlotUseCase {
  constructor(private _availabilityRepo: IAvailabilityRepository) {}

  async execute(
    data: ICreateRecurringSlotUseCaseProps
  ): Promise<AvailabilityResponseDto[]> {
    try {
      const { mentorId, days, startTime, duration, startDate, endDate } = data;

      const start = new Date(startDate);
      const end = new Date(endDate);

      // Map days -> rrule weekdays
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

      // Build raw slot entities
      const slotsToCreate: AvailabilityEntities[] = matchingDates.map(
        (date) => ({
          mentorId,
          date: date.toISOString().split("T")[0],
          description: data.description,
          startTime,
          duration,
          status: "available",
          isBooked: false,
          salary: data.salary,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      // Save in DB
      const createdSlots = await Promise.all(
        slotsToCreate.map((slot) =>
          this._availabilityRepo.createRecurring(slot)
        )
      );

      // Filter nulls + map to DTOs
      return createdSlots
        .filter((slot): slot is AvailabilityEntities => slot !== null)
        .map((slot) => AvailabilityMapper.toDto(slot));
    } catch (error) {
      console.error("Error from CreateRecurringSlotUseCase:", error);
      throw new BadRequest("Failed to create recurring slots, try again later");
    }
  }
}
