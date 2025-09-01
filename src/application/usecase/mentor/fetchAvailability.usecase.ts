import { BadRequest } from "@buxlo/common";
import { IavailabilityRepository } from "../../../infrastructure/@types/IavailabilityRepository";
import { IfetchAvailabilityUseCase } from "../../interface/mentor/IfetchAvailabilityUseCase";
import {
  AvailabilityMapper,
  AvailabilityResponseDto,
} from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export class FetchAvailabilityUseCase implements IfetchAvailabilityUseCase {
  constructor(private _availabilityRepo: IavailabilityRepository) {}
  async execute(mentorId: string): Promise<AvailabilityResponseDto[]> {
    try {
      const data = await this._availabilityRepo.findByMentorId(mentorId);
      return data.map((slot) => AvailabilityMapper.toDto(slot));
    } catch (error) {
      console.error("Error from CreateOneSlotUseCase:", error);
      throw new BadRequest("Failed to fetch availability");
    }
  }
}
