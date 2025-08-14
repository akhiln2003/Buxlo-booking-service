import { BadRequest } from "@buxlo/common";
import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";
import { IavailabilityRepository } from "../../../infrastructure/@types/IavailabilityRepository";
import { IfetchAvailabilityUseCase } from "../../interface/mentor/IfetchAvailabilityUseCase";

export class FetchAvailabilityUseCase implements IfetchAvailabilityUseCase {
  constructor(private _availabilityRepo: IavailabilityRepository) {}
  async execute(mentorId: string): Promise<AvailabilityEntities[]> {
    try {
      console.log("Fetching availability for mentor ID:", mentorId);

      return await this._availabilityRepo.findByMentorId(mentorId);
    } catch (error) {
      console.error("Error from CreateOneSlotUseCase:", error);
      throw new BadRequest("Failed to fetch availability");
    }
  }
}
