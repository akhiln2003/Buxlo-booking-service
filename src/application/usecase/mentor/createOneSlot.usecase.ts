import { BadRequest } from "@buxlo/common";
import { IcreateOneSlotUseCase } from "../../interface/mentor/IcreateOneSlotUseCase";
import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";
import { IavailabilityRepository } from "../../../infrastructure/@types/IavailabilityRepository";

export class CreateOneSlotUseCase implements IcreateOneSlotUseCase {
  constructor(private _availabilityRepo: IavailabilityRepository) {}
  async execute(data: AvailabilityEntities): Promise<AvailabilityEntities> {
    try {
      return await this._availabilityRepo.create(data);
    } catch (error) {
      console.error("Error from CreateOneSlotUseCase:", error);
      throw new BadRequest("Failed to create one slot, try again later");
    }
  }
}
