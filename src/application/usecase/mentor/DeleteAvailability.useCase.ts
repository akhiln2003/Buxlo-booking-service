import { BadRequest } from "@buxlo/common";
import { IAvailabilityRepository } from "../../../infrastructure/@types/IAvailabilityRepository";
import {
  AvailabilityMapper,
  AvailabilityResponseDto,
} from "../../dto/availabilityResponse.dto";
import { IDeleteAvailabilityUseCase } from "../../interface/mentor/IDeleteAvailabilityUseCase";

export class DeleteAvailabilityUseCase implements IDeleteAvailabilityUseCase {
  constructor(private _availabilityRepo: IAvailabilityRepository) {}
  async execute(id: string): Promise<AvailabilityResponseDto> {
    try {
      const deletedData = await this._availabilityRepo.delete(id);
      return AvailabilityMapper.toDto(deletedData);
    } catch (error) {
      console.error("Error from deleteing slot:", error);
      throw new BadRequest("Failed to dlelete slot");
    }
  }
}
