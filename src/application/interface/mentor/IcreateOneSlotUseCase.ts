import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";

export interface IcreateOneSlotUseCase {
  execute(data: AvailabilityEntities): Promise<AvailabilityEntities | string>;
}
