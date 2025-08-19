import { BadRequest } from "@buxlo/common";
import { IcreateOneSlotUseCase } from "../../interface/mentor/IcreateOneSlotUseCase";
import { IavailabilityRepository } from "../../../infrastructure/@types/IavailabilityRepository";
import { AvailabilityResponseDto } from "../../../zodSchemaDto/output/availabilityResponse.dto";
import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";

export class CreateOneSlotUseCase implements IcreateOneSlotUseCase {
  constructor(private _availabilityRepo: IavailabilityRepository) {}
  async execute(data: AvailabilityEntities): Promise<AvailabilityResponseDto> {
    try {
      return await this._availabilityRepo.create(data);
    } catch (error) {
      console.error("Error from CreateOneSlotUseCase:", error);
      throw new BadRequest("Failed to create one slot, try again later");
    }
  }
}
