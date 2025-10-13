import { BadRequest } from "@buxlo/common";
import { IAvailabilityRepository } from "../../../infrastructure/@types/IAvailabilityRepository";
import {
  AvailabilityMapper,
  AvailabilityResponseDto,
} from "../../dto/availabilityResponse.dto";
import { IUserFetchAvailabilityUseCase } from "../../interface/user/IUserFetchAvailabilityUseCase";

export class UserFetchAvailabilityUseCase
  implements IUserFetchAvailabilityUseCase
{
  constructor(private _availabilityRepo: IAvailabilityRepository) {}
  async execute(mentorId: string): Promise<AvailabilityResponseDto[]> {
    try {
      const data = await this._availabilityRepo.userFindByMentoryId(
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
