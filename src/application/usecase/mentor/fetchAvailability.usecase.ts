import { BadRequest } from "@buxlo/common";
import { IAvailabilityRepository } from "../../../infrastructure/@types/IAvailabilityRepository";
import { IFetchAvailabilityUseCase } from "../../interface/mentor/IFetchAvailabilityUseCase";
import {
  AvailabilityMapper,
  AvailabilityResponseDto,
} from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export class FetchAvailabilityUseCase implements IFetchAvailabilityUseCase {
  constructor(private _availabilityRepo: IAvailabilityRepository) {}
  async execute(mentorId: string): Promise<AvailabilityResponseDto[]> {
    try {
      const data = await this._availabilityRepo.findByMentorId(
        mentorId,
        new Date().toISOString().split("T")[0]
      );

      return data.map((slot) => AvailabilityMapper.toDto(slot));
    } catch (error) {
      console.error("Error from CreateOneSlotUseCase:", error);
      throw new BadRequest("Failed to fetch availability");
    }
  }
}
