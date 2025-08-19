import { BadRequest } from "@buxlo/common";
import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";
import { IavailabilityRepository } from "../../../infrastructure/@types/IavailabilityRepository";
import { IfetchAvailabilityUseCase } from "../../interface/mentor/IfetchAvailabilityUseCase";
import { AvailabilityResponseDto } from "../../../zodSchemaDto/output/availabilityResponse.dto";

export class FetchAvailabilityUseCase implements IfetchAvailabilityUseCase {
  constructor(private _availabilityRepo: IavailabilityRepository) {}
  async execute(mentorId: string): Promise<AvailabilityResponseDto[]> {
    try {
      return await this._availabilityRepo.findByMentorId(mentorId);
    } catch (error) {
      console.error("Error from CreateOneSlotUseCase:", error);
      throw new BadRequest("Failed to fetch availability");
    }
  }
}
