import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";
import { IrecurringData } from "../../../domain/interfaces/IrecurringData";

export interface IcreateRecurringSlotUseCase {
  execute(data: IrecurringData): Promise<AvailabilityEntities[]>;
}
