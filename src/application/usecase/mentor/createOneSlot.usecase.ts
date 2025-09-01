import { BadRequest } from "@buxlo/common";
import { IcreateOneSlotUseCase } from "../../interface/mentor/IcreateOneSlotUseCase";
import { IavailabilityRepository } from "../../../infrastructure/@types/IavailabilityRepository";
import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";
import {
  AvailabilityMapper,
  AvailabilityResponseDto,
} from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export class CreateOneSlotUseCase implements IcreateOneSlotUseCase {
  constructor(private _availabilityRepo: IavailabilityRepository) {}
  async execute(data: AvailabilityEntities): Promise<AvailabilityResponseDto> {
    try {
      const newSlot = await this._availabilityRepo.create(data);
      return AvailabilityMapper.toDto(newSlot);
    } catch (error) {
      console.error("Error from CreateOneSlotUseCase:", error);
      throw new BadRequest("Failed to create one slot, try again later");
    }
  }
}
